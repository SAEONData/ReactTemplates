'use strict'

import React from 'react'
import { Card, CardBody, CardTitle } from 'mdbreact';

import SimpleTable from '../layout/SimpleTable.jsx'

//Get test data
const testTableData = require('../../../data/tableViewData.js')

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <>
        <br />
        <Card>
          <CardBody>
            <CardTitle>Table-View:</CardTitle>
            <SimpleTable data={testTableData.data} defaultSortedId="ID" defaultSortedDir="DESC"/>
          </CardBody>
        </Card>
      </>
    )
  }
}

export default Dashboard