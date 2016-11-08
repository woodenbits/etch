/* @flow */

import { app, BrowserWindow } from 'electron';

// eslint-disable-next-line import/no-webpack-loader-syntax
import loader from 'file!./loader.html';

let win;

function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600, show: false });

  win.loadURL(loader);

  win.on('ready-to-show', () => {
    if (win) { win.show(); }
  });

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', async () => {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line global-require
    const devtools = require('./devtools').default;
    try {
      await devtools();
    } catch (e) {
      console.warn(e);
    }
  }
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
