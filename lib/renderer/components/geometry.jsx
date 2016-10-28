/* @flow */

import { bindAll } from 'lodash';
import React, { Component } from 'react';
import { createProgramInfo, setBuffersAndAttributes, setUniforms } from 'twgl-base.js';
import { mat4 } from 'gl-matrix';

import WebGLCanvas from './webgl_canvas';
import batchArrays from '../../utils/batch_arrays';
import vertexShader from '../shaders/2d.vertex.glsl';
import fragmentShader from '../shaders/2d.fragment.glsl';

const MAT4 = mat4.create();
type Props = {};
type ProgramInfo = any;
type BufferInfo = any;

type Batch = {
  data: Float32Array,
  size: number,
};

type Phase = {
  uniforms: {
    color: number[],
  },
  batches: Iterable<Batch>,
};

export default class Geometry extends Component {
  canvas: WebGLCanvas;
  gl: WebGLRenderingContext;
  buffer: WebGLBuffer;
  programInfo: ProgramInfo;
  bufferInfo: BufferInfo;
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

    this.buffer = gl.createBuffer();

    this.bufferInfo = {
      attribs: {
        position: {
          size: 2,
          offset: 0,
          stride: 0,
          buffer: this.buffer,
        },
      },
    };

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
    setBuffersAndAttributes(gl, programInfo, bufferInfo);

    for (const phase of this.phases()) {
      setUniforms(programInfo, this.uniforms);
      setUniforms(programInfo, phase.uniforms);

      for (const batch of phase.batches) {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, batch.data, gl.STREAM_DRAW);
        gl.drawArrays(gl.TRIANGLES, 0, batch.size / 2);
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  * phases(): Iterable<Phase> {
    const data = new Float32Array(6);

    let items;

    items = [
      new Float32Array([
        0, 0, 0, 100, 100, 0,
        0, 0, 0, -100, -100, 0,
        200, 0, 200, 100, 100, 0,
      ]),
      new Float32Array([
        200, 0, 200, -100, 300, 0,
      ]),
    ];

    yield {
      uniforms: {
        color: [0, 0, 1, 1],
      },
      batches: batchArrays(data, items),
    };

    items = [
      new Float32Array([
        0, 0, 0, 100, -100, 0,
        0, 0, 0, -100, 100, 0,
      ]),
      new Float32Array([
        -200, 0, -200, 100, -100, 0,
        -200, 0, -200, -100, -300, 0,
      ]),
    ];


    yield {
      uniforms: {
        color: [0, 1, 0, 1],
      },
      batches: batchArrays(data, items),
    };

    items = [
      new Float32Array([
        200, 0, 200, 100, 300, 0,
        200, 0, 200, -100, 100, 0,
        -200, 0, -200, 100, -300, 0,
        -200, 0, -200, -100, -100, 0,
      ]),
    ];

    yield {
      uniforms: {
        color: [1, 0, 0, 1],
      },
      batches: batchArrays(data, items),
    };
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
