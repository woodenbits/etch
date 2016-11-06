/* @flow */

/**
 * Resize a canvas to match it's display size
 * @param {HTMLCanvasElement} canvas The canvas to be resized
 * @param {number} multiplier Multiplier for calculating desired `width` and `height`.
 * e.g. `window.devicePixelRatio` for High DPI
 * @return {boolean} true if the canvas was resized, otherwise false
 */
function resizeCanvas(canvas: HTMLCanvasElement, multiplier: number = 1): boolean {
  const width = Math.trunc(canvas.clientWidth * multiplier);
  const height = Math.trunc(canvas.clientWidth * multiplier);

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    return true;
  }

  return false;
}

export default resizeCanvas;
