/* @flow */

import { bindAll } from 'lodash';
import React, { Component } from 'react';
import { createProgramInfo, createBufferInfoFromArrays, drawBufferInfo, setAttribInfoBufferFromArray, setBuffersAndAttributes, setUniforms } from 'twgl-base.js';
import { mat4 } from 'gl-matrix';

import WebGLCanvas from './webgl_canvas';
import vertexShader from '../shaders/2d.vertex.glsl';
import fragmentShader from '../shaders/2d.fragment.glsl';

const MAT4 = mat4.create();
type Props = {};
type ProgramInfo = any;
type BufferInfo = any;
type Block = {
  uniforms: {
    color: [number, number, number, number],
  },
  position: Float32Array,
}

export default class Geometry extends Component {
  canvas: WebGLCanvas;
  gl: WebGLRenderingContext;
  programInfo: ProgramInfo;
  bufferInfo: BufferInfo;
  blocks: Block[];
  uniforms: {
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
        data: [],
        drawType: gl.STREAM_DRAW,
      },
    });

    this.blocks = [{
      uniforms: {
        color: [1, 1, 0, 1],
      },
      position: new Float32Array([
        0, 0, 0, 100, -100, 0,
        0, 0, 0, -100, 100, 0,
      ]),
    }, {
      uniforms: {
        color: [0, 0, 1, 1],
      },
      position: new Float32Array([
        0, 0, 0, 100, 100, 0,
        0, 0, 0, -100, -100, 0,
      ]),
    }];

    this.uniforms = {
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
    const { gl, bufferInfo, programInfo } = this;

    gl.useProgram(programInfo.program);
    setUniforms(programInfo, this.uniforms);

    for (const block of this.blocks) {
      setUniforms(programInfo, block.uniforms);

      setAttribInfoBufferFromArray(gl, bufferInfo.attribs.position, block.position);
      bufferInfo.numElements = block.position.length / 2;

      setBuffersAndAttributes(gl, programInfo, bufferInfo);
      drawBufferInfo(gl, bufferInfo);
    }
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
