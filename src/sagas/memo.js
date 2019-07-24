import { put, throttle, call } from 'redux-saga/effects'

import { memoDB, removeChildWindow } from '../utils/helper'

import * as actions from '../actionTypes'

export function* addMemo({ payload }) {
  yield call(memoDB, 'add', payload)
  yield put({
    type: actions.TOGGLE_TOAST,
    payload: '添加备忘录成功'
  })
  removeChildWindow('MEMO')
}

export default function* watchMemo() {
  yield throttle(800, actions.ADD_MEMO, addMemo)
}
