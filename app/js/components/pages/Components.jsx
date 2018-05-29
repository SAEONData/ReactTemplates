'use strict'

import React from 'react'
import { Button, Card, CardBody, CardImage, CardTitle, CardText } from 'mdbreact';
import TextFilter from '../controls/filters/TextFilter.jsx'
import SelectFilter from '../controls/filters/SelectFilter.jsx'
import TreeSelectFilter from '../controls/filters/TreeSelectFilter.jsx'
import TreeFilter from '../controls/filters/TreeFilter.jsx'

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

  treeSelectFilterCallbackHandler(selectedNode) {
    console.log("Selected filter node:", selectedNode)
  }

  treeFilterCallbackHandler(selectedNode) {
    console.log("Selected filter node:", selectedNode)
  }

  render() {

    return (
      <>
        <br />

        <div className="row">
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-6">
                <Card>
                  <CardBody style={{ height: "180px" }}>
                    <CardTitle style={{ color: "#1565c0" }}>Text Filter</CardTitle>
                    <br />
                    <TextFilter
                      label="Filter by text:"
                      tooltip="Type filter value in the box below"
                      value=""
                      filterCallback={this.textFilterCallbackHandler.bind(this)}
                    />
                  </CardBody>
                </Card>
              </div>
              <div className="col-md-6">
                <Card>
                  <CardBody style={{ height: "180px" }}>
                    <CardTitle style={{ color: "#1565c0" }}>Select Filter</CardTitle>
                    <br />
                    <SelectFilter
                      label="Filter by selection:"
                      tooltip="Select filter value from the box below"
                      selectedValue=""
                      data={[{ id: 1, text: "One" }, { id: 2, text: "Two" }, { id: 3, text: "Three" }]}
                      filterCallback={this.selectFilterCallbackHandler.bind(this)}
                    />
                  </CardBody>
                </Card>
              </div>
            </div>

            <br />

            <div className="row">
              <div className="col-md-12">
                <Card>
                  <CardBody style={{ height: "180px" }}>
                    <CardTitle style={{ color: "#1565c0" }}>Tree Select Filter</CardTitle>
                    <br />
                    <TreeSelectFilter
                      label="Filter by tree selection:"
                      tooltip="Select filter value from tree"
                      selectedValue=""
                      data={[{ id: 1, text: "Parent1", children: [{ id: 11, text: "Child1", children: [{ id: 111, text: "SubChild1" }] }, { id: 12, text: "Child2" }] }, { id: 2, text: "Parent2" }]}
                      filterCallback={this.treeSelectFilterCallbackHandler.bind(this)}
                    />
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <Card>
              <CardBody style={{ height: "385px" }}>
                <CardTitle style={{ color: "#1565c0" }}>Tree Filter</CardTitle>
                <br />
                <TreeFilter
                  label="Filter by tree selection:"
                  tooltip="Select filter value from tree"
                  selectedValue="SubChild1"
                  data={[{ id: 1, text: "Parent1", children: [{ id: 11, text: "Child1", children: [{ id: 111, text: "SubChild1" }] }, { id: 12, text: "Child2" }] }, { id: 2, text: "Parent2" }]}
                  filterCallback={this.treeFilterCallbackHandler.bind(this)}
                />
              </CardBody>
            </Card>
          </div>
        </div>


        <div className="row"> {/* COMPONENTS ROW 1 */}

        </div>

        <br />

        <div className="row">  {/* COMPONENTS ROW 2 */}

        </div>

        <br />

        <div className="row">  {/* COMPONENTS ROW 3 */}

        </div>
      </>
    )
  }
}

export default Components