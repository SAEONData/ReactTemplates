'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { fixEmptyValue } from '../../globalFunctions'
import { Input } from 'mdbreact'
import DateInput from '../input/DateInput.jsx'

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

const _ = require('lodash')

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

  GetDataType(data, key) {

    let dateCount = 0
    let numberCount = 0
    let stringCount = 0

    data.forEach(row => {

      let value = row[key]

      if (this.IsDate(value)) {
        dateCount += 1
      }
      else if (this.IsNumeric(value)) {
        numberCount += 1
      }
      else {
        stringCount += 1
      }
    });

    let list = [
      { key: "date", value: dateCount },
      { key: "number", value: numberCount },
      { key: "string", value: stringCount }
    ]

    list = list.sort((curr, next) => next.value - curr.value)
    return list[0].key
  }

  IsDate(value) {
    return !isNaN(Date.parse(value))
  }

  IsNumeric(value) {
    return !isNaN(value) && value.toString().trim() !== ""
  }

  setupColumns(data) {
    let columns = []

    if (typeof data !== 'undefined' && data.length > 0) {

      Object.keys(data[0]).map(key => {
        columns.push({
          Header: key,
          accessor: key,
          headerStyle: { textAlign: "left", fontWeight: "bold" },
          filterMethod: (filter, row) => {

            let value = row[filter.id]

            if (this.IsDate(value)) {

              let fromDate = this.IsDate(filter.value.from) ? new Date(filter.value.from) : new Date("1900", "01", "01")
              let toDate = this.IsDate(filter.value.to) ? new Date(filter.value.to) : new Date("2199", "12", "31")

              if (this.IsDate((value))) {
                value = new Date(value)
                return (value >= fromDate && value <= toDate)
              }
              return false
            }
            else if (this.IsNumeric(value)) {

              let fromNum = this.IsNumeric(filter.value.from) ? Number(filter.value.from) : Number.MIN_VALUE
              let toNum = this.IsNumeric(filter.value.to) ? Number(filter.value.to) : Number.MAX_VALUE

              if (this.IsNumeric((value))) {
                value = Number(value)
                return (value >= fromNum && value <= toNum)
              }
              return false
            }
            else {

              if (filter.value === "" || _.isEqual(filter.value, { from: "", to: "" })) {
                return true
              }
              else {
                try {
                  return row[filter.id].toString().toLowerCase().indexOf(filter.value.toLowerCase()) >= 0
                } catch (error) {
                  return false
                }
              }
            }
          },
          Filter: ({ filter, row, onChange }) => {

            let type = this.GetDataType(data, key)

            if (type === 'date') {

              if (typeof filter === 'undefined' || filter.value === 'undefined') {
                filter = { value: { from: "", to: "" } }
              }

              return (
                <div>
                  <div style={{ marginBottom: "2px" }}>
                    <DateInput
                      placeholder={"From"}
                      callback={dateString => onChange({ ...filter.value, from: dateString })}
                    />
                  </div>
                  <div style={{ marginBottom: "-2px" }}>
                    <DateInput
                      placeholder={"To"}
                      callback={dateString => onChange({ ...filter.value, to: dateString })}
                    />
                  </div>
                </div>
              )
            }
            else if (type === 'number') {

              if (typeof filter === 'undefined' || filter.value === 'undefined') {
                filter = { value: { from: "", to: "" } }
              }

              return (
                <div>
                  <Input onChange={event => onChange(event.target.value)}
                    type="number"
                    style={{ height: "24.5px", marginLeft: "-4px", marginRight: "auto", marginTop: "-24px", marginBottom: "0px", width: "95%", fontSize: "15px" }}
                    onChange={event => onChange({ ...filter.value, from: event.target.value })}
                    hint="From" />

                  <Input onChange={event => onChange(event.target.value)}
                    type="number"
                    style={{ height: "24.5px", marginLeft: "-4px", marginRight: "auto", marginTop: "-22px", marginBottom: "-28px", width: "95%", fontSize: "15px" }}
                    onChange={event => onChange({ ...filter.value, to: event.target.value })}
                    hint="To" />
                </div>
              )
            }
            else {

              return (
                <div>
                  <Input onChange={event => onChange(event.target.value)}
                    style={{ height: "24.5px", marginLeft: "-4px", marginRight: "auto", marginTop: "-24px", marginBottom: "-25px", width: "95%", fontSize: "15px" }}
                    value={filter ? filter.value : ""} />
                </div >)
            }


          }

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
            defaultFilterMethod={(filter, row) => row[filter.id].toString().toLowerCase().indexOf(filter.value.toLowerCase()) >= 0}
            columns={this.setupColumns(data)}
            defaultPageSize={data.length}
            defaultSorted={[{ id: defaultSortedId, desc: (defaultSortedDir == "ASC") }]}
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