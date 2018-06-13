'use strict'

import React from 'react'
import { connect } from 'react-redux'
import {
  Button, ButtonFixed, Container, TabPane, NavItem, NavLink, Modal, ModalHeader, ModalBody,
  ModalFooter, Row, Col
} from 'mdbreact'
import classnames from 'classnames';
import StyledTabsNav from '../layout/StyledTabsNav.jsx'
import StyledTabsContent from '../layout/StyledTabsContent.jsx'

//Input components
import TextInput from '../input/TextInput.jsx'
import TextAreaInput from '../input/TextAreaInput.jsx'
import SelectInput from '../input/SelectInput.jsx'
import TreeInput from '../input/TreeInput.jsx'
import TreeSelectInput from '../input/TreeSelectInput.jsx'
//Input components

const mapStateToProps = (state, props) => {
  let { detailsView: { data } } = state
  let user = state.oidc.user
  return { data, user }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateNav: payload => {
      dispatch({ type: "NAV", payload })
    },
    detailsViewLoad: payload => {
      dispatch({ type: "DETAILSVIEW_LOAD", payload })
    },
    setLoading: payload => {
      dispatch({ type: "SET_LOADING", payload })
    }
  }
}

class DetailsView extends React.Component {

  constructor(props) {
    super(props);

    this.togglePills = this.toggleTabs.bind(this);
    this.backToList = this.backToList.bind(this);

    let id = this.props.match.params.id

    this.state = {
      activeTab: '1',
      editMode: false,
      id,
      saveModal: false,
      discardModal: false
    }
  }

  componentDidMount() {
    this.props.updateNav(location.hash)
    this.getData()
  }

  getData() {

    let { setLoading, detailsViewLoad } = this.props
    let { id } = this.state
    let data = {}

    //Toggle loading panel on
    setLoading(true)

    //#######################################################################//
    //Replace sample data with your own data fetched from an API or elsewhere//
    //#######################################################################//

    //Sample data
    data.exampleValue1 = ("ID: " + id)
    data.exampleValue2 = "Nothing here"

    //Toggle loading panel off (remember to do this when you have received your data)
    setLoading(false)

    //return data
    detailsViewLoad(data)
  }

  sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }

  toggleTabs(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  backToList() {

    if (this.state.editMode === true) {
      //Confirm discard changes...
    }

    location.hash = "/list"
  }

  editClick() {

    //Enable EditMode
    this.setState({ editMode: true })
  }

  saveClick() {

    //Confirm save
    this.setState({ saveModal: true })
  }

  save() {

    //############################################//
    //Add your code here to save (persist) changes//
    //############################################//

    //Disable EditMode and close modal
    this.setState({ editMode: false, saveModal: false })
  }

  discardClick() {

    //Confirm discard
    this.setState({ discardModal: true })
  }

  discard() {

    //#####################################//
    //Add your code here to discard changes//
    //#####################################//

    //Disable EditMode and close modal
    this.setState({ editMode: false, discardModal: false })
  }

  render() {

    let { data, user } = this.props
    let { editMode, activeTab, id } = this.state

    return (
      <>
        <Button style={{ width: "100px", margin: "8px 0px 8px 0px" }} color="secondary" size="sm" id="btnBackToList" onTouchTap={this.backToList}>
          <i className="fa fa-chevron-circle-left" aria-hidden="true"></i>&nbsp;&nbsp;Back
        </Button>

        {/* 
        #############################################################################
        The content below is for example only, please replace with your own.
        Make use of the input- and the styled-tabs components to simplify your work.
        #############################################################################
        */}
        <Container className="mt-2">
          <StyledTabsNav>
            <NavItem>
              <NavLink to="#" className={classnames({ active: activeTab === '1' })} onClick={() => { this.toggleTabs('1'); }}>
                Example Tab
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="#" className={classnames({ active: activeTab === '2' })} onClick={() => { this.toggleTabs('2'); }}>
                Another example tab with a longer title
              </NavLink>
            </NavItem>
          </StyledTabsNav>

          <StyledTabsContent activeItem={activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col md="4">
                  <TextInput key={data.exampleValue1} label="Example 1" value={data.exampleValue1} allowEdit={editMode} />
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col md="4">
                  <SelectInput label="Example 2" allowEdit={editMode} value={data.exampleValue2}
                    data={[{ id: 1, text: data.exampleValue1 }, { id: 2, text: data.exampleValue2 }]} />
                </Col>
              </Row>
            </TabPane>
          </StyledTabsContent>
        </Container>

        {/* Enable the line below to allow editing for all users */}
        <div>

          {/* Enable the line below to only allow editing for authenticated users */}
          {/* <div hidden={!user || user.expired}> */}

          {/* EDIT BUTTON */}
          <ButtonFixed
            topSection={location.hash}
            hidden={editMode}
            floating
            color="red"
            icon="pencil"
            style={{ bottom: '45px', right: '24px' }}
            onClick={this.editClick.bind(this)}>
          </ButtonFixed>

          {/* DISCARD BUTTON */}
          <ButtonFixed
            topSection={location.hash}
            hidden={!editMode}
            floating
            color="red"
            icon="trash"
            style={{ bottom: '45px', right: '24px' }}
            onClick={this.discardClick.bind(this)}>
          </ButtonFixed>

          {/* SAVE BUTTON */}
          <ButtonFixed
            topSection={location.hash}
            hidden={!editMode}
            floating
            color="red"
            icon="save"
            style={{ bottom: '45px', right: '84px' }}
            onClick={this.saveClick.bind(this)}>
          </ButtonFixed>
        </div>

        {/* SAVE CONFIRMATION MODAL */}
        <Container>
          <Modal isOpen={this.state.saveModal} backdrop={false}>
            <ModalHeader toggle={this.toggle}>Confirm Save</ModalHeader>
            <ModalBody>
              Are you sure you want to save all changes?
            </ModalBody>
            <ModalFooter>
              <Button size="sm" style={{ width: "100px" }} color="warning" onClick={this.save.bind(this)} >Save</Button>
              <Button size="sm" style={{ width: "100px" }} color="secondary" onClick={() => this.setState({ saveModal: false })} >Cancel</Button>{' '}
            </ModalFooter>
          </Modal>
        </Container>

        {/* DISCARD CONFIRMATION MODAL */}
        <Container>
          <Modal isOpen={this.state.discardModal} backdrop={false}>
            <ModalHeader toggle={this.toggle}>Confirm Discard</ModalHeader>
            <ModalBody>
              Are you sure you want to discard all changes?
            </ModalBody>
            <ModalFooter>
              <Button size="sm" style={{ width: "100px" }} color="warning" onClick={this.discard.bind(this)} >Discard</Button>
              <Button size="sm" style={{ width: "100px" }} color="secondary" onClick={() => this.setState({ discardModal: false })} >Cancel</Button>{' '}
            </ModalFooter>
          </Modal>
        </Container>

      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsView)