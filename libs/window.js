import { isWin } from './helper.js'
import { BrowserWindow, globalShortcut, app, Menu } from 'electron'
import consola from 'consola'

const log = consola.withTag('WINDOW SERVER')
class Win {
  constructor(options) {
    const { minWidth, minHeight, width, height, x, y, title, url } = options
    // private
    this._url = url

    // public
    this.win = null
    this.child = null
    this.config = {
      minWidth,
      minHeight,
      width,
      height,
      x,
      y,
      show: false,
      frame: false,
      title,
      resizable: false,
      maximizable: false,
      minimizable: false,
      transparent: true,
      hasShadow: false,
      alwaysOnTop: true,
      webPreferences: {
        defaultFontFamily: {
          standard: isWin() ? 'Microsoft Yahei' : 'PingFang SC'
        }
        // devTools: env === 'dev' ? true : false // 正式环境禁用devtool
        // devTools: true
      }
    }

    this.init()
    this.initEvent()
    this.setShortcut()
  }

  init() {
    this.win = new BrowserWindow(this.config)
    this.win.loadURL(this._url)
    log.info('窗口渲染完成')
  }

  initEvent() {
    this.win.once('ready-to-show', () => {
      if (!this.win) {
        this.win.show()
        return
      }
      this.win.show()
    })

    //最大 最小化事件
    this.win.on('closed', () => {
      this.win = null
    })
  }

  setMenu(config) {
    log.info('设置菜单')
    this.win.setMenu(config)
  }

  setDockMenu(config) {
    log.info('设置DOCK菜单')
    const that = this;
    const dockMenu = Menu.buildFromTemplate([
      {
        label: '备忘录',
        submenu: [
          {
            label: '新增',
            click() {
              that.setChildWindow('MEMO')
              that.setChildWindow('localhost:3000/memo/add')
            }
          },
          {
            label: '查看',
            click() {
              that.setChildWindow('MEMO')
              that.setChildWindow('localhost:3000/memo/list')
            }
          }
        ]
      },
      {
        label: '检测更新',
        click() {
          console.log('New Window')
        }
      },
      {
        label: '设置',
        click() {
          console.log('设置')
        }
      }
    ])
    app.dock.setMenu(dockMenu)
  }

  setDevTools(config) {
    log.info('设置Devtool')
    this.win.webContents.openDevTools(config)
  }

  setShortcut() {
    globalShortcut.register('CommandOrControl+Shift+i', () => {
      let focusWin = BrowserWindow.getFocusedWindow()
      focusWin && focusWin.toggleDevTools()
    })
    globalShortcut.register('CommandOrControl+r', () => {
      this.win.reload()
    })
    globalShortcut.register('CommandOrControl+e', () => {
      app.relaunch({ args: process.argv.slice(1).concat(['--relaunch']) })
      app.exit(0)
    })
  }

  setRemote() {}

  setChildWindow(options) {
    const { name, config, url } = options
    if(!this.child[name]) {
      this.child[name] = new BrowserWindow({ ...{ parent: this.win }, ...config })
    }
    this.child[name].loadURL(url)
    this.child[name].once('ready-to-show', () => {
      this.child[name].show()
    })
  }
  removeChildWindow(name) {
    if (!this.child[name]) return
    this.child[name] = null
    delete this.child[name]
  }
}

export default Win
