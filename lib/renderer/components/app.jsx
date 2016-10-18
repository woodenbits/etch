import React from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  message: {
    textAlign: 'center',
  },
});

const App = () => (
  <h1 className={css(styles.message)}>
    Hello World!
  </h1>
);

export default App;
