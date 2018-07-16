'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { fixEmptyValue } from '../../globalFunctions'

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

//Get test data
const testData = require('../../../data/tableViewData.js')

const mapStateToProps = (state, props) => {
  let { tableView: { data } } = state
  return { data }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateNav: payload => {
      dispatch({ type: "NAV", payload })
    },
    tableviewLoad: payload => {
      dispatch({ type: "TABLEVIEW_LOAD", payload })
    }
  }
}

class TableView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      defaultSortedId: "Surname",
      defaultSortedDir: "DESC"
    }
  }

  componentDidMount() {
    this.props.updateNav(location.hash)
    this.getData()
  }

  getData() {

    let { tableviewLoad } = this.props
    tableviewLoad(testData.data)
  }

  setupColumns(data) {
    let columns = []

    if (typeof data !== 'undefined' && data.length > 0) {

      Object.keys(data[0]).map(key => {
        columns.push({
          Header: key,
          accessor: key,
          headerStyle: { textAlign: "left", fontWeight: "bold" }
        })
      })
    }

    return columns
  }

  render() {

    let { data, filterable } = this.props
    let { defaultSortedId, defaultSortedDir } = this.state

    filterable = fixEmptyValue(filterable, true)

    if (data.length > 0) {
      return (
        <div>
          <br />
          <ReactTable
            data={data}
            showPagination={false}
            filterable={filterable}
            defaultFilterMethod={(filter, row) =>
              row[filter.id].toString().toLowerCase().indexOf(filter.value.toLowerCase()) >= 0}
            columns={this.setupColumns(data)}
            defaultPageSize={data.length}
            defaultSorted={[
              {
                id: defaultSortedId,
                desc: (defaultSortedDir == "ASC")
              }
            ]}
            className="-striped -highlight"
          />
        </div>
      )
    }
    else {
      return (
        < div >
          <br />
          &nbsp;No data found
        </div >
      )
    }


  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableView)