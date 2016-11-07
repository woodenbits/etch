/* @flow */

import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS, REACT_PERF } from 'electron-devtools-installer';

export default async function () {
  const force = process.argv.indexOf('--force-download-devtools') >= 0;

  await Promise.all([
    installExtension(REACT_DEVELOPER_TOOLS, force),
    installExtension(REDUX_DEVTOOLS, force),
    installExtension(REACT_PERF, force),
  ]);

  // eslint-disable-next-line no-console
  console.log('Added development extensions');
}
