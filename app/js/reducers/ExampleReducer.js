'use strict'

export default function ExampleReducer(state = {}, action) {

    let { type, payload } = action

    switch (type) {

        case 'ACTION_TYPE': {
            return {
                ...state, exampleData: { value1: payload }
            }
        }

        default: {
            return state
        }

    }
}
