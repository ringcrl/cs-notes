// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
// const path = require('path')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    // fullscreenable: true, // 启用全屏模式
    // titleBarStyle: 'hidden', // 隐藏标题栏
    // backgroundColor: '#00000001', // 设置背景透明度
    // skipTaskbar: true, // 隐藏任务栏图标
    // alwaysOnTop: true, // 窗口始终在顶部
    // type: 'toolbar', // 设置窗口类型为工具栏
    webPreferences: {
      nodeIntegration: true
    }
  })

  // mainWindow.setFullScreen(true) // 进入全屏模式
  // mainWindow.setVisibleOnAllWorkspaces(true) // 在所有桌面空间中显示
  // mainWindow.setFullScreenable(false) // 禁用退出全屏模式
  // mainWindow.setWindowButtonVisibility(false) // 隐藏窗口按钮

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
