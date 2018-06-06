'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { Card, CardBody, CardImage, CardTitle, CardText } from 'mdbreact';
import Filters from '../sections/Filters.jsx'

const mapStateToProps = (state, props) => {
  let { listView: { data, batchSize, batchCount } } = state
  let { filters: { filtersChanged, activeFilters } } = state
  return { data, batchSize, batchCount, filtersChanged, activeFilters }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateNav: payload => {
      dispatch({ type: "NAV", payload })
    },
    listViewLoad: payload => {
      dispatch({ type: "LISTVIEW_LOAD", payload })
    },
    nextBatch: () => {
      dispatch({ type: "NEXT_BATCH", payload: null })
    },
    resetChangeState: () => {
      dispatch({ type: "RESET_CHANGE_STATE", payload: null })
    }
  }
}

class ListView extends React.Component {

  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this)
    this.handleScroll = this.handleScroll.bind(this);
    this.state = { batchUpdateTime: new Date() }
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    this.props.updateNav(location.hash)
    this.getData()
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  componentDidUpdate() {

    let { filtersChanged, resetChangeState } = this.props

    if (filtersChanged === true) {
      resetChangeState()
      this.getData()
    }

  }

  handleScroll() {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;

    if (Math.ceil(windowBottom) >= docHeight && (new Date() - this.state.batchUpdateTime) > 100) {
      this.props.nextBatch()
      this.setState({ batchUpdateTime: new Date() })
      this.getData()
    }
  }

  getData() {

    let { batchSize, batchCount } = this.props
    let data = []

    //################################################################################//
    //Use batchCount and batchSize to fetch only the next batch of items from yout API//
    //################################################################################//

    //#######################################################################//
    //Replace sample data with your own data fetched from an API or elsewhere//
    //#######################################################################//

    //Sample data
    data.push(
      {
        title: "How to use this template component",
        image: null,
        description: "This component is designed as a template list-view page that you can easily " +
          "extend to suit your needs. The getData() function is provided to get data for this component. " +
          "Please use/extend this function to get data."
      },
      {
        title: "Required data structure",
        image: null,
        description: [
          "Data needs to be in the following JSON structure: ",
          "[",
          "   {",
          "      title: \"...\",",
          "      image: ...,",
          "      description: \"...\",",
          "   } ",
          "]"
        ].join("")
      }
    )

    //###########################//
    //Please keep this part below//
    //###########################//

    //Insert scroll instruction
    if (data.length === batchSize) {
      data.push({
        title: "Want to see more?",
        description: "Scroll down to the bottom of the page to load more items..."
      })
    }

    //return data
    this.props.listViewLoad(data)
  }

  renderDataCards(data) {

    let items = []

    data.map(item => {

      items.push(
        <div key={data.indexOf(item)}>
          <Card>
            <CardBody>
              <CardTitle>{item.title}</CardTitle>
              <CardText>
                {item.description}
              </CardText>
            </CardBody>
          </Card>
          <br />
        </div>
      )
    })

    return items
  }

  render() {

    let { data } = this.props

    return (
      <>
        <Filters />

        {this.renderDataCards(data)}
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListView)