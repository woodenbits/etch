import React from 'react';
import { render } from 'react-dom';
import { css, StyleSheet } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  message: {
    textAlign: 'center',
  },
});

render(<h1 className={css(styles.message)}>Hello World!</h1>, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => {
    // eslint-disable-next-line no-console
    console.log('[HMR] Reloading');
    window.location.reload();
  });
}
