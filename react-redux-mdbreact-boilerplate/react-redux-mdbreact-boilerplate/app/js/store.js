'use strict'

import { createStore, combineReducers, applyMiddleware  } from 'redux'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'
import { createHashHistory } from 'history'
import reducers from './reducers'


function createStoreWithHistory(history) {
  const middleware = routerMiddleware(history)

  return createStore(
    combineReducers({...reducers, router: routerReducer}), {
      player: { songName: "Kennilworth" },
      ...applyMiddleware(middleware)
    }, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
}

export default createStoreWithHistory