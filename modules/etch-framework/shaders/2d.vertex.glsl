attribute vec2 position;
uniform mat4 transform;

void main() {
  gl_Position = vec4(position, 0, 1) * transform;
}
