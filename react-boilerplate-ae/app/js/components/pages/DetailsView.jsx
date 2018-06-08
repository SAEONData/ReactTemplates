'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { Button, Container, TabPane, NavItem, NavLink } from 'mdbreact'
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
  return { data }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateNav: payload => {
      dispatch({ type: "NAV", payload })
    },
    detailsViewLoad: payload => {
      dispatch({ type: "DETAILSVIEW_LOAD", payload })
    }
  }
}

class DetailsView extends React.Component {

  constructor(props) {
    super(props);

    this.togglePills = this.toggleTabs.bind(this);
    this.backToList = this.backToList.bind(this);

    this.state = { activeTab: '1', editMode: false, id: this.props.match.params.id }
  }

  componentDidMount() {
    this.props.updateNav(location.hash)
    this.getData()
  }

  getData() {

    let { id } = this.state
    let data = {}

    //#######################################################################//
    //Replace sample data with your own data fetched from an API or elsewhere//
    //#######################################################################//

    //Sample data
    data.exampleValue1 = ("ID: " + id)
    data.exampleValue2 = "Nothing here"

    //return data
    this.props.detailsViewLoad(data)
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

  render() {

    let { data } = this.props

    return (
      <>
        <Button style={{ width: "100px", margin: "8px 0px 8px 0px" }} color="secondary" size="sm" id="btnBackToList" onTouchTap={this.backToList}>
          <i className="fa fa-chevron-circle-left" aria-hidden="true"></i>&nbsp;&nbsp;Back
        </Button>

        {/* 
        #############################################################################
        The content beloe is for example only, please replace with your own.
        Make use of the input- and the styled-tabs components to simplify your work.
        #############################################################################
        */}
        <Container className="mt-2">
          <StyledTabsNav>
            <NavItem>
              <NavLink to="#" className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggleTabs('1'); }}>
                Primary Tab
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="#" className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggleTabs('2'); }}>
                Another example tab
              </NavLink>
            </NavItem>
          </StyledTabsNav>

          <StyledTabsContent activeItem={this.state.activeTab}>
            <TabPane tabId="1">
              {data.exampleValue1}
            </TabPane>
            <TabPane tabId="2">
              {data.exampleValue2}
            </TabPane>
          </StyledTabsContent>
        </Container>
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsView)