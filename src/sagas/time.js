import { put, throttle, delay } from 'redux-saga/effects'

import * as actions from '../actionTypes'

export function* toggleTime() {
  while (true) {
    yield delay(1000)
    let date = new Date(),
      hour = date.getHours(),
      minute = date.getMinutes(),
      second = date.getSeconds()
    yield put({
      type: actions.SET_TIME,
      payload: {
        visible: true,
        content: {
          date,
          hour: hour < 10 ? '0' + hour : hour,
          minute: minute < 10 ? '0' + minute : minute,
          second: second < 10 ? '0' + second : second
        }
      }
    })
  }
}

export default function* watchTime() {
  yield throttle(800, actions.TOGGLE_TIME, toggleTime)
}
