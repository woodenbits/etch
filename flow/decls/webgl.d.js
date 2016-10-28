/* @flow */

declare class WebGLProgram {}
declare class WebGLBuffer {}

declare class WebGLRenderingContext {
  ARRAY_BUFFER: number;
  STREAM_DRAW: number;
  TRIANGLES: number;

  canvas: HTMLCanvasElement;
  drawingBufferWidth: number;
  drawingBufferHeight: number;

  viewport(x: number, y: number, width: number, height: number): void;
  useProgram(program: WebGLProgram): void;
  createBuffer(): WebGLBuffer;
  bindBuffer(type: number, buffer: WebGLBuffer): void;
  bufferData(type: number, data: $TypedArray, mode: number): void;
  drawArrays(type: number, offset: number, count: number): void;
}
