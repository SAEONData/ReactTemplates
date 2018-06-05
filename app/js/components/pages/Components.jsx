'use strict'

import React from 'react'
import { connect } from 'react-redux'
import {
  Button, Card, CardBody, CardImage, CardTitle, CardText, InputSwitch, FormInline, Fa, Tooltip,
  StickyContainer, Sticky
} from 'mdbreact';
import TextInput from '../input/TextInput.jsx'
import TextInputWithApply from '../input/TextInputWithApply.jsx'
import TextAreaInput from '../input/TextAreaInput.jsx'
import SelectInput from '../input/SelectInput.jsx'
import TreeSelectInput from '../input/TreeSelectInput.jsx'
import TreeInput from '../input/TreeInput.jsx'
import LoadingPanel from '../input/LoadingPanel.jsx'
import SideNav from '../navigation/SideNav.jsx'

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

class Components extends React.Component {

  constructor(props) {
    super(props);

    this.state = { allowEdit: true, showLoader: false, showSideNav: false }
  }

  componentDidMount() {
    this.props.updateNav(location.hash)
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

  ToggleSidePanel() {
    this.setState({ showSideNav: !this.state.showSideNav })
  }

  render() {

    let { allowEdit, showLoader, showSideNav } = this.state

    return (
      <>
        <SideNav isOpen={showSideNav} />

        <div className="row">
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-12">
                <br />
                <Card>
                  <CardBody>
                    <FormInline>
                      <Tooltip
                        placement="top"
                        component="a"
                        tooltipContent="Toggle SidePanel">
                        <Fa style={{ color: "#1e88e5" }} icon="bars" size="2x" onClick={this.ToggleSidePanel.bind(this)}></Fa>
                      </Tooltip>
                      <span style={{ width: "20px" }} />

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
            <div className="row">
              <div className="col-md-6">
                <br />
                <Card>
                  <CardBody style={{ height: "180px" }}>
                    <CardTitle style={{ color: "#1565c0" }}>Text Input With Apply</CardTitle>
                    <br />
                    <TextInputWithApply
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
                <br />
                <Card>
                  <CardBody style={{ height: "180px" }}>
                    <CardTitle style={{ color: "#1565c0" }}>Text Input</CardTitle>
                    <br />
                    <TextInput
                      label="Type something:"
                      tooltip="Type something below"
                      value=""
                      callback={this.textCallbackHandler.bind(this)}
                      allowEdit={allowEdit}
                    />
                  </CardBody>
                </Card>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <br />
                <Card>
                  <CardBody style={{ minHeight: "180px" }}>
                    <CardTitle style={{ color: "#1565c0" }}>Text-Area Input</CardTitle>
                    <br />
                    <TextAreaInput
                      label="Type something longer:"
                      tooltip="Type something longer below"
                      value="This input allows for much longer text and automatically resizes to fit its contents."
                      callback={this.textCallbackHandler.bind(this)}
                      allowEdit={allowEdit}
                    />
                  </CardBody>
                </Card>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-12">
                    <br />
                    <Card>
                      <CardBody style={{ height: "180px" }}>
                        <CardTitle style={{ color: "#1565c0" }}>Select Input</CardTitle>
                        <br />
                        <SelectInput
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
                <div className="row">
                  <div className="col-md-12">
                    <br />
                    <Card>
                      <CardBody style={{ height: "180px" }}>
                        <CardTitle style={{ color: "#1565c0" }}>Tree-Select Input</CardTitle>
                        <br />
                        <TreeSelectInput
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
              <div className="col-md-6">
                <br />
                <Card>
                  <CardBody style={{ height: "402px" }}>
                    <CardTitle style={{ color: "#1565c0" }}>Tree Input</CardTitle>
                    <br />
                    <TreeInput
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
          </div>
          <div className="col-md-4">
            <StickyContainer style={{ background: "black", height: "100%" }}>
              <Sticky topOffset={20} bottomOffset={-20}>
                {({
                  isSticky,
                  wasSticky,
                  style,
                  distanceFromTop,
                  distanceFromBottom,
                  calculatedHeight
                }) => {

                  let stickyHeight = (window.innerHeight - 105)

                  return (

                    <div>
                      <br />  
                      <Card style={{ ...style }}>
                        <CardBody style={{ height: stickyHeight }}>
                          <CardTitle style={{ color: "#1565c0" }}>Side Panel</CardTitle>
                          <br />
                          Content...
                        </CardBody>
                      </Card>
                    </div>
                  );
                }}
              </Sticky>
            </StickyContainer>
          </div>
        </div>

        <LoadingPanel header="LOADING" description="Please wait..." enabled={showLoader} />
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Components)