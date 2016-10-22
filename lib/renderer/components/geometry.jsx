/* @flow */

import { bindAll } from 'lodash';
import React, { Component } from 'react';
import { createProgramInfo, createBufferInfoFromArrays, drawBufferInfo, setBuffersAndAttributes, setUniforms } from 'twgl-base.js';
import { mat4 } from 'gl-matrix';

import WebGLCanvas from './webgl_canvas';
import vertexShader from '../shaders/2d.vertex.glsl';
import fragmentShader from '../shaders/2d.fragment.glsl';

const MAT4 = mat4.create();
type Props = {};
type ProgramInfo = any;
type BufferInfo = any;

export default class Geometry extends Component {
  canvas: WebGLCanvas;
  gl: WebGLRenderingContext;
  programInfo: ProgramInfo;
  bufferInfo: BufferInfo;
  uniforms: {
    color: number[],
    transform: typeof MAT4,
  };

  constructor(props: Props) {
    super(props);

    bindAll(this,
      'setup',
      'resize',
      'draw',
    );
  }

  setup(gl: WebGLRenderingContext) {
    this.gl = gl;

    this.programInfo = createProgramInfo(gl, [
      vertexShader,
      fragmentShader,
    ]);

    this.bufferInfo = createBufferInfoFromArrays(gl, {
      position: {
        numComponents: 2,
        data: [
          0, 0, 0, 100, 100, 0,
          0, 0, -100, 0, 0, -100,
        ],
      },
    });

    this.uniforms = {
      color: [1, 1, 0, 1],
      transform: mat4.create(),
    };
  }

  resize() {
    const { gl } = this;
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

    const { clientWidth, clientHeight } = gl.canvas;
    mat4.ortho(this.uniforms.transform,
      clientWidth / -2,
      clientWidth / 2,
      clientHeight / -2,
      clientHeight / 2,
      -1,
      1,
    );
  }

  draw() {
    const { gl, bufferInfo, programInfo, uniforms } = this;

    gl.useProgram(programInfo.program);
    setBuffersAndAttributes(gl, programInfo, bufferInfo);
    setUniforms(programInfo, uniforms);
    drawBufferInfo(gl, bufferInfo);
  }

  render() {
    return (
      <WebGLCanvas
        ref={(canvas) => { this.canvas = canvas; }}
        onSetup={this.setup}
        onResize={this.resize}
        onDraw={this.draw}
      />
    );
  }
}
