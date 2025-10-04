import { useEffect, useRef, useState } from "react";
import { Renderer, Stave, StaveNote, Formatter } from "vexflow";

type Props = {
  currentNote?: String
}

export default function Staff({ currentNote = "c/4" }: Props) {
  const [isError, setIsError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous SVG before redrawing
    containerRef.current.innerHTML = "";

    // Setup renderer
    const renderer = new Renderer(containerRef.current, Renderer.Backends.SVG);
    renderer.resize(250, 150);
    const context = renderer.getContext();

    // Draw the staff
    const stave = new Stave(10, 20, 230);
    stave.addClef("treble").setContext(context).draw();

    if (!currentNote || currentNote === "") {
      console.error('Error drawing staff, no note was found.');
      stave.draw();
      setIsError(true);
      return;
    }
    setIsError(false);

    // Create note dynamically
    const staveNote = new StaveNote({
      keys: [currentNote.toString()],
      duration: "q",
    });

    // Format and draw
    Formatter.FormatAndDraw(context, stave, [staveNote]);
  }, [currentNote]);

  return (
    <>
      <div ref={containerRef}></div>
      <h3>{isError ? 'Error drawing note: No note found' : ''}</h3>
    </>
  )
}
