'use strict'

import { createStore, combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import reducers from './reducers'
import { loadUser } from 'redux-oidc'
import userManager from './components/Authentication/userManager'
import { reducer as oidcReducer } from 'redux-oidc';

const store = createStore(
  combineReducers({ oidc: oidcReducer, ...reducers, router: routerReducer }), {

    general: {
      loading: false
    },
    navigation: {
      locationHash: "#/"
    },
    filters: {
      data: [],
      activeFilters: [],
      filtersChanged: false
    },
    listView: {
      type: "card", //options: simple|card|tables|carousel
      scrollPos: 0,
      batchSize: 25,
      batchCount: 1,
      data: []
    },
    tableView: {
      // scrollPos: 0,
      // batchSize: 25,
      // batchCount: 1,
      data: []
    },
    detailsView: {
      data: []
    }

  }, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
loadUser(store, userManager)

export default store