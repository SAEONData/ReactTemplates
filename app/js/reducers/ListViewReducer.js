'use strict'

export default function ListViewReducer(state = {}, action) {

    let { type, payload } = action

    switch (type) {

        case 'LISTVIEW_LOAD': {
            return {
                ...state, data: payload
            }
        }

        default: {
            return state
        }

    }
}
