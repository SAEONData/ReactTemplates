'use strict'

export default function FiltersReducer(state = {}, action) {

  let { type, payload } = action

  switch (type) {

    case 'SET_FILTER': {

      let { key, value } = payload
      if (typeof key === 'undefined' || typeof value === 'undefined') {
        return state
      }

      if (value !== "" && value !== 0 && value !== null) {
        //ADD/SET      
        return {
          ...state, activeFilters: [...state.activeFilters.filter(x => x.key !== key), { key, value }]
        }
      }
      else {
        //REMOVE
        return {
          ...state, activeFilters: state.activeFilters.filter(x => x.key !== key)
        }
      }
    }

    case 'CLEAR_FILTERS': {

      return {
        ...state, activeFilters: []
      }
    }

    default: {
      return state
    }

  }
}
