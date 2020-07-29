// Arquivo servidor de BackEnd
const {app, BrowserWindow, Menu, Tray} = require('electron')

app.setAppUserModelId('com.escola.aplicativoTeste');

//inicia o aplicativo sempre com o sistema operacional
app.setLoginItemSettings({
  openAtLogin: true
});

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  mainWindow.loadFile('src/index.html')
  mainWindow.on('closed', function(){
    mainWindow = nell;
  });

  mainWindow.setMenu(null);

  //menu configurado para mostrar a barra de menu
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Mostrar Aplicativo",click: function(){
        mainWindow.show();
      }
    },
    {
      label: "Fechar",click: function(){
        app.isQuitting == true;
        app.quit();
      },
    }
  ]);

  const tray = new Tray(__dirname + '/tray.png');
  tray.setContextMenu(contextMenu);

  mainWindow.on('close', function(e)  {
    if(!app.isQuitting) {
      e.preventDefault();
      mainWindow.hide();
    }
  });

}

app.whenReady().then(createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
});

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
});
