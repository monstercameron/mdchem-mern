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
import { Redirect } from "react-router-dom";
import axios from 'axios'
import emailValidator from "email-validator"
import URL from '../../variables/url'
// reactstrap components
import {
  Button,
  Card,
  // CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";
import Notifications from '../../components/widgets/Notifications'
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: null,
      remember: false,
      local: {
        email: undefined
      }
    }
  }
  componentWillMount = () => {
    this.checkLocalStorage()
    Notifications.requestPermission()
  }
  checkLocalStorage = () => {
    const localEmail = localStorage.getItem('email');
    if (localEmail) {
      this.setState({ local: { email: localEmail } })
      this.setState({ remember: true })
      return localEmail
    }
    return ''
  }
  validate = () => {
    let { email, password } = this.state
    let { email: localEmail } = this.state.local
    if (!email) email = localEmail
    if (emailValidator.validate(email)) {
      console.log('email is good')
    } else {
      console.log('email is not good')
      return false
    }
    if (password) {
      console.log('Password is good')
    } else {
      console.log('Password is not good')
      return false
    }
    return true
  }
  buildLoginRequestForm = () => {
    return {
      email: (this.state.email) ? this.state.email : this.state.local.email,
      password: this.state.password
    }
  }
  login = async () => {
    const form = this.buildLoginRequestForm()
    if (this.validate()) {
      try {
        const req = await axios({
          url: `${URL.testing}/api/auth/login/admin`,
          method: 'post',
          withCredentials: true,
          data: form
        })

        console.log(req)
        localStorage.setItem('temp', form.email)
        localStorage.setItem('avg', 0)
        localStorage.setItem('group', 0)
        localStorage.setItem('exp', new Date().getTime() + 3600000 /* 1 hour */)

        if (this.state.remember) {
          localStorage.setItem('email', form.email)
        } else {
          localStorage.removeItem('email');
        }
        if (req.status === 200) this.setState({ redirect: '/admin/index' })

      } catch (error) {
        console.log(error.response)
        Notifications.notify({ title: `Error!`, body:error.response.data.error })
      }
    }
  }
  render() {
    //console.log('state', this.state)
    if (this.state.redirect !== null) {
      let { redirect } = this.state
      if (redirect.includes(':300')) {
        redirect = redirect.split(':300')
        return <Redirect to={redirect[1]} />
      }
      return <Redirect to={redirect} />
    }
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            {/* <CardHeader className="bg-transparent pb-5">
              <div>
                something can go here
              </div>
            </CardHeader> */}
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Sign in with credentials</small>
              </div>
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input value={this.state.local.email} placeholder="Email" type="email"
                      onChange={e => {
                        this.setState({ email: e.target.value })
                        if (this.state.remember) {
                          this.setState({ local: { email: e.target.value } })
                        }
                      }}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Password" type="password" onChange={e => this.setState({ password: e.target.value })} />
                  </InputGroup>
                </FormGroup>
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id=" customCheckLogin"
                    type="checkbox"
                    onChange={e => this.setState({ remember: !this.state.remember })}
                    checked={this.state.remember}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor=" customCheckLogin"
                  >
                    <span className="text-muted">Remember me</span>
                  </label>
                </div>
                <div className="text-center">
                  <Button className="my-4" color="primary" type="button" onClick={this.login}>
                    Sign in
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <small>Forgot password?</small>
              </a>
            </Col>
            <Col className="text-right" xs="6">
              <a
                className="text-light"
                href="/auth/register"
                onClick={e => {
                  //console.log(e.target.parentElement.href)
                  this.setState({ redirect: './register' })
                  e.preventDefault()
                }}
              >
                <small>Create new account</small>
              </a>
            </Col>
          </Row>
        </Col>
      </>
    );
  }
}

export default Login;
