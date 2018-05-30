'use strict'

export default function ExampleReducer(state = {}, action) {

    let { type, payload } = action

    switch (type) {

        case 'TEST': {
            return {
                ...state, value: payload
            }
        }

        default: {
            return state
        }

    }
}
