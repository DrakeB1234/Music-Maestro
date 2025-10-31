import { Accidental, Barline, Formatter, RenderContext, Renderer, Stave, StaveNote, SVGContext, Voice } from "vexflow";
import { ConvertGenericNoteToVexNote, type GenericNote } from "./NoteHelpers";
import type { DrillClefTypes } from "@/types/DrillTypes";

const MAX_STAVE_SPACES_ABOVE: number = 8;
const MAX_STAVE_SPACES_BELOW: number = 4;
const STAVE_SPACE_HEIGHT: number = 10;
const HEIGHT_BASE_STAVE: number = 51;
const MIN_HEIGHT_STAVE: number = 72;
const MIN_STAVE_ABOVE_PADDING: number = 0.5;

export default class GenerateStave {
  #context: RenderContext;
  #stave: Stave;
  #renderer: Renderer;
  #svgContext: SVGContext;
  #clef: DrillClefTypes;

  constructor(
    svgRef: HTMLDivElement,
    clef: DrillClefTypes = "treble",
    staveWidth: number = 160,
    staveHeight: number = HEIGHT_BASE_STAVE,
    scale: number = 1.3,
    spacesAboveStaff: number = MAX_STAVE_SPACES_ABOVE,
    spaceBelowStaff: number = MAX_STAVE_SPACES_BELOW,
    scalableWidth: boolean = true
  ) {
    svgRef.innerHTML = "";

    // Determine height by amount of spaces above stave
    let newSpacesAbove = Math.max(spacesAboveStaff, 0);
    newSpacesAbove = Math.min(newSpacesAbove + 1, MAX_STAVE_SPACES_ABOVE);
    if (newSpacesAbove == 1) newSpacesAbove += MIN_STAVE_ABOVE_PADDING;

    let newStaveHeight = HEIGHT_BASE_STAVE + newSpacesAbove * STAVE_SPACE_HEIGHT;
    newStaveHeight = newStaveHeight + spaceBelowStaff * STAVE_SPACE_HEIGHT;
    newStaveHeight = Math.max(newStaveHeight, MIN_HEIGHT_STAVE);

    this.#renderer = new Renderer(svgRef, Renderer.Backends.SVG);
    this.#renderer.resize(staveWidth, newStaveHeight * scale);

    this.#context = this.#renderer.getContext();
    this.#svgContext = this.#renderer.getContext() as SVGContext;
    this.#context.scale(scale, scale);

    if (scalableWidth) {
      this.#svgContext.parent.classList.add("stave-scalable");
    }

    this.#stave = new Stave(0, 0, (staveWidth / scale) - 1, {
      spaceAboveStaffLn: newSpacesAbove,
    });
    this.#clef = clef;

    // Draw clef w/ empty staff
    this.#stave.setBegBarType(Barline.type.NONE);
    this.#stave.setEndBarType(Barline.type.NONE);
    this.#stave.addClef(clef, undefined, undefined);

    this.#stave.setContext(this.#context).draw();
  }

  drawNote(note: GenericNote) {
    this.clearStave();
    const convertedVexNote = ConvertGenericNoteToVexNote(note);

    const staveNote = new StaveNote({
      keys: [convertedVexNote],
      duration: "w",
      clef: this.#clef,
      alignCenter: true,
    });
    if (note.accidental) {
      staveNote.addModifier(new Accidental(note.accidental));
    }

    Formatter.FormatAndDraw(this.#context, this.#stave, [staveNote]);

  }

  drawListNotes(notes: GenericNote[]) {
    this.clearStave();
    const staveNotes: StaveNote[] = [];

    notes.forEach(note => {
      const convertedVexNote = ConvertGenericNoteToVexNote(note);
      const staveNote = new StaveNote({
        keys: [convertedVexNote],
        duration: "w",
        clef: this.#clef,
      });

      staveNotes.push(staveNote);
    });
    const voice = new Voice({ numBeats: 8, beatValue: 4 });
    voice.addTickables(staveNotes);

    new Formatter().joinVoices([voice]).format([voice], this.#svgContext.width - 40);
    voice.draw(this.#context, this.#stave);
  }

  changeClef(clef: DrillClefTypes) {
    this.#stave.setClef(clef);
  }

  clearStave() {
    this.#context.clearRect(-this.#svgContext.width / 2, -this.#svgContext.height / 2, this.#svgContext.width * 2, this.#svgContext.height * 2);
    this.#stave.draw();
  }
}
