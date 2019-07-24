import { all, fork } from "redux-saga/effects"

import watchCommon from "./common"
import watchTime from './time'
import watchMemo from './memo'

export default function* root() {
	yield all([fork(watchCommon), fork(watchTime), fork(watchMemo)])
}
