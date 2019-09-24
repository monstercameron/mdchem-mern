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
  Button,
  DropdownItem,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx"
import URL from '../../variables/url'
import axios from 'axios'
import SyntaxHighlighter from 'react-syntax-highlighter'
import Notifications from '../../components/widgets/Notifications'
class StudentInfo extends React.Component {
  state = {
    settingsUpdate: false,
    email: '',
    prePassword: '',
    password: '',
    vPassword: '',
    logs: { view: false, lines: 'No Data' },
    lines: 50,
    logFiles: null,
    selectedLog: null,
    dropdownOpen: false
  }
  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  toggleLogs = () => {
    if (this.state.logs.view) {
      this.setState({ logs: { view: false, lines: this.state.logs.lines } })
    } else {
      this.setState({ logs: { view: true, lines: this.state.logs.lines } })
      this.getlogs()
    }
  }
  getlogs = async () => {
    try {
      const req = await axios({
        url: `${URL.testing}/api/admin/logs`,
        method: 'get',
        withCredentials: true
      })
      console.log(req.data)
      this.setState({ logFiles: req.data.results.files })
    } catch (error) {
      console.log(error)
      // alert(error)
    }
  }
  getlog = async () => {
    try {
      const req = await axios({
        url: `${URL.testing}/api/admin/logs/${this.state.selectedLog}?lines=${this.state.lines}`,
        method: 'get',
        withCredentials: true
      })
      console.log(req.data)
      this.setState({ logs: { view: this.state.logs.view, lines: req.data.results.lines } })
    } catch (error) {
      console.log(error)
      alert(error)
    }
  }
  logFileDropDown = () => {
    if (this.state.logFiles) {
      return this.state.logFiles.map((log, index) => {
        return <DropdownItem
          defaultValue={log}
          key={index}
          onClick={e => this.setState({ selectedLog: e.target.innerText })}
        >
          {log}
        </DropdownItem>
      })
    } else {
      return ''
    }
  }
  resetPassword = async () => {
    try {
      if (!this.state.email)
        throw new Error('No Email Entered.')
      if (!this.state.prePassword)
        throw new Error('No Old Password Entered.')
      if (!this.state.password)
        throw new Error('No Password Entered.')
      if (!this.state.vPassword)
        throw new Error('No Verification Password Entered.')
      if (this.state.password !== this.state.vPassword)
        throw new Error('Passwords Do Not Match!')
      const req = await axios({
        url: `${URL.testing}/api/auth/reset/admin?type=`,
        method: 'post',
        withCredentials: true,
        data: {
          email: this.state.email,
          oldPassword: this.state.prePassword,
          newPassword: this.state.password
        }
      })
      // console.log(req.data)
      Notifications.notify({ title: req.data.results.message })
    } catch (error) {
      // console.log(error)
      Notifications.notify({ title: error.message })
    }
  }
  render() {
    // console.log('state', this.state)
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
                      onClick={e => this.setState({ settingsUpdate: !this.state.settingsUpdate })}
                    >
                      <h3>Update User Information {this.state.settingsUpdate ? '-' : '+'}</h3>
                    </Col>
                    <Col sm={12} style={this.state.settingsUpdate ? { height: 'auto' } : { height: '0px', overflow: 'hidden' }}>
                      <Input className='mt-1' placeholder={localStorage.getItem('email')} onChange={e => this.setState({ email: e.target.value })} />
                      <Input className='mt-1' type='password' placeholder={'Old password'} onChange={e => this.setState({ prePassword: e.target.value })} />
                      <Input className='mt-1' type='password' placeholder={'New password'} onChange={e => this.setState({ password: e.target.value })} />
                      <Input className='mt-1' type='password' placeholder={'verify password'} onChange={e => this.setState({ vPassword: e.target.value })} />
                      <Button className='mt-1 btn-block' color='primary' onClick={this.resetPassword}>Update</Button>
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
                        <Col sm={4}>
                          <Row>
                            <Col sm={'auto'} className='mx-auto'>
                              <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                <DropdownToggle caret>
                                  {this.state.selectedLog ? this.state.selectedLog : 'Logs'}
                                </DropdownToggle>
                                <DropdownMenu>
                                  {this.logFileDropDown()}
                                </DropdownMenu>
                              </ButtonDropdown>
                            </Col>
                          </Row>
                        </Col>
                        <Col sm={4}>
                          <Input type='number' defaultValue={50} step={10} onChange={e => this.setState({ lines: e.target.value })} />
                        </Col>
                        <Col sm={4}>
                          <Button onClick={this.getlog} className='btn-block'>View</Button>
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
                        {/* Footer */}
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