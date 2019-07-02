import * as actions from "../actionTypes"

export default (
	state = {
		time: {
			visible: false,
			content: {
                date: '',
                hour: '',
                minute: '',
                second: ''
            }
		}
	},
	action
) => {
	switch (action.type) {
		case actions.SET_TIME:
			return {
				...state,
				time: action.payload
			}
		default:
			return state
	}
}
