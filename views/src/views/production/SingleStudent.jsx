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
  Input,
  Button
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx"
import URL from '../../variables/url'
import axios from 'axios'
import Data from '../../components/widgets/Data'
class StudentInfo extends React.Component {
  state = { student: { _id: '', meta: {}, data: {} }, changeGroup: false, newGroup: '' }
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
    if (this.state.student.data) {
      return Object.keys(this.state.student.data).map((data, index) => {
        return <Data key={index} levelId={data} {...this.state.student.data[data]} />
      })
    }
  }
  changeGroupInput = () => {
    if (this.state.changeGroup) {
      return (
        <Row>
          <Col sm={4}>
            <Input
              className='btn-block'
              placeholder={this.state.student.meta.group}
              onChange={e => this.setState({ newGroup: e.target.value })}
            />
          </Col>
          <Col sm={4}>
            <Button className='btn-block' color='primary' onClick={e => this.changeGroupRequest()}>Update</Button>
          </Col>
        </Row>
      )
    } else {
      return this.state.student.meta.group
    }
  }
  changeGroupRequest = () => {
    this.setState({ changeGroup: !this.state.changeGroup })
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
                  style={{ backgroundColor: 'white', a: { active: 'red' } }}
                >
                  <Link to='/admin/students'>
                    <i className="ni ni-bold-left"></i> Back To All Students
                  </Link>
                </Col>
              </Row>
              <Card className="shadow">
                <CardHeader className="">
                  <Row>
                    <Col sm={9} className=''>
                      <Row>
                        <Col sm={3} className=''><h3>ID:</h3></Col>
                        <Col sm={9} className=''>{this.state.student._id}</Col>
                        <Col sm={3} className=''><h3>Email:</h3></Col>
                        <Col sm={9} className=''>{this.state.student.email}</Col>
                        <Col sm={3} className=''><h3>Score:</h3></Col>
                        <Col sm={9} className=''>{this.state.student.score}</Col>
                        <Col sm={3} className=''><h3>Group:</h3></Col>
                        <Col sm={9} className=''>{this.changeGroupInput()}</Col>
                      </Row>
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
                      <Row>
                        <Col className='mt-3'>
                          <Button className='btn-block' color='primary' onClick={_ => this.setState({ changeGroup: !this.state.changeGroup })}>
                            Change Group {this.state.changeGroup?'-':'+'}
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </CardHeader>
                <Container fluid>
                  <Row>
                    <Col>
                      <h3>Student dataset</h3>
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