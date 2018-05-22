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

/**
 * mapStateToProps
 * @ignore
 */
const mapStateToProps = (state) => {
  return {
    songName: state.player.songName
  }
}

class AboutPage extends React.Component {
  render() {
    const { songName } = this.props
    return (
    <div className="row ">
      <div className="col col-md-8 ">
        <CardBlock title="About me">I am really cool haha lmao</CardBlock>
        <CardBlock title="Button" content="Body text">
          <div className="d-flex justify-content-end">
            <Button>Right button</Button>
          </div>
        </CardBlock>
        <CardBlock content="This card has no title" button={{ text: "Inline Button", href: "home" }}> </CardBlock>
      </div>
      <div className="col col-md-4 ml-auto">
        <CardBlock title="Sidebar" content="Text"></CardBlock>
        <CardBlock> This Sidebar has no title</CardBlock>
        <CardBlock title="Sidebar" content="Text" button={{ text: "Inline Button", href: "music"}}></CardBlock>
        <CardBlock title="Sidebar" content="Text"></CardBlock>
      </div>
    </div>
    )
  }
}

export default connect(mapStateToProps)(AboutPage)