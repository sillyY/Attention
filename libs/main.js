import { app } from 'electron'
import consola from 'consola'

// import { isWin, handleGlobalShortcut } from './helper.js'
import menus from './menus.js'
import Win from './window'

const log = consola.withTag('MAIN-RENDER')

let win = null //主窗口

function createWindow() {
  const options = {
    minWidth: 320,
    minHeight: 100,
    width: 320,
    height: 100,
    x: 50,
    y: 50,
    title: '时钟',
    url: 'http://localhost:3000/'
  }
  win = new Win(options)
  win.setMenu(null)
  win.setDockMenu(menus.dockMenu)
  win.setDevTools({ mode: 'detach' })
}

/**
 * app相关事件
 * 使用单例模式
 */
const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', () => {
    log.info(win)
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
