const { app, BrowserWindow, Menu } = require('electron');


process.env.NODE_ENV = 'develpoment';

const isDev = process.env.NODE_ENV !== 'production' ? true : false;
const isMac = process.platform === 'darwin' ? true : false;
const isWin = process.platform === 'win32' ? true : false;

let mainWindow;

function createMainWindow()
{
  mainWindow = new BrowserWindow({
    title: 'Image Shrink',
    width: 500,
    height: 600,
    icon: `${__dirname}/assets/icons/Icon_256x256.png`,
    resizable: isDev
  })

  mainWindow.loadFile(`./app/index.html`)
}

app.on('window-all-closed', function ()
{
  if (!isMac) app.quit()
})

app.whenReady().then(() =>
{
  createMainWindow()

  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);

  app.on('activate', function ()
  {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
  })
})

const menu = [
  ...(isMac ? [{
    role: 'appMenu'
  }]: []),
  {
    label: "File",
    submenu: [
      {
        label: "Quit",
        click: () => app.quit()
      }
    ]
  }
]

app.on('ready', () =>
{
  createMainWindow()
  mainWindow.on('close', () => mainWindow = null)
});