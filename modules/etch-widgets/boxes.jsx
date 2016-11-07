/* @flow */

import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { omit } from 'lodash';

const styles = StyleSheet.create({
  box: {
    display: 'flex',
    flex: 1,
  },
  horizontal: {
    flexDirection: 'row',
  },
  vertical: {
    flexDirection: 'column',
  },
});

type Props = {
  className: ?string,
  direction: "horizontal" | "vertical",
  styles: any,
};

export function Box(props: Props) {
  const rest = omit(props, 'direction', 'styles', 'className');
  const className = css(styles.box, styles[props.direction], props.styles);

  return <div {...rest} className={`${className} ${props.className || ''}`} />;
}

export function HBox(props: Object) {
  return <Box {...props} direction="horizontal" />;
}

export function VBox(props: Object) {
  return <Box {...props} direction="vertical" />;
}
