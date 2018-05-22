'use strict'

/**
 * Depecdencies
 * @ignore
 */
import 'antd/lib/style/index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'mdbreact/docs/css/mdb.min.css'
import store from './store'
import queryString from 'query-string'
import { Button } from 'mdbreact/'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Home from './components/Pages/Home.jsx'
import Components from './components/Pages/Components.jsx'
import Login from './components/Authentication/Login.jsx'
import Logout from './components/Authentication/Logout.jsx'
import MainNavbar from './components/Pages/MainNavbar.jsx'
import CallbackPage from '../js/components/Authentication/callback.jsx';
import LoggedOut from './components/Authentication/LoggedOut.jsx';
import userManager from './components/Authentication/userManager';
import { OidcProvider } from 'redux-oidc'

/**
 * Tap Event
 * @ignore
 */
injectTapEventPlugin()

/**
 * App
 */
class App extends React.Component {

  constructor(props) {
    super(props);

    this.getNavbar = this.getNavbar.bind(this)

    this.state = { navbar: true}
    if(location.toString().includes("navbar=hidden")){
      this.state = { navbar: false}
    }
  }

  getNavbar(){
    if(this.state.navbar){
      return <MainNavbar />
    }
  }

  render() {
    return (
      <div className="container">
        <Router>
          <div>

            {this.getNavbar()}

            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/components" component={Components} />
              <Route path="/login" component={Login} exact />
              <Route path="/logout" component={Logout} exact />
              <Route path="/loggedout" component={LoggedOut} exact />
              <Route path="/callback" component={CallbackPage} />
            </Switch>

          </div>

        </Router>
      </div>
    )
  }
}

ReactDOM.render(
  <Provider store={store}>
    <OidcProvider store={store} userManager={userManager}>
      <App />
    </OidcProvider>
  </Provider>,
  document.getElementById('app')
)
