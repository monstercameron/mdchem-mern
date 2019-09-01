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

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import URL from '../../variables/url'
import axios from 'axios'
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      student: {
        average: 0,
        count: 0,
        class: 0,
        completion: 50
      }
    }
  }
  componentWillMount = () => {
    this.studentCount()
    this.studentAvgScore()
    this.getGroupCount()
  }
  studentCount = () => {
    if (!this.state.student.count > 0) {
      axios({
        url: `${URL.testing}/api/players/count`,
        method: 'get',
        withCredentials: true
      })
        .then(res => {
          this.setState({ student: Object.assign(this.state.student, { count: res.data.results.count }) })
        })
        .catch(err => console.log(err.response))
    }
  }
  studentAvgScore = async () => {
    if (!localStorage.getItem('avg') || localStorage.getItem('avg') === '0') {
      try {
        const query = await axios({
          url: `${URL.testing}/api/players/average`,
          method: 'get',
          withCredentials: true
        })
        localStorage.setItem('avg', query.data.results.average)
      } catch (error) {
        console.log(error)
      }
    }
    this.setState({ student: Object.assign(this.state.student, { average: localStorage.getItem('avg') }) })
  }
  getGroupCount = async () => {
    if (!localStorage.getItem('group') || localStorage.getItem('group') === '0') {
      try {
        const query = await axios({
          url: `${URL.testing}/api/admin/groups/count`,
          method: 'get',
          withCredentials: true,
        })
        localStorage.setItem('group', query.data.results.count)
        // console.log('this ran', query.data)
        // alert(query.data)
      } catch (error) {
        console.log(error)
      }
    }
    this.setState({ student: Object.assign(this.state.student, { class: localStorage.getItem('group') }) })
  }
  render() {
    // console.log('header state', this.state)
    return (
      <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              <Row>
                <Col lg="6" xl="4">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h6"
                            className="text-uppercase text-muted mb-0"
                          >
                            Average Score
                          </CardTitle>
                          <span className="h3 font-weight-bold mb-0">
                            {this.state.student.average}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fas fa-chart-bar" />
                          </div>
                        </Col>
                      </Row>
                      {/* <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <i className="fa fa-arrow-up" /> 3.48%
                        </span>{" "}
                        <span className="text-nowrap">Since last month</span>
                      </p> */}
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="4">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h6"
                            className="text-uppercase text-muted mb-0"
                          >
                            Students
                          </CardTitle>
                          <span className="h3 font-weight-bold mb-0">
                            {this.state.student.count}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                            <i className="fas fa-chart-pie" />
                          </div>
                        </Col>
                      </Row>
                      {/* <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-danger mr-2">
                          <i className="fas fa-arrow-down" /> 3.48%
                        </span>{" "}
                        <span className="text-nowrap">Since last week</span>
                      </p> */}
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="4">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h6"
                            className="text-uppercase text-muted mb-0"
                          >
                            Classes
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">{this.state.student.class}</span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                            <i className="fas fa-users" />
                          </div>
                        </Col>
                      </Row>
                      {/* <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-warning mr-2">
                          <i className="fas fa-arrow-down" /> 1.10%
                        </span>{" "}
                        <span className="text-nowrap">Since yesterday</span>
                      </p> */}
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="4">
                  {/* <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h6"
                            className="text-uppercase text-muted mb-0"
                          >
                            Completion
                          </CardTitle>
                          <span className="h3 font-weight-bold mb-0">
                            {this.state.student.completion}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                            <i className="fas fa-percent" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <i className="fas fa-arrow-up" /> 12%
                        </span>{" "}
                        <span className="text-nowrap">Since last month</span>
                      </p>
                    </CardBody>
                  </Card> */}
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default Header;
