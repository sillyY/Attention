/**
 * reducers
 */
import { combineReducers } from "redux"

import common from "./common"
import time from "./time"

const rootReducer = combineReducers({
    common,
    time
})

export default rootReducer
