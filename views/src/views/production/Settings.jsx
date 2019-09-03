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
  Col,
  Input,
  Button
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx"
import URL from '../../variables/url'
import axios from 'axios'
import SyntaxHighlighter from 'react-syntax-highlighter'
class StudentInfo extends React.Component {
  state = {
    settings: { update: false, email: '', prePassword: '', password: '', vPassword: '' },
    logs: { view: true, lines: 'No Data' },
    lines: 50
  }
  componentWillMount = () => {
  }
  toggleLogs = () => {
    if (this.state.logs.view) {
      this.setState({ logs: { view: false, lines: this.state.logs.lines } })
    } else {
      this.setState({ logs: { view: true, lines: this.state.logs.lines } })
      this.getlog()
    }
  }
  getlog = async () => {
    try {
      const req = await axios({
        url: `${URL.testing}/api/admin/logs?lines=${this.state.lines}`,
        method: 'get',
        withCredentials: true
      })
      console.log(req)
      this.setState({ logs: { view: this.state.logs.view, lines: req.data.results.lines } })
    } catch (error) {
      console.log(error)
      // alert(error)
    }
  }
  render() {
    console.log('state', this.state)
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
                  <Container fluid>
                    <Row>
                      <Col>
                        <h3>My Settings</h3>
                      </Col>
                    </Row>
                  </Container>
                </CardHeader>
                <Container fluid>
                  <Row>
                    <Col
                      className='shadow-lg--hover border rounded mt-2 p-1 pt-2 text-center'
                      onClick={e => this.setState({ settings: { update: !this.state.settings.update } })}
                    >
                      <h3>Update User Information {this.state.settings.update ? '-' : '+'}</h3>
                    </Col>
                    <Col sm={12} style={this.state.settings.update ? { height: 'auto' } : { height: '0px', overflow: 'hidden' }}>
                      <Input className='mt-1' placeholder={localStorage.getItem('email')} onChange={e => this.setState({ settings: { email: e.target.value } })} />
                      <Input className='mt-1' type='password' placeholder={'Old password'} onChange={e => this.setState({ settings: { prePassword: e.target.value } })} />
                      <Input className='mt-1' type='password' placeholder={'New password'} onChange={e => this.setState({ settings: { password: e.target.value } })} />
                      <Input className='mt-1' type='password' placeholder={'verify password'} onChange={e => this.setState({ settings: { vPassword: e.target.value } })} />
                      <Button className='mt-1 btn-block' color='primary'>Update</Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col
                      className='shadow-lg--hover border rounded mt-2 p-1 pt-2 text-center'
                      onClick={this.toggleLogs}
                    >
                      <h3>Server Logs {this.state.logs.view ? '-' : '+'}</h3>
                    </Col>
                    <Col sm={12} style={this.state.logs.view ? { height: 'auto' } : { height: '0px', overflow: 'hidden' }}>
                      <Row>
                        <Col>
                          <Input type='number' defaultValue={50} step={10} onChange={e => this.setState({ lines: e.target.value })} />
                        </Col>
                        <Col>
                          <Button onClick={this.getlog}>Update</Button>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <SyntaxHighlighter
                            language="nginx"
                            showLineNumbers={true}
                          >
                            {this.state.logs.lines}
                          </SyntaxHighlighter>
                        </Col>
                      </Row>
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