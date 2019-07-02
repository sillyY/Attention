import { put, throttle, delay } from "redux-saga/effects"

import * as actions from "../actionTypes"

export function* toggleToast({ payload }) {
	yield put({
		type: actions.SET_TOAST,
		payload: {
			visible: true,
			content: payload
		}
	})
	yield delay(1500)
	yield put({
		type: actions.SET_TOAST,
		payload: {
			visible: false,
			content: ""
		}
	})
}

export default function* watchCommon() {
	yield throttle(800, actions.TOGGLE_TOAST, toggleToast)
	// yield takeEvery(actions.TOGGLE_TOAST, toggleToast)
}
