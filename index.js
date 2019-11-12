var fs = require("fs");
var BrowserWindow = require("electron").BrowserWindow;
var app = require("electron").app;
var Menu = require("electron").Menu;
var Mipc = require("electron").ipcMain;
var win;
function createWindow () {
 	win = new BrowserWindow({
		width: 740,
		height: 600,
		icon: "./favicon.png",
		webPreferences: {
			nodeIntegration: true
		}
	});

	win.maximize();
	win.on('closed', function () {
		win = null;
	});
	win.loadFile('index.html');
	win.setMenuBarVisibility(false);
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', function () {
	if (win === null) {
		createWindow();
	}
});

Mipc.on("asynchronous-message", function (event, arguments) {
	win.webContents.openDevTools();
});
