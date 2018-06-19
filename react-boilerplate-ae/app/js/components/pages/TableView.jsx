'use strict'

import React from 'react'
import { connect } from 'react-redux'
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

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
  }

  componentDidMount() {
    this.props.updateNav(location.hash)
    this.getData()
  }

  getData() {

    let { tableviewLoad } = this.props

    let data = [
      { ID: 46852148624, Name: "Andre", Surname: "Engelbrecht", Email: "andre@saeon.ac.za" },
      { ID: 46821321864, Name: "Mark", Surname: "Jacobson", Email: "mark@saeon.ac.za" },
      { ID: 65432186132, Name: "St.John", Surname: "Giddy", Email: "stjohn@saeon.ac.za" },
      { ID: 86132158658, Name: "Wim", Surname: "Hugo", Email: "wim@saeon.ac.za" },
      { ID: 12354321564, Name: "Tim", Surname: "Parker-Nance", Email: "timpn@saeon.ac.za" },
      { ID: 65413216845, Name: "Alex", Surname: "Pfeiffer", Email: "alex@saeon.ac.za" },
      { ID: 65432186231, Name: "Graham", Surname: "Traas", Email: "graham@saeon.ac.za" },
    ]

    tableviewLoad(data)
  }

  render() {

    let { data } = this.props

    if (data.length > 0) {
      return (
        <div>
          <br />
          <ReactTable
            data={data}
            showPagination={false}
            filterable
            defaultFilterMethod={(filter, row) =>
              row[filter.id].toString().toLowerCase().indexOf(filter.value.toLowerCase()) >= 0}
            columns={[
              {
                Header: "ID",
                accessor: "ID",
                headerStyle: { textAlign: "left", fontWeight: "bold" }
              },
              {
                Header: "Name",
                accessor: "Name",
                headerStyle: { textAlign: "left", fontWeight: "bold" }
              },
              {
                Header: "Surname",
                accessor: "Surname",
                headerStyle: { textAlign: "left", fontWeight: "bold" }
              },
              {
                Header: "Email",
                accessor: "Email",
                headerStyle: { textAlign: "left", fontWeight: "bold" }
              }
            ]}
            defaultPageSize={data.length}
            defaultSorted={[
              {
                id: "Surname",
                desc: false
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
          <br/>
          &nbsp;No data found
        </div >
      )
    }


  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableView)