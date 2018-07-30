//Components
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import store from './store'
import userManager from './components/Authentication/userManager';
import { OidcProvider } from 'redux-oidc'

import App from './App.jsx'

// /**
//  * Tap Event
//  * @ignore
//  */
// injectTapEventPlugin()

const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <OidcProvider store={store} userManager={userManager}>
        <Component />
      </OidcProvider>
    </Provider>,
    document.getElementById('app')
  )
}

render(App)

if (module.hot) { 
  module.hot.accept('./App.jsx', () => { render(App) })
}