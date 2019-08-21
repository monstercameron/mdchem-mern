/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { withRouter } from 'react-router-dom'
// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx"
// import URL from '../../variables/url'
// import axios from 'axios'
class StudentInfo extends React.Component {
  state = {}
  componentWillMount = () => {
  }
  render() {
    console.log('student:', this.state)
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <Col>
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Container>
                    <Row>
                      <Col>
                        <h3>My Settings</h3>
                      </Col>
                    </Row>
                  </Container>
                </CardHeader>
                <Container>
                  <Row>
                    <Col>
                      Body
                      </Col>
                  </Row>
                </Container>
                <CardFooter className="py-4">
                  <Container>
                    <Row>
                      <Col>
                        Footer
                      </Col>
                    </Row>
                  </Container>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
export default withRouter(StudentInfo)