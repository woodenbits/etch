/* @flow */

import { describe, it } from 'mocha';
import assert from 'assert';
import resizeCanvas from '../resize_canvas';

describe('resizeCanvas', () => {
  it('returns true if the canvas has been resized', () => {
    const canvas = {
      width: 0,
      height: 0,
      clientWidth: 10,
      clientHeight: 20,
    };

    const resized = resizeCanvas((canvas: any));

    assert(canvas.width === 10, 'canvas should have width 10');
    assert(canvas.height === 20, 'canvas should have height 20');
    assert(resized === true, 'canvas should be resized');
  });

  it('returns false if the canvas has not been resized', () => {
    const canvas = {
      width: 10,
      height: 20,
      clientWidth: 10,
      clientHeight: 20,
    };

    const resized = resizeCanvas((canvas: any));

    assert(canvas.width === 10, 'canvas should have width 10');
    assert(canvas.height === 20, 'canvas should have height 20');
    assert(resized === false, 'canvas should not be resized');
  });

  it('scales the size by the multiplier provided', () => {
    const canvas = {
      width: 0,
      height: 0,
      clientWidth: 10,
      clientHeight: 20,
    };

    const resized = resizeCanvas((canvas: any), 2);

    assert(canvas.width === 20, 'canvas should have width 20');
    assert(canvas.height === 40, 'canvas should have height 40');
    assert(resized === true, 'canvas should be resized');
  });

  it('scales the size by a fractional multiplier provided', () => {
    const canvas = {
      width: 0,
      height: 0,
      clientWidth: 10,
      clientHeight: 20,
    };

    const resized = resizeCanvas((canvas: any), 0.35);

    assert(canvas.width === 3, 'canvas should have width 3');
    assert(canvas.height === 7, 'canvas should have height 7');
    assert(resized === true, 'canvas should be resized');
  });
});
