const { app, protocol, BrowserWindow } = require('electron');
const path = require('path');

let win;

function registerAssetProtocol() {
  protocol.registerFileProtocol('assets', (request, callback) => {
    const url = request.url.substr(9);
    callback({ path: path.normalize(`${__dirname}/../assets/${url}`) });
  }, (error) => {
    // eslint-disable-next-line no-console
    if (error) { console.error(error); }
  });
}

function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600 });
  win.loadURL(`file://${__dirname}/index.html`);
  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', () => {
  registerAssetProtocol();
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
