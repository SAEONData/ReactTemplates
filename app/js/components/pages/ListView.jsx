'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { Card, CardBody, CardImage, CardTitle, CardText } from 'mdbreact';
import Filters from '../sections/Filters.jsx'

const mapStateToProps = (state, props) => {
  let { listView: { data } } = state
  return { data }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateNav: payload => {
      dispatch({ type: "NAV", payload })
    },
    listViewLoad: payload => {
      dispatch({ type: "LISTVIEW_LOAD", payload })
    }
  }
}

class ListView extends React.Component {

  constructor(props) {
    super(props);

    this.getData.bind(this)
  }

  componentDidMount() {
    this.props.updateNav(location.hash)
    this.getData()
  }

  getData() {

    let data = []

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

    //let data = this.getData()
    let { data } = this.props

    return (
      <>
        <Filters/>
      
        {this.renderDataCards(data)}
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListView)