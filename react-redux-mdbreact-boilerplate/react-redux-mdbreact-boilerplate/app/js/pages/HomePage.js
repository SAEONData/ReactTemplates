'use strict'

/**
 * Dependencies
 * @ignore
 */
import React from 'react'
import { connect } from 'react-redux'

import { Button } from 'mdbreact'

/**
 * Module imports
 */
import { CardBlock } from '../components'

class HomePage extends React.Component {
  render() {
    return (
    <div className="row ">
      <div className="col col-md-4">
        <CardBlock title="Title">Text</CardBlock>
        <CardBlock title="Button" content="Body text">
          <div className="d-flex justify-content-end">
            <Button>Right button</Button>
          </div>
        </CardBlock>
        <CardBlock content="This card has no title" button={{ text: "Inline Button", href: "home" }}> </CardBlock>
        <CardBlock content="This card has no title" button={{ text: "Inline Button", href: "home" }}> </CardBlock>
      </div>
      <div className="col col-md-6 ml-auto">
        <CardBlock title="Sidebar" content="Text"></CardBlock>
        <CardBlock> This Sidebar has no title</CardBlock>
        <CardBlock title="Sidebar" content="Text" button={{ text: "Inline Button", href: "music"}}></CardBlock>
        <CardBlock title="Sidebar" content="Text"></CardBlock>
      </div>
      <div className="col col-md-2 ml-auto">
        <CardBlock title="Sidebar" content="Text"></CardBlock>
        <CardBlock> This Sidebar has no title</CardBlock>
        <CardBlock title="Sidebar" content="Text" button={{ text: "Inline Button", href: "music"}}></CardBlock>
        <CardBlock title="Sidebar" content="Text"></CardBlock>
      </div>
    </div>
    )
  }
}

export default connect()(HomePage)