import { app, BrowserWindow } from 'electron'
import windowStateKeeper from 'electron-window-state'

import { isWin, handleGlobalShortcut } from './helper.js'


//覆盖默认字体
const webPreferences = {
  defaultFontFamily: {
    standard: isWin() ? 'Microsoft Yahei' : 'PingFang SC'
  },
  // devTools: env === 'dev' ? true : false // 正式环境禁用devtool
  devTools: true
}

let win = null //主窗口

/**
 * 创建主窗口
 */
const createWindow = () => {
  const winState = windowStateKeeper({
    defaultWidth: 320,
    defaultHeight: 100,
    x: 50,
    y: 50
  })
  win = new BrowserWindow({
    minWidth: 320,
    minHeight: 100,
    width: 320,
    height: 100,
    x: winState.x,
    y: winState.y,
    show: false,
    frame: false,
    title: '时钟',
    resizable:false,
    maximizable: false,
    minimizable: false,
    transparent: true,
    hasShadow: false,
    alwaysOnTop: true,
    webPreferences
  })

  //   win.loadURL(`file://${path.resolve(__dirname, URL)}`)
  win.loadURL('http://localhost:3000/')

  // 保持窗口状态
  winState.manage(win)

  //   // 自动更新
  //   UpdateManager.init(win)

  //   // 菜单设置
  //   Menu.setApplicationMenu(Menu.buildFromTemplate(menu))

  // 隐藏浏览器菜单
  win.setMenu(null)

  // 打开控制台快捷键
  handleGlobalShortcut(win)

  //   /**
  //    * remote模块
  //    * 设备信息存储放置于此
  //    */
  //   remote(win)

  win.once('ready-to-show', () => {
    if (!win) {
      win.show()
      return
    }
    win.show()
  })

  //最大 最小化事件
  win.on('closed', () => {
    win = null
  })
}

/**
 * 通信
 */

/**
 * 打开外部协议
 */

// ipcMain.on(command.OPEN_EXTERNAL, (e, data) => {
//   shell.openExternal(data)
// })

/**
 * app相关事件
 * 使用单例模式
 */
const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', () => {
    if (win && win.isMinimized()) {
      win.restore()
      win.focus()
    }
  })

  app.on('ready', createWindow)

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => {
    if (!win) {
      createWindow()
    }
    if (win.isMinimized()) {
      win.restore()
    }
  })
}
