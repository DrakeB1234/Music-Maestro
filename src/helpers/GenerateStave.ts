import { Accidental, Barline, Formatter, RenderContext, Renderer, Stave, StaveNote, SVGContext, Voice } from "vexflow";
import { ConvertGenericNoteToVexNote, type GenericNote } from "./NoteHelpers";
import type { DrillClefTypes } from "@/types/DrillTypes";

const HEIGHT_FULL_TREBLE_OCTAVE_RANGE: number = 170;

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
    staveHeight: number = HEIGHT_FULL_TREBLE_OCTAVE_RANGE,
    scale: number = 1.3,
    spacesAboveStaff: number = 8,
    scalableWidth: boolean = true
  ) {
    svgRef.innerHTML = "";

    this.#renderer = new Renderer(svgRef, Renderer.Backends.SVG);
    this.#renderer.resize(staveWidth, staveHeight * scale);

    this.#context = this.#renderer.getContext();
    this.#svgContext = this.#renderer.getContext() as SVGContext;
    this.#context.scale(scale, scale);

    if (scalableWidth) {
      this.#svgContext.parent.classList.add("stave-scalable");
    }

    this.#stave = new Stave(0, 0, (staveWidth / scale) - 1, {
      spaceAboveStaffLn: spacesAboveStaff,
    });
    this.#clef = clef;

    // Draw clef w/ empty staff
    this.#stave.setBegBarType(Barline.type.NONE);
    this.#stave.setEndBarType(Barline.type.NONE);
    this.#stave.addClef(clef, "small", undefined);

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

    new Formatter().joinVoices([voice]).format([voice], this.#svgContext.width - 20);
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
