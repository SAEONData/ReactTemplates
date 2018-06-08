'use strict'

export default function DetailsViewReducer(state = {}, action) {

  let { type, payload } = action

  switch (type) {

    case 'DETAILSVIEW_LOAD':

      return {
        ...state, data: payload
      }

    default:
      return state

  }
}
