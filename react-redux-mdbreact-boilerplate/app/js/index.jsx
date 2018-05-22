'use strict'

/**
 * Dependencies
 * @ignore
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

/**
 * Routing
 */
import { HashRouter as Router, Route, IndexRoute, Redirect, Switch } from 'react-router-dom'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import { createHashHistory } from 'history'

/**
 * CSS
 */
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'mdbreact/dist/css/mdb.css'

/**
 * injectTapEventPlugin
 */
import injectTapEventPlugin from 'react-tap-event-plugin'

/**
 * Link store to history
 */
import createStoreWithHistory from './store'

/**
 * Background
 */
import Background from '../images/background.png'

import { Button, Card, CardBody, CardImage, CardTitle, CardText, Container } from 'mdbreact'

/**
 * module imports
 */
import { HomePage, AboutPage, MusicPage } from './pages'
import { TopBar, CardBlock } from './components'

/**
 * Tap Event
 * @ignore
 */
injectTapEventPlugin()

/**
 * Hash history
 */
const history = createHashHistory()

/**
 * store
 */
const store = createStoreWithHistory(history)

const style = {
  flex: 1,
  height: "100%",
  width: "100%",
  backgroundImage: `url(${Background}`
}

const center = {
  position: "absolute",
  top: "50%",
  left: "50%",
}
/**
 * MainLayout
 * @class
 */
class MainLayout extends React.Component {
  componentDidMount() { }

  render() {
    return (
      <Provider store={store} >
        <Container className="clearfix">
          <ConnectedRouter style={style} history={history}>
            <div>
              <TopBar />
              <Switch>
                <Route path="/home" component={HomePage} />
                <Route path="/about" component={AboutPage} />
                <Route path="/music" component={MusicPage} />
              </Switch>
            </div>
          </ConnectedRouter>
        </Container>
      </Provider>
    )
  }
}

/**
 * DOM
 * @ignore
 */
ReactDOM.render(
  <div className="teal accent-3" style={{ height: "100%" }}>
    <MainLayout />
  </div>,
  document.getElementById('app')
)