/* jshint esversion: 6 */
const electron = require('electron');
const app = electron.app;

const path = require('path');
const url = require('url');

const BrowserWindow = electron.BrowserWindow;

var mainWindow;

var mainWindow;
app.on('ready', function () {
    mainWindow = new BrowserWindow({
        width: 1920, height: 1080, webPreferences: {
            nodeIntegration: true
        }
    });
    //mainWindow.loadURL('https://google.com');
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));
    //mainWindow.setMenu(null)
    //mainWindow.webContents.openDevTools();

});