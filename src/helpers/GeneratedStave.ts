import { Accidental, CanvasContext, Formatter, RenderContext, Renderer, Stave, StaveNote } from "vexflow";
import { ConvertGenericNoteToVexNote, type GenericNote } from "./NoteHelpers";
import type { DrillClefTypes } from "@/types/DrillTypes";

const DEFAULT_CLEF: DrillClefTypes = "treble";

type CanvasSize = { width: number, height: number };

export default class GeneratedStave {
  #context: RenderContext;
  #stave: Stave;
  #renderer: Renderer;
  #canvasContext: CanvasContext;

  constructor(
    canvasRef: HTMLCanvasElement,
    clef: DrillClefTypes = DEFAULT_CLEF,
    rendererSize: CanvasSize = { width: 200, height: 200 },
    contextScale = 1,
    staveOptions = { xPos: 0, yPos: 20, width: 125 }
  ) {
    if (!canvasRef) {
      throw new Error("GeneratedStaff: canvasRef is required.");
    }

    this.#renderer = new Renderer(canvasRef, Renderer.Backends.CANVAS);
    this.#renderer.resize(rendererSize.width, rendererSize.height);

    this.#context = this.#renderer.getContext();
    this.#context.scale(contextScale, contextScale);
    this.#canvasContext = this.#renderer.getContext() as CanvasContext;

    this.#stave = new Stave(staveOptions.xPos, staveOptions.yPos, staveOptions.width);

    // Draw clef w/ empty staff
    this.#stave.addClef(clef)
      .setContext(this.#context)
      .draw();
  }

  drawNote(note: GenericNote, clef: DrillClefTypes = DEFAULT_CLEF) {
    const convertedVexNote = ConvertGenericNoteToVexNote(note);

    const staveNote = new StaveNote({
      keys: [convertedVexNote],
      duration: "q",
      clef: clef
    });
    if (note.accidental) {
      staveNote.addModifier(new Accidental(note.accidental));
    }
    Formatter.FormatAndDraw(this.#context, this.#stave, [staveNote]);
  }

  clearStave() {
    this.#canvasContext.clearRect(0, 0, this.#canvasContext.canvas.width, this.#canvasContext.canvas.height);
    this.#stave.draw();
  }
}
