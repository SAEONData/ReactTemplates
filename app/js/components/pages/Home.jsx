'use strict'

import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = (state, props) => {
  return { }
}

const mapDispatchToProps = (dispatch) => {
  return {
      updateNav: payload => {
          dispatch({ type: "NAV", payload })
      }
  }
}

class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.updateNav(location.hash)
  }

  render() {

    return (
      <>
        <br />
        <div className="jumbotron">
          <h1>Boilerplate React project</h1>
          <p className="lead">
            This project serves as a template for new React projects and
            contains some generic template components for reuse in other 
            projects.
          </p>
          <p className="lead">
            See the <a href="/#/components" >Components</a> page for more details.
          </p>
        </div>
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)