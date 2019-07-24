import { app } from 'electron'

import Memo from './memo'

function remote(win) {
  app.memoDB = (method, v) => {
    var memo = new Memo()
    return memo[method](v)
  }

  app.removeChildWindow = name => {
    win.removeChildWindow(name)
  }
}

export default remote
