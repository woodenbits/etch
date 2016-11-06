/* @flow */

import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS, REACT_PERF } from 'electron-devtools-installer';

export default async function () {
  await Promise.all([
    installExtension(REACT_DEVELOPER_TOOLS),
    installExtension(REDUX_DEVTOOLS),
    installExtension(REACT_PERF),
  ]);

  // eslint-disable-next-line no-console
  console.log('Added development extensions');
}
