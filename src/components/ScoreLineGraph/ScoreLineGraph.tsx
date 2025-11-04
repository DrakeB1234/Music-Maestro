import type { DrillProgressResult } from "@/types/DrillProgressResult";
import { useRef } from "react";

interface LineGraphProps extends React.HTMLAttributes<HTMLCanvasElement> {
  data: DrillProgressResult[];
  width?: number;
  height?: number;
};

const MAX_GRAPH_POINTS = 8;
const MAX_Y_LABELS = 4;
const CANVAS_PADDING = 10;
const LABEL_PADDING = 50;
const Y_LABEL_VALUE_INCREMENT = 500;
const GRID_LINES_PADDING = 20;
const DATA_LINE_THICK = 4;
const DATA_POINT_SIZE = 16;

export function ScoreLineGraph({ data, width = 600, height = 140, ...props }: LineGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawGraph = (canvas: HTMLCanvasElement | null) => {
    if (!canvas || data.length === 0) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const root = document.documentElement;
    const primaryColor = getComputedStyle(root).getPropertyValue("--color-main-2").trim();
    const textColor = getComputedStyle(root).getPropertyValue("--color-text-body-1").trim();
    const borderColor = getComputedStyle(root).getPropertyValue("--color-surface-border-1").trim();
    const labelFont = getComputedStyle(root).getPropertyValue("--line-graph-label-font").trim();


    context.clearRect(0, 0, width, height);

    const newData = data.slice(-MAX_GRAPH_POINTS);
    const scores = newData.map(obj => obj.score);

    const heightWithPadding = height - CANVAS_PADDING * 2;

    // Y label calculations / drawing
    let minScore = Math.min(...scores);
    const maxScore = Math.max(...scores, 1);

    const labelNumbers = getEvenlySpacedNumbers(minScore, maxScore, MAX_Y_LABELS - 2, Y_LABEL_VALUE_INCREMENT).reverse();

    context.fillStyle = textColor;
    context.font = labelFont;
    context.textAlign = "right";
    context.textBaseline = "middle";

    labelNumbers.forEach((value, i) => {
      const yPos = CANVAS_PADDING + (heightWithPadding / (MAX_Y_LABELS - 1)) * i;

      // Draw grid line
      context.beginPath();
      context.strokeStyle = borderColor;
      context.lineWidth = 3;
      context.setLineDash([8, 6]);
      context.moveTo(LABEL_PADDING + GRID_LINES_PADDING, yPos);
      context.lineTo(width, yPos);
      context.stroke();
      context.setLineDash([]);

      // Draw Labels
      context.fillText(value.toString(), LABEL_PADDING, yPos);
    });

    // Data lines / points
    const graphLeft = LABEL_PADDING + GRID_LINES_PADDING + DATA_POINT_SIZE / 2;
    const graphRight = width - CANVAS_PADDING;
    const graphTop = CANVAS_PADDING + DATA_POINT_SIZE / 2;
    const graphBottom = height - CANVAS_PADDING - DATA_POINT_SIZE / 2;

    const graphHeight = graphBottom - graphTop;
    const graphWidth = graphRight - graphLeft;
    const xStep = graphWidth / (scores.length - 1);

    context.beginPath();
    context.strokeStyle = primaryColor;
    context.lineWidth = DATA_LINE_THICK;
    scores.forEach((score, i) => {
      const y = graphBottom - ((score - minScore) / (maxScore - minScore)) * graphHeight;

      const x = graphLeft + xStep * i;

      if (i === 0) context.moveTo(x, y);
      else context.lineTo(x, y);
    });
    context.stroke();

    context.fillStyle = primaryColor;

    scores.forEach((score, i) => {
      const y = graphBottom - ((score - minScore) / (maxScore - minScore)) * graphHeight;
      const x = graphLeft + xStep * i;

      context.fillRect(
        x - DATA_POINT_SIZE / 2,
        y - DATA_POINT_SIZE / 2,
        DATA_POINT_SIZE,
        DATA_POINT_SIZE
      );
    });
  };

  function getEvenlySpacedNumbers(min: number, max: number, inBetween: number = 2, roundTo: number = 500) {
    const totalNumbers = inBetween + 2;
    const minRequiredRange = roundTo * (totalNumbers - 1);
    min = Math.floor(min / roundTo) * roundTo;

    if (max - min < minRequiredRange) {
      max = min + minRequiredRange;
    }

    const step = (max - min) / (totalNumbers - 1);
    const numbers = Array.from({ length: totalNumbers }, (_, i) => {
      if (i === 0) return min;
      if (i === totalNumbers - 1) return Math.round(max / roundTo) * roundTo;
      return Math.round((min + step * i) / roundTo) * roundTo;
    });

    return numbers;
  }

  return (
    <canvas
      ref={canvas => {
        canvasRef.current = canvas;
        drawGraph(canvas);
      }}
      width={width}
      height={height}
      {...props}
    />
  );
}