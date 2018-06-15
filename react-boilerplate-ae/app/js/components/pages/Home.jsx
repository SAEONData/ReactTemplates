'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { Card, CardBody, CardImage, CardTitle, CardText } from 'mdbreact'

const mapStateToProps = (state, props) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateNav: payload => {
      dispatch({ type: "NAV", payload })
    }
  }
}

class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.updateNav(location.hash)
  }

  render() {

    return (
      <>
        <br />
        <div className="jumbotron" style={{ background: "#1e88e5" }}>
          <h1 style={{ color: "white", marginLeft: "-3px" }}>Boilerplate React project</h1>
          <p className="lead" style={{ color: "white" }}>
            This project serves as a template for new React projects and
            contains some generic template components for reuse in other
            projects.
          </p>
        </div>
        <Card>
          <CardBody>
            <CardTitle style={{ color: "#1976d2", marginLeft: "-2px" }}>
              How to use this template site
            </CardTitle>
            <CardText style={{ fontSize: "medium" }}>
              This site consits of 3 main components: filters, list-view and details-view.
              You may customise/extend these components as needed in your own site.
            </CardText>
          </CardBody>
        </Card>
        <br />
        <Card>
          <CardBody>
            <CardTitle style={{ color: "#1976d2", marginLeft: "-2px" }}>
              Getting data
            </CardTitle>
            <CardText style={{ fontSize: "medium" }}>
              Each of the three main components implements a getData() function that you can
              customise to suit your needs.
            </CardText>
          </CardBody>
        </Card>
        <br />
        <Card>
          <CardBody>
            <CardTitle style={{ color: "#1976d2", marginLeft: "-2px" }}>
              Default required data structure for list-view
            </CardTitle>
            <CardText style={{ fontSize: "medium" }}>
              Data needs to be in the following JSON structure by default:<br />
              [ &#123; id: ... title: "..." description: "..." &#125; ]<br /><br />
              <i>* You are however welcome to change the default requirement to suit your needs</i>
            </CardText>
          </CardBody>
        </Card>
        <br />
        <Card>
          <CardBody>
            <CardTitle style={{ color: "#1976d2", marginLeft: "-2px" }}>
              Default required data structure for filters
            </CardTitle>
            <CardText style={{ fontSize: "medium" }}>
              Data needs to be in the following JSON structure by default:<br />
              [ &#123; type: "...", key: "...", label: "..." data: [...] &#125; ]<br /><br />
              <i>* You are however welcome to change the default requirement to suit your needs</i>
            </CardText>
          </CardBody>
        </Card>
        <br />
        <Card>
          <CardBody>
            <CardTitle style={{ color: "#1976d2", marginLeft: "-2px" }}>
              Default required data structure for details-view
            </CardTitle>
            <CardText style={{ fontSize: "medium" }}>
              There is no default required data structure for this component,
              you are free to implement this however you like.
            </CardText>
          </CardBody>
        </Card>
        <br />
        <Card>
          <CardBody>
            <CardTitle style={{ color: "#1976d2", marginLeft: "-2px" }}>
              Components page
            </CardTitle>
            <CardText style={{ fontSize: "medium" }}>
              There is also a <a style={{ color: "#1976d2" }} href="#/comp">components</a> page
              to demo some of the other template components available in the project.
            </CardText>
          </CardBody>
        </Card>
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)