// @vitest-environment jsdom
import { bench, describe } from "vitest";

function extractRGBOriginal(colorStr: string): number[] {
  const canvas: HTMLCanvasElement = document.createElement("canvas");
  const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
  if (!ctx) return [0, 0, 0]; // Handle null context

  ctx.fillStyle = colorStr;

  // Fill a tiny rectangle with the color
  ctx.fillRect(0, 0, 1, 1);

  // Get the pixel data
  const data: Uint8ClampedArray = ctx.getImageData(0, 0, 1, 1).data;
  return [data[0], data[1], data[2]];
}

// Optimized version with reused canvas
let sharedCanvas: HTMLCanvasElement | null = null;
let sharedCtx: CanvasRenderingContext2D | null = null;

function getSharedContext(): CanvasRenderingContext2D | null {
  if (!sharedCanvas) {
    sharedCanvas = document.createElement("canvas");
    sharedCtx = sharedCanvas.getContext("2d");
  }
  return sharedCtx;
}

function extractRGBOptimized(colorStr: string): number[] {
  const ctx = getSharedContext();
  if (!ctx) return [0, 0, 0];

  ctx.fillStyle = colorStr;
  // Fill a tiny rectangle with the color
  // We might want to clear it first if alpha is involved, but for solid colors fillRect covers it.
  // Assuming solid colors as per original logic.
  ctx.clearRect(0, 0, 1, 1); // Optional safety, but fillRect should cover it if opaque
  ctx.fillRect(0, 0, 1, 1);

  const data: Uint8ClampedArray = ctx.getImageData(0, 0, 1, 1).data;
  return [data[0], data[1], data[2]];
}

describe("extractRGB", () => {
  const color = "#ff0000";

  bench("original (new canvas each time)", () => {
    extractRGBOriginal(color);
  });

  bench("optimized (reuse canvas)", () => {
    extractRGBOptimized(color);
  });
});
