'use strict'

import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = (state, props) => {
  let { filters: { activeFilters } } = state
  return { activeFilters }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFilter: (key, value) => {
      dispatch({ type: "SET_FILTER", payload: { key, value } })
    }
  }
}

class ActiveFilters extends React.Component {

  constructor(props) {
    super(props);

    this.renderActiveFilters.bind(this)
  }

  removeFilter(key){
    this.props.setFilter(key, "")
  }

  renderActiveFilters() {

    let { activeFilters } = this.props
    let chips = []

    activeFilters.map(filter => {
      chips.push(
        <div className="chip grey lighten-1" key={filter.key} style={{ marginTop: "10px", marginBottom: "-10px"}}>
            {filter.key + ": " + filter.value}
            <i className="close fa fa-times" onClick={this.removeFilter.bind(this, filter.key)}></i>
        </div>
    )
    })

    return chips
  }

  render() {

    return (
      <>
        {this.renderActiveFilters()}
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveFilters)