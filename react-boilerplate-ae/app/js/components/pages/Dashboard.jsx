'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { Card, CardBody, CardTitle } from 'mdbreact';

import SimpleTable from '../layout/SimpleTable.jsx'

//Get test data
const testData = require('../../../data/tableViewData.js')

const mapStateToProps = (state, props) => {
  return {}
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

  componentDidMount() {
    this.props.updateNav(location.hash)
  }

  render() {

    return (
      <>
        <br />
        <Card>
          <CardBody>
            <CardTitle>Table-View:</CardTitle>
            <SimpleTable data={testData.data} defaultSortedId="ID" defaultSortedDir="DESC"/>
          </CardBody>
        </Card>
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)