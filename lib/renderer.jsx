import React from 'react';
import { render } from 'react-dom';
import { css, StyleSheet } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  message: {
    textAlign: 'center',
  },
});

render(<h1 className={css(styles.message)}>Hello World!</h1>, document.getElementById('root'));
