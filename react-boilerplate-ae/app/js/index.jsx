'use strict'

/**
 * Depecdencies
 * @ignore
 */

//Styles - Ant.Design (has to be loaded before MDB so that MDB can replace all applicable styles)
import 'antd/lib/style/index.css'

//Styles - MDB
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'mdbreact/dist/css/mdb.css'

//Components
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import store from './store'
import queryString from 'query-string'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Home from './components/Pages/Home.jsx'
import ListView from './components/Pages/ListView.jsx'
import DetailsView from './components/Pages/DetailsView.jsx'
import Components from './components/Pages/Components.jsx'
import Login from './components/Authentication/Login.jsx'
import Logout from './components/Authentication/Logout.jsx'
import Navbar from './components/navigation/Navbar.jsx'
import Footer from './components/navigation/Footer.jsx'
import CallbackPage from '../js/components/Authentication/callback.jsx';
import LoggedOut from './components/Authentication/LoggedOut.jsx';
import userManager from './components/Authentication/userManager';
import { OidcProvider } from 'redux-oidc'
import LoadingPanel from './components/input/LoadingPanel.jsx'

/**
 * Tap Event
 * @ignore
 */
injectTapEventPlugin()

const mapStateToProps = (state, props) => {
  let { general: { loading } } = state
  return { loading }
}

/**
 * App
 */
class App extends React.Component {

  constructor(props) {
    super(props);

    this.getNavbar = this.getNavbar.bind(this)

    this.state = { navbar: true }
    if (location.toString().includes("navbar=hidden")) {
      this.state = { navbar: false }
    }
  }

  getNavbar() {
    if (this.state.navbar) {
      return <Navbar />
    }
  }

  render() {

    let { loading } = this.props

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
              <Route path="/list" component={ListView} />
              <Route path="/details/:id" component={DetailsView} exact />
            </Switch>

            <br />
            <Footer />

            <LoadingPanel enabled={loading} />

          </div>

        </Router>
      </div>
    )
  }
}

const ConnectedApp = connect(mapStateToProps)(App)

ReactDOM.render(
  <Provider store={store}>
    <OidcProvider store={store} userManager={userManager}>
      <ConnectedApp />
    </OidcProvider>
  </Provider>,
  document.getElementById('app')
)
