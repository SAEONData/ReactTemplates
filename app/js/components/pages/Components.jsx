'use strict'

import React from 'react'
import { Button, Card, CardBody, CardImage, CardTitle, CardText } from 'mdbreact';
import TextFilter from '../controls/filters/TextFilter.jsx'
import ReactTooltip from 'react-tooltip'

class Components extends React.Component {

  constructor(props) {
    super(props);
  }

  textFilterCallback(value) {
    console.log("filterValue:", value)
  }

  render() {

    return (
      <>
        <br />

        <div className="row">
          <div className="col-md-4">
            <Card>
              <CardBody>
                <CardTitle>Text Filter</CardTitle>
                <br />
                <TextFilter label="Filter by text:" tooltip="Type filter value in the box below" value=""
                  filterCallback={this.textFilterCallback.bind(this)} />
              </CardBody>
            </Card>
          </div>
          <div className="col-md-4">
            <Card>
              <CardBody>
                <CardTitle>Placeholder</CardTitle>
                <br />

              </CardBody>
            </Card>
          </div>
          <div className="col-md-4">
            <Card>
              <CardBody>
                <CardTitle>Placeholder</CardTitle>
                <br />

              </CardBody>
            </Card>
          </div>
        </div>

        <ReactTooltip delayShow={400} />
      </>
    )
  }
}

export default Components