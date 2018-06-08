'use strict'

export default function FiltersReducer(state = {}, action) {

  let { type, payload } = action

  switch (type) {

    case 'FILTERS_LOAD':

    return {
      ...state, data: payload
    }

    case 'SET_FILTER':

      let { key, value } = payload
      if (typeof key === 'undefined' || typeof value === 'undefined') {
        return state
      }

      let searchFilters = state.activeFilters.filter(x => x.key === key)

      if (value !== "" && value !== 0 && value !== null) {

        if (searchFilters.length === 0 || (searchFilters.length > 0 && searchFilters[0].value !== value)) {
          //ADD/SET      
          return {
            ...state, activeFilters: [...state.activeFilters.filter(x => x.key !== key), { key, value }],
            filtersChanged: true
          }
        }
        else {
          return state
        }
      }
      else {

        if (searchFilters.length > 0) {
          //REMOVE
          return {
            ...state, activeFilters: state.activeFilters.filter(x => x.key !== key), filtersChanged: true
          }
        }
        else {
          return state
        }
      }

    case 'CLEAR_FILTERS':

      if (state.activeFilters.length > 0) {
        //CLEAR
        return {
          ...state, activeFilters: [], filtersChanged: true
        }
      }
      else {
        return state
      }

    case 'RESET_CHANGE_STATE':

      return {
        ...state, filtersChanged: false
      }

    default:
      return state

  }
}
