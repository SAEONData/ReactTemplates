'use strict'

import React from 'react'

class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <>
        <br />
        <div className="jumbotron">
          <h1>Boilerplate React project</h1>
          <p className="lead">
            This project serves as a template for new React projects and
            contains some generic template components for reuse in other 
            projects.
          </p>
          <p className="lead">
            See the <a href="/#/components" >Components</a> page for more details.
          </p>
        </div>
      </>
    )
  }
}

export default Home