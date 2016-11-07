/* eslint-disable flowtype/require-valid-file-annotation */

window.require = window.top.require;
window.process = window.top.process;
window.global = window.top.global;

// Load all tests
const ctx = require.context('../modules/', true, /\.test\.jsx?$/);
console.log(ctx.keys());
ctx.keys().forEach(ctx);
