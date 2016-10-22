/* @flow */

declare var module: {
  hot: ?{
    accept: Function,
    decline: Function,
    dispose: Function,
    addDisposeHandler: Function,
    removeDisposeHandler: Function,
  },
};
