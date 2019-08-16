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
import { withRouter, Link } from 'react-router-dom'
// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  Container,
  Row,
  Col,
  Button
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx"
import URL from '../../variables/url'
import axios from 'axios'
class StudentInfo extends React.Component {
  state = { student: { _id: '', meta: {}, data: {} } }
  componentWillMount = () => {
    this.getStudentById()
  }
  getStudentById = async () => {
    try {
      const query = await axios({
        url: `${URL.testing}/api/player/${this.props.match.params.id}`,
        method: 'get',
        withCredentials: true
      })
      if (query.data.results.student) this.setState({ student: query.data.results.student })
    } catch (error) {
      console.log(error)
    }
  }
  dataSetVisualizer = () => {
    if (Object.keys(this.state.student.data).length > 0) {

      for (const key in this.state.student.data) {
        console.log(this.state.student.data[key])
      }

    }
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
              <Row>
                <Col sm={3} 
                  className='mb-3 text-white border p-2 ml-3 rounded' 
                  style={{ backgroundColor: 'white', a:{active:'red'} }}
                >
                  <Link to='/admin/students'>
                    <i className="ni ni-bold-left"></i> Back To All Students
                  </Link>
                </Col>
              </Row>
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row>
                    <Col sm={9}>
                      <h3 className="mb-0 d-inline-block">ID: </h3> {this.state.student._id}
                      <br></br>
                      <h3 className="mb-0 d-inline-block">Email: </h3> {this.state.student.email}
                      <br></br>
                      <h3 className="mb-0 d-inline-block">Score: </h3> {this.state.student.score}
                      <br></br>
                      <h3 className="mb-0 d-inline-block">Group: </h3> {this.state.student.meta.group}
                    </Col>
                    <Col sm={3}>
                      <Row>
                        <Col>
                          <Button className='btn-block' color='danger'>Unsubscribe</Button>
                        </Col>
                      </Row>
                      <Row>
                        <Col className='mt-3'>
                          <Button className='btn-block' color='warning'>Reset</Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </CardHeader>
                <Container>
                  <Row>
                    <Col>
                      Student DATA
                    </Col>
                  </Row>
                  <Row>
                    {this.dataSetVisualizer()}
                  </Row>
                </Container>
                <CardFooter className="py-4">
                  {/* things go here */}
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