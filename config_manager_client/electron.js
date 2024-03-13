// Buildscript prepends the html singlefile as variable 'html' here

import { app, BrowserWindow } from "electron";

function createWindow() {
    const win = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    win.loadURL(`data:text/html;charset=utf-8,${encodeURI(html)}`);
}

app.whenReady().then(createWindow);
