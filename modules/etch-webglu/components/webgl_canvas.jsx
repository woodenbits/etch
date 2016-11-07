/* @flow */

import { bindAll, omit } from 'lodash';
import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import resizeCanvas from '../utils/resize_canvas';

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
      'setup',
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
    const gl = this.canvas.getContext('webgl');

    if (gl == null) {
      throw Error('Unable to get WebGL context');
    }

    this.gl = gl;

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
    const resized = resizeCanvas(this.canvas, window.devicePixelRatio);
    if (resized) {
      this.props.onResize();
    }

    this.props.onDraw();
  }

  render() {
    const rest = omit(this.props, 'styles', 'onSetup', 'onResize', 'onDraw');

    return (
      <div className={css(styles.wrapper, this.props.styles)}>
        <canvas ref={this.setup} className={css(styles.canvas)} {...rest} />
      </div>
    );
  }
}
