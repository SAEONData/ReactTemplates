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

class Dashboard extends React.Component {

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
          <h1>Dashboard</h1>
        </div>
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)