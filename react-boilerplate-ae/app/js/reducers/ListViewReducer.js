'use strict'

export default function ListViewReducer(state = {}, action) {

  let { type, payload } = action

  switch (type) {

    case 'LISTVIEW_LOAD':
      return {
        ...state, data: payload
      }

    case 'NEXT_BATCH':
      return {
        ...state, batchCount: (state.batchCount + 1)
      }

    case 'NAV':
    case 'RESET_BATCH_COUNT':
      return {
        ...state, batchCount: 1
      }

    case 'SET_SCROLL_POS':
      return {
        ...state, scrollPos: payload
      }


    default:
      return state

  }
}
