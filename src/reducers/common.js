import * as actions from "../actionTypes"

export default (
	state = {
		toast: {
			visible: false,
			content: ""
		}
	},
	action
) => {
	switch (action.type) {
		case actions.SET_TOAST:
			return {
				...state,
				toast: action.payload
			}
		default:
			return state
	}
}
