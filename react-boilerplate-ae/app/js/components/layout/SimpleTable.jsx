'use strict'

import React from 'react'

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

// Properties:
//  - label : Component label
//  - tooltip : Tooltip
//  - value : String/text value
//  - callback : callback to send filter value
//  - allowEdit : Toggle enabled/disabled

class TextInput extends React.Component {

  constructor(props) {
    super(props);
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

    let { data, defaultSortedId, defaultSortedDir } = this.props

    if (data.length > 0) {
      return (
        <div>
          <br />
          <ReactTable
            data={data}
            showPagination={false}
            // filterable={false}
            // defaultFilterMethod={(filter, row) =>
            //   row[filter.id].toString().toLowerCase().indexOf(filter.value.toLowerCase()) >= 0}
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

export default TextInput