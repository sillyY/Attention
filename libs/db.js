import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileAsync'
import moment from 'moment'
import consola from 'consola'

import { isUndef } from './util'

const log = consola.withTag('DB-SERVICE')

function buildID() {
  return moment().unix()
}

class Database {
  constructor(root, defaults) {
    this.root = root
    this.defaults = defaults
    this.db = null
  }

  async _init() {
    const adapter = new FileSync(this.root)
    this.db = await low(adapter)
    await this.db.defaults(this.defaults).write()
  }

  async get(path) {
    if (!this.db) {
      await this._init()
    }
    return this.db.get(path).value()
  }
  // 查询某一项
  async find(path, keyObj) {
    if (!this.db) {
      await this._init()
    }
    return this.db
      .get(path)
      .find(keyObj)
      .value()
  }

  async add(path, value) {
    if (!this.db) {
      await this._init()
    }
    let data = {}
    Object.assign(data, value, {
      id: buildID()
    })
    this.db
      .get(path)
      .push(data)
      .write()
    log.success(path + '新增成功', JSON.stringify(value))
  }
  async update(path, keyObj, value) {
    if (isUndef(keyObj)) return
    if (!this.db) {
      await this._init()
    }
    this.db
      .get(path)
      .find(keyObj)
      .assign(value)
      .write()
    log.success(path + '更新成功', value)
  }
  async remove(path, keyObj) {
    if (!this.db) {
      await this._init()
    }
    this.db
      .get(path)
      .remove(keyObj)
      .write()
    log.success(path + '移除成功')
  }
  async clear(path, value) {
    if (!this.db) {
      await this._init()
    }
    this.db.set(path, value).write()
    log.success(path + '清除成功')
  }
}

export default Database
