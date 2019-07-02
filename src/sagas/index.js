import { all, fork } from "redux-saga/effects"

import watchCommon from "./common"

export default function* root() {
	yield all([fork(watchCommon)])
}
