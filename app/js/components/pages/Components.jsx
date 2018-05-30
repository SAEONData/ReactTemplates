'use strict'

import React from 'react'
import { Button, Card, CardBody, CardImage, CardTitle, CardText, InputSwitch, FormInline } from 'mdbreact';
import _TextInputWithApply from '../controls/_TextInputWithApply.jsx'
import _SelectInput from '../controls/_SelectInput.jsx'
import _TreeSelectInput from '../controls/_TreeSelectInput.jsx'
import _TreeInput from '../controls/_TreeInput.jsx'
import _LoadingPanel from '../controls/_LoadingPanel.jsx'

class Components extends React.Component {

  constructor(props) {
    super(props);

    this.state = { allowEdit: true, showLoader: false }
  }

  textCallbackHandler(text) {
    console.log("Text input - text:", text)
  }

  selectCallbackHandler(selectedItem) {
    console.log("Select input - selected item:", selectedItem)
  }

  treeSelectCallbackHandler(selectedNode) {
    console.log("Tree-select input - selected node:", selectedNode)
  }

  treeCallbackHandler(selectedNode) {
    console.log("Tree input - selected node:", selectedNode)
  }

  AllowEditToggle() {
    this.setState({ allowEdit: !this.state.allowEdit })
  }

  ShowLoaderToggle() {
    this.setState({ showLoader: !this.state.showLoader })
  }

  render() {

    let { allowEdit, showLoader } = this.state

    return (
      <>
        <br />

        <div className="row">
          <div className="col-md-12">
            <Card>
              <CardBody style={{ height: "60px" }}>
                <FormInline>
                  <label><b>Allow edit:</b>&nbsp;&nbsp;</label>
                  <InputSwitch checked={allowEdit} onChange={this.AllowEditToggle.bind(this)} />

                  <span style={{ width: "15px" }} />
                  <h5>|</h5>
                  <span style={{ width: "15px" }} />

                  <label><b>Loader:</b>&nbsp;&nbsp;</label>
                  <InputSwitch checked={showLoader} onChange={this.ShowLoaderToggle.bind(this)} />
                </FormInline>
              </CardBody>
            </Card>
          </div>
        </div>

        <br />

        <div className="row">
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-6">
                <Card>
                  <CardBody style={{ height: "180px" }}>
                    <CardTitle style={{ color: "#1565c0" }}>Text Input With Apply</CardTitle>
                    <br />
                    <_TextInputWithApply
                      label="Type something:"
                      tooltip="Type something below"
                      value=""
                      callback={this.textCallbackHandler.bind(this)}
                      allowEdit={allowEdit}
                    />
                  </CardBody>
                </Card>
              </div>
              <div className="col-md-6">
                <Card>
                  <CardBody style={{ height: "180px" }}>
                    <CardTitle style={{ color: "#1565c0" }}>Select Input</CardTitle>
                    <br />
                    <_SelectInput
                      label="Make a selection:"
                      tooltip="Make a selection below"
                      selectedValue=""
                      data={[{ id: 1, text: "One" }, { id: 2, text: "Two" }, { id: 3, text: "Three" }]}
                      callback={this.selectCallbackHandler.bind(this)}
                      allowEdit={allowEdit}
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
                    <CardTitle style={{ color: "#1565c0" }}>Tree-Select Input</CardTitle>
                    <br />
                    <_TreeSelectInput
                      label="Select something:"
                      tooltip="Select something below"
                      selectedValue=""
                      data={[{ id: 1, text: "Parent1", children: [{ id: 11, text: "Child1", children: [{ id: 111, text: "SubChild1" }] }, { id: 12, text: "Child2" }] }, { id: 2, text: "Parent2" }]}
                      callback={this.treeSelectCallbackHandler.bind(this)}
                      allowEdit={allowEdit}
                    />
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <Card>
              <CardBody style={{ height: "385px" }}>
                <CardTitle style={{ color: "#1565c0" }}>Tree Input</CardTitle>
                <br />
                <_TreeInput
                  label="Pick from the tree:"
                  tooltip="Pick from the tree below"
                  selectedValue="SubChild1"
                  data={[{ id: 1, text: "Parent1", children: [{ id: 11, text: "Child1", children: [{ id: 111, text: "SubChild1" }] }, { id: 12, text: "Child2" }] }, { id: 2, text: "Parent2" }]}
                  callback={this.treeCallbackHandler.bind(this)}
                  allowEdit={allowEdit}
                />
              </CardBody>
            </Card>
          </div>
        </div>

        <br />

        <_LoadingPanel header="LOADING" description="Please wait..." enabled={showLoader} />
      </>
    )
  }
}

export default Components