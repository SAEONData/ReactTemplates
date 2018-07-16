'use strict'

export default function CarouselViewReducer(state = {}, action) {

  let { type, payload } = action

  switch (type) {

    case 'CAROUSELVIEW_LOAD':

      return {
        ...state, data: payload
      }

    default:
      return state

  }
}
