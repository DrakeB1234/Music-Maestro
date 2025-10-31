import Flow from 'vexflow/core';

Flow.loadFonts("Bravura");

// Export only what GenerateStave uses
// Reduces size from 388kb gzip (vexflow/bravura) to 93kb gzip
export {
  Renderer,
  Stave,
  StaveNote,
  Accidental,
  Barline,
  Formatter,
  Voice,
  SVGContext,
  RenderContext,
} from 'vexflow/core';
