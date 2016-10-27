/* @flow */

declare class WebGLProgram {}

declare class WebGLRenderingContext {
  STREAM_DRAW: any;

  canvas: HTMLCanvasElement;
  drawingBufferWidth: number;
  drawingBufferHeight: number;
  viewport(x: number, y: number, width: number, height: number): void;
  useProgram(program: WebGLProgram): void;
}
