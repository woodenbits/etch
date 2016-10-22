/* @flow */

import React from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';
import layout from '../../styles/layout';
import Geometry from './geometry';

const styles = StyleSheet.create({
  top: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  message: {
    textAlign: 'center',
  },
});

const App = () => (
  <div className={css(styles.top, layout.vbox)}>
    <h1 className={css(styles.message)}>
      Hello World!
    </h1>
    <div className={css(layout.hbox, layout.flex)}>
      <Geometry />
    </div>
  </div>
);

export default App;
