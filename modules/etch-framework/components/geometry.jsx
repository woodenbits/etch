/* @flow */

import { bindAll, each } from 'lodash';
import React, { Component } from 'react';
import createBuffer from 'gl-buffer';
import createShader from 'gl-shader';
import createVAO from 'gl-vao';
import { mat4 } from 'gl-matrix';
import { batchArrays } from 'etch-webglu/utils';
import { WebGLCanvas } from 'etch-webglu/components';

import vertexShader from '../shaders/2d.vertex.glsl';
import fragmentShader from '../shaders/2d.fragment.glsl';

type Props = {};

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
  buffer: any;
  shader: any;
  vao: any;
  uniforms: {
    transform: any,
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

    this.shader = createShader(gl,
      vertexShader,
      fragmentShader
    );

    this.shader.attributes.position.location = 0;

    this.buffer = createBuffer(gl, 0, gl.ARRAY_BUFFER, gl.STREAM_DRAW);

    this.vao = createVAO(gl, [{
      buffer: this.buffer,
      size: 2,
    }]);

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
    const { gl, buffer, shader, vao } = this;

    shader.bind();
    vao.bind();

    for (const phase of this.phases()) {
      each(this.uniforms, (value, key) => { shader.uniforms[key] = value; });
      each(phase.uniforms, (value, key) => { shader.uniforms[key] = value; });

      for (const batch of phase.batches) {
        buffer.update(batch.data);
        vao.draw(gl.TRIANGLES, batch.size / 2);
      }
    }

    vao.unbind();
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
