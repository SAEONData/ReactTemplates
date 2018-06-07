'use strict'

/**
 * Dependencies
 * @ignore
 */
import React from 'react'
import { connect } from 'react-redux'

import { Button, Input } from 'mdbreact'

/**
 * Module imports
 */
import { CardBlock } from '../components'

const lipsum = ` Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dictum volutpat leo nec consectetur. Morbi ultricies nisl in arcu porttitor, ut ultricies libero aliquet. Morbi tristique, dolor eu lobortis dapibus, nulla elit consequat justo, in suscipit arcu justo non orci. Donec congue, turpis ut placerat gravida, ipsum ipsum aliquet massa, non aliquam erat nisi vitae nunc. Sed feugiat ex ut bibendum condimentum. Maecenas elementum diam vitae dolor mollis varius. Curabitur ex metus, euismod maximus pellentesque vitae, tincidunt sit amet libero. Phasellus congue ultrices semper. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque dictum aliquet dolor, sit amet consectetur lacus.

Aenean eu metus vitae dolor pulvinar interdum in viverra massa. Curabitur bibendum pulvinar dui et dictum. Nunc vel nisl nibh. Ut nec lobortis risus. Sed sodales, risus vel eleifend vestibulum, tortor nunc mollis purus, et imperdiet urna eros sed erat. Curabitur ac fermentum ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi vehicula ullamcorper ligula a facilisis. Pellentesque blandit turpis ante, sit amet volutpat justo ultricies sed. Quisque dapibus, nunc et auctor maximus, elit turpis maximus nibh, ut laoreet mauris massa vel orci. Mauris et molestie nisi. Maecenas ipsum lacus, venenatis sed condimentum nec, feugiat eu metus. Aliquam quis finibus leo. Nunc eleifend porta nisi. Ut ultrices, augue in posuere pharetra, leo elit vehicula nisl, et elementum purus mi et nulla. Nulla ut nibh rutrum, sagittis lectus at, feugiat dolor. `

/**
 * mapStateToProps
 * @ignore
 */
const mapStateToProps = (state) => {
  return {
    songName: state.player.songName
  }
}

/**
 * mapDispatchToProps
 */
const mapDispatchToProps = (dispatch) => {
  return {
    changeSong: (name) => dispatch({ type: 'SET_SONG', payload: name })
  }
}

class MusicPage extends React.Component {
  render() {
  const { songName, changeSong } = this.props
  return (
    <div className="row ">
      <div className="col col-md-8 ">
        <CardBlock title="Music!" content={`Come listen to my music here. A long text would be fun ${lipsum}`}></CardBlock>
        <CardBlock title="Description" content="Blah blah blah">
          <div className="d-flex justify-content-end">
            <Button>Right button</Button>
          </div>
        </CardBlock>
        <CardBlock content="What if one day I had more content" button={{ text: "Let's go home", href: "home" }}> </CardBlock>
      </div>
      <div className="col col-md-4 ml-auto">
        <CardBlock title="Music player" >{`Playing: ${songName}`}</CardBlock>
        <CardBlock title="Change song">
          <Input label="Song name" value={songName} onChange={(e) => changeSong(e.target.value)}/>
        </CardBlock>
        <CardBlock title="Sidebar" content="Text" button={{ text: "Inline Button", href: "music"}}></CardBlock>
        <CardBlock content="Lots  of side bars"></CardBlock>
        <CardBlock content="A lot of things to do!"></CardBlock>
        <CardBlock title="Sidebar" content="Text"></CardBlock>
      </div>
    </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicPage)