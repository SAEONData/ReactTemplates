'use strict'

export default function (state = {}, action) {
  const { type, payload } = action
  switch (type) {
    case  'SET_SONG': {
      const newState = { ...state, songName: payload }
      return newState
    }
    default: {
      return state
    }
  }
}