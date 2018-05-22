'use strict'

/**
 * Dependencies
 * @ignore
 */
import React from 'react'
import { history } from 'history'

import { Button, Card, CardBody, CardImage, CardTitle, CardText, Container } from 'mdbreact'

class CardBlock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      button: { href: "", text: "", props: {} }, className: "", content: ""
    }
  }

  componentWillMount() {
    const { button, className, content, title } = this.props
    this.setState({ button, className, content, title })
  }

  render() {
    const {
      title, button, className, content
    } = this.state

    return (
      /* use py-md-2 as a default spacing*/
      <div className={className || "py-2"}>
        <Card>
          <CardBody>
            <CardTitle>{title}</CardTitle>
            <CardText>{content}</CardText>
            {this.props.children}
            { button ? <Button onTouchTap={() => window.location.hash = button.href} {...button.props}>{button.text}</Button> : <div></div> }
          </CardBody>
        </Card>
      </div>
    )
  }
}

export default CardBlock