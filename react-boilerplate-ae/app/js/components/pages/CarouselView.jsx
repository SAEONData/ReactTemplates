'use strict'

import React from 'react'
import { connect } from 'react-redux'
import {
  Carousel, CarouselControl, CarouselInner, CarouselItem, CarouselIndicator, CarouselIndicators, Container, Row, Col,
  CarouselCaption, View, Mask
} from 'mdbreact';
import { GetUID } from '../../globalFunctions'

import '../../../css/mdbreact-carousel.css' //Overrides default carousel css

const _ = require('lodash')

//Get test data
const testDataDirisa = require('../../../data/carouselDataDirisa.js')
const testDataMindMup = require('../../../data/carouselDataMindMup.js')

const mapStateToProps = (state, props) => {
  let { carouselView: { data } } = state
  return { data }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateNav: payload => {
      dispatch({ type: "NAV", payload })
    },
    carouselViewLoad: payload => {
      dispatch({ type: "CAROUSELVIEW_LOAD", payload })
    }
  }
}

const indStyle = (active) => {
  if (active) {
    return {
      background: "#4285F4" //active color
    }
  }
  else {
    return {
      background: "#A0C2FA"
    }
  }
}

class CarouselView extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.updateNav(location.hash)
    this.getData()
  }

  getData() {

    //Map & Load test data
    let transData = []

    //Dirisa test data
    transData = this.transformDirisaData(testDataDirisa.data)

    //MindMup test data
    //transData = this.transformMindMupData(testDataMindMup.data)

    this.props.carouselViewLoad(transData)
    this.setState({ maxLength: transData.length })
  }

  transformDirisaData(data) {
    let result = []
    data.map(x => result.push({
      title: x.title,
      description: x.description.replace(/<[^>]+>/g, ''),
      imageSrc: x.image_url
    }))
    return result
  }

  transformMindMupData(data) {

    let items = []
    let ideas = data.ideas

    if (typeof ideas !== 'undefined') {
      let keys = Object.keys(ideas)
      keys.forEach(key => {
        if (typeof ideas[key].title !== 'undefined') {

          let newItem = {
            title: ideas[key].title,
            description: "",
            imageSrc: ""
          }

          if (typeof ideas[key].attr.note !== 'undefined') {
            let textJS = JSON.parse(ideas[key].attr.note.text)
            newItem.description = "\nNode: " + textJS.node + '\n' + "Position: " + textJS.position + '\n' + "Groups: " + '\n' + "Bio: " + textJS.groups + textJS.bio
          }

          items.push(newItem)
        }
        items.push(...this.transformMindMupData(ideas[key]))
      })
    }

    return items
  }

  renderItems() {

    let { data } = this.props
    let items = []

    if (typeof data !== 'undefined') {
      data.map(item => {

        let index = _.indexOf(data, item) + 1

        items.push(
          <CarouselItem key={"carouselItem_" + index.toString()} itemId={index}>
            <Row>
              <Col md="4" style={{ marginBottom: "10px" }}>
                <table height="100%">
                  <tbody>
                    <tr>
                      <td valign="middle">
                        <img style={{ verticalAlign: "middle", width: "100%" }} src={item.imageSrc} alt={"slide " + index.toString()} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Col>
              <Col md="8" >
                <h4>
                  {item.title}
                </h4>
                <div>
                  {item.description.split("\n").map(i => <p key={GetUID()}>{i}</p>)}
                </div>
              </Col>
            </Row>
          </CarouselItem>
        )
      })
    }

    return items
  }

  render() {

    let { data } = this.props

    if (data.length > 0) {
      return (
          <Container>
            <br />
            <Carousel style={{ padding: "10px" }}
              interval={false}
              activeItem={1}
              length={data.length}
              slide={true}
              showControls={true}
              showIndicators={true}
              className="z-depth-1">
              <Row>
                <Col md="12">
                  <CarouselInner style={{paddingLeft: "100px", paddingRight: "100px"}}>
                    {this.renderItems()}
                  </CarouselInner>
                  <br/>
                  <br/>
                </Col>
              </Row>
            </Carousel>
          </Container >
      );
    }
    else {
      return (<h4>No data!</h4>)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarouselView)