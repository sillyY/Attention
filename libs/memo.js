import Database from './db'
import config from './config'

class Memo {
  constructor() {
    this.db = new Database(config.DB_PATH, {
      memos: []
    })
  }
  add(value) {
    this.db.add('memos', value)
  }
  get() {
    this.db.get('memos')
  }
  find(keyObj) {
    this.db.get('memos', keyObj)
  }
  update(keyObj, value) {
    this.db.update('memos', keyObj, value)
  }
  remove(keyObj) {
    this.db.remove('memos', keyObj)
  }
  clear(keyObj) {
    this.db.clear(keyObj, [])
  }
}

export default Memo
