'use strict'

import React from 'react'
import { connect } from 'react-redux'
import {
  Carousel, CarouselControl, CarouselInner, CarouselItem, CarouselIndicator, CarouselIndicators, Container, Row, Col
} from 'mdbreact';
import { GetUID } from '../../globalFunctions'

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
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.state = {
      activeItem: 1,
      maxLength: 1
    };
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

  next() {
    let nextItem = this.state.activeItem + 1;
    if (nextItem > this.state.maxLength) {
      this.setState({ activeItem: 1 });
    } else {
      this.setState({ activeItem: nextItem });
    }
  }

  prev() {
    let prevItem = this.state.activeItem - 1;
    if (prevItem < 1) {
      this.setState({ activeItem: this.state.maxLength });
    } else {
      this.setState({ activeItem: prevItem });
    }
  }

  goToIndex(item) {
    if (this.state.activeItem !== item) {
      this.setState({
        activeItem: item
      });
    }
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
              <Col md="8" style={{ borderLeft: "1px solid grey" }}>
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

  renderIndicators() {

    let { data } = this.props
    let { activeItem } = this.state
    let indicators = []

    if (typeof data !== 'undefined') {
      data.map(item => {

        let index = _.indexOf(data, item) + 1

        indicators.push(
          <CarouselIndicator
            key={"carouselIndicator_" + index.toString()}
            style={indStyle(activeItem === index)}
            active={activeItem === index ? true : false}
            onClick={() => { this.goToIndex(index); }}
          ></CarouselIndicator>
        )
      })
    }

    return indicators
  }

  render() {

    const { activeItem } = this.state;

    return (
      <Container>
        <br />
        <Carousel style={{ padding: "10px" }}
          activeItem={this.state.activeItem}
          next={this.next}
          className="z-depth-1">
          <Row>
            <Col xs="6">
              <CarouselControl iconLeft className="btn-floating btn-primary btn-sm" direction="prev" role="button" onClick={() => { this.prev(); }} />
            </Col>
            <Col xs="6" className="text-right">
              <CarouselControl iconRight className="btn-floating btn-primary btn-sm" direction="next" role="button" onClick={() => { this.next(); }} />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <CarouselInner>
                {this.renderItems()}
              </CarouselInner>
            </Col>
          </Row>
          <Row style={{ marginTop: "70px" }}>
            <Col md="12">
              <CarouselIndicators>
                {this.renderIndicators()}
              </CarouselIndicators>
            </Col>
          </Row>
        </Carousel>
      </Container >
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarouselView)