/* @flow */

import { bindAll } from 'lodash';
import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { getContext, resizeCanvasToDisplaySize } from 'twgl-base.js';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  canvas: {
    display: 'block',
    width: '100%',
    height: '100%',
  },
});

type Props = {
  styles?: Object,
  onSetup(gl: WebGLRenderingContext): void,
  onResize(): void,
  onDraw(): void,
};

export default class WebGLCanvas extends Component {
  props: Props;
  canvas: HTMLCanvasElement;
  gl: WebGLRenderingContext;
  valid: boolean;

  constructor(props: Props) {
    super(props);

    bindAll(this,
      'invalidate',
      'draw'
    );

    this.valid = true;
  }

  componentDidMount() {
    window.addEventListener('resize', this.invalidate);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.invalidate);
  }

  setup(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.gl = getContext(this.canvas);

    this.props.onSetup(this.gl);

    this.invalidate();
  }

  invalidate() {
    if (this.valid) {
      this.valid = false;
      requestAnimationFrame(this.draw);
    }
  }

  draw() {
    this.valid = true;
    const resized = resizeCanvasToDisplaySize(this.canvas, window.devicePixelRatio);
    if (resized) {
      this.props.onResize();
    }

    this.props.onDraw();
  }

  render() {
    return (
      <div className={css(styles.wrapper, this.props.styles)}>
        <canvas ref={(canvas) => { this.setup(canvas); }} className={css(styles.canvas)} />
      </div>
    );
  }
}
