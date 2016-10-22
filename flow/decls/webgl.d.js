/* @flow */

declare class WebGLProgram {}

declare class WebGLRenderingContext {
  canvas: HTMLCanvasElement;
  drawingBufferWidth: number;
  drawingBufferHeight: number;
  viewport(x: number, y: number, width: number, height: number): void;
  useProgram(program: WebGLProgram): void;
}
