'use strict'

import React from 'react'
import { connect } from 'react-redux'
import {
  /*Carousel, CarouselControl, CarouselInner, CarouselItem, CarouselIndicator, CarouselIndicators, CarouselCaption, */
  Container, Row, Col, View, Mask, Button, Fa
} from 'mdbreact';
import { isEmptyValue } from '../../globalFunctions'

//import '../../../css/mdbreact-carousel.css' //Overrides default carousel css

//AntD Carousel
import Carousel from 'antd/lib/carousel'
import 'antd/lib/carousel/style/css'
import '../../../css/antd.carousel.css'

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

    this.next = this.next.bind(this)
    this.prev = this.prev.bind(this)
  }

  componentDidMount() {
    this.props.updateNav(location.hash)
    this.getData()
  }

  getData() {

    //Map & Load test data
    let transData = []

    //Dirisa test data
    //transData = this.transformDirisaData(testDataDirisa.data)

    //MindMup test data
    transData = this.transformMindMupData(testDataMindMup.data)

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
            newItem.description = "\nNode: " + textJS.node + '\n' + "Position: " + textJS.position + '\n' + "Groups: " + textJS.groups + '\n' + "Bio: " + textJS.bio
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
        let contentCol = isEmptyValue(item.imageSrc) ? "12" : "8"
        let descriptionItems = []

        let testVal = item.description.split("\n").filter(x => x !== "" && x !== "\r")  
        if(testVal.length > 0) {
          descriptionItems = testVal
        }
        else {
          descriptionItems.push(item.description)
        }

        items.push(
          <div key={"carouselItem_" + index.toString()} id={index}>
            <Row>
              {!isEmptyValue(item.imageSrc) &&
                <Col md="4" style={{ marginBottom: "10px" }}>
                  <table height="100%">
                    <tbody>
                      <tr>
                        <td valign="middle">
                          <img style={{ verticalAlign: "middle", width: "100%" }} src={item.imageSrc} />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Col>}

              <Col md={contentCol} >
                <h4>
                  {item.title}
                </h4>
                <div>
                  {descriptionItems.map(i => <p key={"descr_" + _.indexOf(descriptionItems, i).toString()}>{i}</p>)}
                </div>
              </Col>
            </Row>
            <br />
          </div>
        )
      })
    }

    return items
  }

  next() {
    this.slider.next()
  }

  prev() {
    this.slider.prev()
  }

  render() {

    let { data } = this.props

    if (data.length > 0) {
      return (
        <Container>
          <br />
          <Carousel ref={slider => (this.slider = slider)} autoplay >
            {this.renderItems()}
          </Carousel>

          <div style={{ textAlign: "center" }}>
            <Button color="elegant" tag="a" size="sm" floating onClick={this.prev}><Fa icon="step-backward" /></Button>
            <Button color="elegant" tag="a" size="sm" floating onClick={this.next}><Fa icon="step-forward" /></Button>
            <br />
            Hover slide to pause
          </div>
        </Container >
      );
    }
    else {
      return (<h4>No data!</h4>)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarouselView)