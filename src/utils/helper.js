const remote = window.electron ? window.electron.remote : null

// export const currentWin = remote && remote.getCurrentWindow()

// export const getWebPath = remote && remote.app.getWebPath

export const memoDB = remote && remote.app.memoDB

export const removeChildWindow = remote && remote.app.removeChildWindow