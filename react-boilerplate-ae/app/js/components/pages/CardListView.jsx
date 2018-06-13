'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { Button, ButtonFixed, Card, CardBody, CardImage, CardTitle, CardText, Fa } from 'mdbreact';
import Filters from '../sections/Filters.jsx'

const mapStateToProps = (state, props) => {
  let { listView: { data, batchSize, batchCount, scrollPos } } = state
  let { filters: { filtersChanged, activeFilters } } = state
  return { data, batchSize, batchCount, filtersChanged, activeFilters, scrollPos }
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
    },
    setScrollPos: payload => {
      dispatch({ type: "SET_SCROLL_POS", payload })
    },
    setLoading: payload => {
      dispatch({ type: "SET_LOADING", payload })
    }
  }
}

class CardListView extends React.Component {

  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this)
    this.handleScroll = this.handleScroll.bind(this);
    this.state = { batchUpdateTime: new Date(), showBackToTop: false }
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    this.props.updateNav(location.hash)
    this.getData()
    window.scrollTo(0, this.props.scrollPos);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    this.props.setScrollPos(window.pageYOffset)
  }

  componentDidUpdate() {

    let { filtersChanged, resetChangeState } = this.props

    if (filtersChanged === true) {
      resetChangeState()
      this.getData()
    }
  }

  getData() {

    let { batchSize, batchCount, setLoading, listViewLoad } = this.props
    let data = []

    //Toggle loading panel on
    setLoading(true)

    //################################################################################//
    //Use batchCount and batchSize to fetch only the next batch of items from yout API//
    //################################################################################//

    //#######################################################################//
    //Replace sample data with your own data fetched from an API or elsewhere//
    //#######################################################################//

    //Sample data
    data.push(
      {
        id: 1,
        title: "How to use this template site",
        description: "This site consits of 3 main components: filter, list-view and details-view. " +
          "You may customise/extend these components as needed in your own site."
      },
      {
        id: 2,
        title: "Getting data",
        description: "Each of the three main components implements a getData() function that you can " +
          "customise to suit your needs."
      },
      {
        id: 3,
        title: "Default required data structure for list-view",
        description: "Data needs to be in the following JSON structure: " +
          "[ { id: ..., title: \"...\", description: \"...\" } ]"
      },
      {
        id: 4,
        title: "Default required data structure for filters and details-view",
        description: "There is no default required data structure for these two components, " +
          "you are free to implement this however you like."
      }
    )

    //Toggle loading panel off (remember to do this when you have received your data)
    setLoading(false)

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
    listViewLoad(data)
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

    this.setState({ showBackToTop: (window.pageYOffset > 250) })
  }

  renderDataCards(data) {

    let items = []

    data.map(item => {

      items.push(
        <div key={data.indexOf(item)}>
          <Card>
            <CardBody>
              <CardTitle>{item.title}</CardTitle>
              <CardText>{item.description}</CardText>
              <Button
                color="primary"
                size="sm"
                onClick={() => { location.hash = "/details/" + item.id }}
                style={{ marginLeft: "0px" }}
              > View </Button>
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
        <Filters id="#top-section" />

        {this.renderDataCards(data)}

        {/* BACK TO TOP BUTTON */}
        <ButtonFixed
          hidden={this.state.showBackToTop === false}
          topSection={location.hash}
          floating
          color="red"
          icon="arrow-up"
          style={{ bottom: '45px', right: '24px' }}
          onClick={() => window.scroll({ top: 0, left: 0, behavior: 'smooth' })}>
        </ButtonFixed>
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardListView)