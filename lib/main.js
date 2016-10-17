import { app, protocol, BrowserWindow } from 'electron';
import path from 'path';
import renderer from './renderer.html';

let win;

function registerAssetProtocol() {
  protocol.registerFileProtocol('assets', (request, callback) => {
    const url = request.url.substr(9);
    callback({ path: path.normalize(`${__dirname}/${url}`) });
  }, (error) => {
    // eslint-disable-next-line no-console
    if (error) { console.error(error); }
  });
}

function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600 });
  win.loadURL(renderer);
  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', async () => {
  registerAssetProtocol();

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line global-require
    const devtools = require('./support/devtools').default;
    try {
      await devtools();
    } catch (e) {
      console.error(e);
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
