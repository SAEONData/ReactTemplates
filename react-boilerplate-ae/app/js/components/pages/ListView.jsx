'use strict'

import React from 'react'
import { connect } from 'react-redux'
import {
  Button, ButtonFixed, Card, CardBody, CardImage, CardTitle, CardText, Fa,
  ListGroup, ListGroupItem, Input, Row, Col, FormInline
} from 'mdbreact';
import Filters from '../sections/Filters.jsx'
import * as globalFunctions from '../../globalFunctions'

const queryString = require('query-string')

const mapStateToProps = (state, props) => {
  let { listView: { type, data, batchSize, batchCount, scrollPos } } = state
  let { filters: { filtersChanged, activeFilters } } = state
  return { type, data, batchSize, batchCount, filtersChanged, activeFilters, scrollPos }
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

class ListView extends React.Component {

  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this)
    this.handleScroll = this.handleScroll.bind(this);
    this.state = { batchUpdateTime: new Date(), showBackToTop: false, type: props.type }
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    this.props.updateNav(location.hash)
    window.scrollTo(0, this.props.scrollPos);

    //Read filters from URL
    const parsedHash = globalFunctions.readFiltersFromURL()

    //Only getData here if there are no URL filters,
    //else wait for URL filters to be processed first.
    if (Object.keys(parsedHash).length === 0) {

      this.getData()
    }
  }

  componentDidUpdate() {

    let { filtersChanged, resetChangeState } = this.props

    if (filtersChanged === true) {
      resetChangeState()
      this.getData()
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    this.props.setScrollPos(window.pageYOffset)
  }

  getData() {

    let { batchSize, batchCount, setLoading, listViewLoad, activeFilters } = this.props
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
        description: "This site consits of 3 main components: filters, list-view and details-view. " +
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
      },
      {
        id: 5,
        title: "Components page",
        description: "There is also a components page to demo some of the other template components " +
          "available in the project."
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

  renderSimpleList(data) {

    return (
      <ListGroup>
        {
          data.map(item => {
            return (
              <ListGroupItem key={"li_" + item.id} hover href={"#/details/" + item.id}>
                <h5>{item.title}</h5>
                <p>{item.description}</p>
              </ListGroupItem>
            )
          })
        }
      </ListGroup>
    )

    return items
  }

  renderCardList(data) {

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

  renderList(data, type) {

    if (typeof data === 'undefined' || data === null) {
      return null
    }

    switch (type) {
      case "simple":
        return this.renderSimpleList(data)

      case "card":
        return this.renderCardList(data)

      case "tables":
        return null

      case "carousel":
        return null
    }
  }

  render() {

    let { data } = this.props
    let { type } = this.state

    return (
      <>
        <Filters />

        {/* Simply for demo purposes */}
        <Row style={{ marginTop: "-25px" }}>
          <Col md="12">
            <FormInline>
              <label><b>&nbsp;List style:</b></label>
              <Input onClick={() => this.setState({ type: "simple" })} checked={this.state.type === "simple"} label="Simple" type="radio" id="radioSimple" />
              <Input onClick={() => this.setState({ type: "card" })} checked={this.state.type === "card"} label="Card" type="radio" id="radioCard" />
            </FormInline>
          </Col>
        </Row>
        <hr style={{ marginTop: "-10px" }} />
        {/* Simply for demo purposes */}

        <Row>
          <Col md="12">
            {this.renderList(data, type)}
          </Col>
        </Row>

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

export default connect(mapStateToProps, mapDispatchToProps)(ListView)