/* @flow */

import React from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';
import { HBox, VBox } from 'etch-widgets';

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
  <VBox styles={styles.top}>
    <h1 className={css(styles.message)}>
      Hello World!
    </h1>
    <HBox>
      <Geometry />
    </HBox>
  </VBox>
);

export default App;
