'use strict'

import React from 'react'
import { Button, Card, CardBody, CardImage, CardTitle, CardText } from 'mdbreact';
import TextFilter from '../controls/filters/TextFilter.jsx'
import SelectFilter from '../controls/filters/SelectFilter.jsx'
import ReactTooltip from 'react-tooltip'

class Components extends React.Component {

  constructor(props) {
    super(props);
  }

  textFilterCallbackHandler(value) {
    console.log("Text filter value:", value)
  }

  selectFilterCallbackHandler(selectedItem) {
    console.log("Selected filter item:", selectedItem)
  }

  render() {

    return (
      <>
        <br />

        <div className="row">
          <div className="col-md-4">
            <Card>
              <CardBody style={{ height: "180px" }}>
                <CardTitle>Text Filter</CardTitle>
                <br />
                <TextFilter label="Filter by text:" tooltip="Type filter value in the box below" value=""
                  filterCallback={this.textFilterCallbackHandler.bind(this)} />
              </CardBody>
            </Card>
          </div>
          <div className="col-md-4">
            <Card>
              <CardBody style={{ height: "180px" }}>
                <CardTitle>List Filter</CardTitle>
                <br />
                <SelectFilter label="Filter by selection:" tooltip="Select filter value from the box below" value=""
                  data={[{ id: 1, text: "One" }, { id: 2, text: "Two" }, { id: 3, text: "Three" }]}
                  filterCallback={this.selectFilterCallbackHandler.bind(this)} />
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