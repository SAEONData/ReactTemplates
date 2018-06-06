'use strict'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import reducers from './reducers'
import { loadUser } from 'redux-oidc'
import userManager from './components/Authentication/userManager'
import { reducer as oidcReducer } from 'redux-oidc';

const store = createStore(
    combineReducers({oidc: oidcReducer, ...reducers, router: routerReducer }), {

        navigation: {
            locationHash: "#/"
        },
        listView:{
            batchSize: 25,
            batchCount: 1,
            data: []
        },
        filters:{
            activeFilters: [],
            filtersChanged: false
        }
        
    }, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
loadUser(store, userManager)

export default store