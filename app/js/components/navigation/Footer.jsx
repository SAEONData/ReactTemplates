'use strict'

import React from 'react'
import { Col, Container, Row, Footer as MDBFooter } from 'mdbreact';

class Footer extends React.Component {

  constructor(props) {
    super(props);

  }



  render() {

    return (
      <>
        <MDBFooter color="blue darken-2" className="font-small pt-4 mt-4">
          <Container className="text-center">
            <Row>
              <Col sm="12">
                <h5 className="title">Footer Title</h5>
                <p>You can use rows and columns here to organize your footer content.</p>
              </Col>
            </Row>
          </Container>
          <div className="footer-copyright text-center">
            <Container fluid>
              &copy; {(new Date().getFullYear())} Copyright: <a href="https://www.saeon.ac.za"> SAEON.ac.za </a>
            </Container>
          </div>
        </MDBFooter>
      </>
    )
  }
}

export default Footer