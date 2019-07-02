import { globalShortcut, BrowserWindow, app } from 'electron'
import os from 'os'

export const handleGlobalShortcut = win => {
	globalShortcut.register('CommandOrControl+Shift+i', () => {
		let focusWin = BrowserWindow.getFocusedWindow()
		focusWin && focusWin.toggleDevTools()
	})
	globalShortcut.register('CommandOrControl+r', () => {
		win.reload()
	})
	globalShortcut.register('CommandOrControl+e', () => {
		app.relaunch({ args: process.argv.slice(1).concat(['--relaunch']) })
		app.exit(0)
	})
}

/**
 * 以高度作为基准，当 高度*ratio大于 可用宽度时，让高度为可用宽度/ratio
 */
export const handleResize = (win, workWidth, ratio) => {
	let size = win.getSize()
	let h = size[1]
	let _width = parseInt(h * ratio)
	if (_width <= workWidth) {
		win.setSize(_width, h)
	} else {
		win.setSize(workWidth, parseInt(workWidth / ratio))
	}
}

export const isWin = () => {
	return os.platform() === 'darwin' ? false : true
}

export const delay = t =>
	new Promise((resolve, reject) => {
		setTimeout(() => resolve(), t)
	})
