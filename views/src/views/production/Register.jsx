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
import { Redirect, withRouter } from "react-router-dom"
import questions from "../../variables/SecurityQuestions"
import URL from '../../variables/url'
import zxcvbn from "zxcvbn"
import axios from "axios"
import validator from 'validator';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap"
import Notifications from '../../components/widgets/Notifications'
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: null,
      privacy: false,
      redirect: null,
      validationErr: { name: null, email: null, password: null, secQuestion: null, secAnswer: null }
    };
  }
  handlePasswordInput = (e) => {
    const results = zxcvbn(e.target.value)
    this.setState({ password: e.target.value })
    if (e.target.value.length > 6) {
      this.setState({ score: results.score })
    }
    //console.log(results)
  }
  handlePasswordScore = () => {
    switch (this.state.score) {
      case 0: return <h5 style={{ color: '#FF0000', display: 'inline' }}>Bad</h5>
      case 1: return <h5 style={{ color: '#FFE300', display: 'inline' }}>Weak</h5>
      case 2: return <h5 style={{ color: '#00FF07', display: 'inline' }}>Ok</h5>
      case 3: return <h5 style={{ color: '#00FFE4', display: 'inline' }}>Good</h5>
      case 4: return <h5 style={{ color: '#0038FF', display: 'inline' }}>Strong</h5>
      default: return <h5 style={{ color: '#A8A8A8', display: 'inline' }}>Too Short</h5>
    }
  }
  buildRegistrationRequestForm = () => {
    return {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      role: `admin`,
      recovery: {
        question: this.state.sec_question,
        answer: this.state.sec_answer
      }
    }
  }
  validate = () => {
    const form = this.buildRegistrationRequestForm()
    const { name, email, password, role } = form
    const { question, answer } = form.recovery
    const pattern = {
      lower: `(?=.*[a-z])`,
      upper: `(?=.*[A-Z])`,
      numeric: `(?=.*[0-9])`,
      specChar: '(?=.[!@#$%^&])',
      eightChar: `(?=.{8,})`
    }
    //reset validation errors
    this.setState({ validationErr: null })
    let verdict = true
    //name
    if (name) {
      validator.matches(name, /^[a-zA-Z ]+$/) ?
        this.setState({ validationErr: Object.assign(this.state.validationErr, { name: null }) }) :
        this.setState({ validationErr: Object.assign(this.state.validationErr, { name: `Name shouldn't have non-alpha characters` }) })
    } else {
      verdict = false
      this.setState({ validationErr: Object.assign(this.state.validationErr, { name: `Enter your name!` }) })

    }
    //email
    if (email) {
      validator.isEmail(email) ?
        this.setState({ validationErr: Object.assign(this.state.validationErr, { email: null }) }) :
        this.setState({ validationErr: Object.assign(this.state.validationErr, { email: `Email isn't formatted properly!` }) })
    } else {
      verdict = false
      this.setState({ validationErr: Object.assign(this.state.validationErr, { email: `Enter your email!` }) })
    }
    //password
    if (password) {
      validator.matches(password, pattern.lower) ?
        this.setState({ validationErr: Object.assign(this.state.validationErr, { password: null }) }) :
        this.setState({ validationErr: Object.assign(this.state.validationErr, { password: `Must contain atleast 1 lower case character!` }) })
      validator.matches(password, pattern.upper) ?
        this.setState({ validationErr: Object.assign(this.state.validationErr, { password: null }) }) :
        this.setState({ validationErr: Object.assign(this.state.validationErr, { password: `Must contain atleast 1 upper case character!` }) })
      validator.matches(password, pattern.numeric) ?
        this.setState({ validationErr: Object.assign(this.state.validationErr, { password: null }) }) :
        this.setState({ validationErr: Object.assign(this.state.validationErr, { password: `Must contain atleast 1 number!` }) })
      validator.matches(password, pattern.specChar) ?
        this.setState({ validationErr: Object.assign(this.state.validationErr, { password: null }) }) :
        this.setState({ validationErr: Object.assign(this.state.validationErr, { password: `Must contain atleast 1 special character!` }) })
      validator.matches(password, pattern.eightChar) ?
        this.setState({ validationErr: Object.assign(this.state.validationErr, { password: null }) }) :
        this.setState({ validationErr: Object.assign(this.state.validationErr, { password: `Must contain atleast 8 characters!` }) })
    } else {
      verdict = false
      this.setState({ validationErr: Object.assign(this.state.validationErr, { password: `Enter a password!` }) })
    }
    //role
    if (role) {
    } else {
      verdict = false
      // this.setState({ validationErr: { email: `Email isn't formatted properly!` } })
    }
    //sec question
    if (question) {
      this.setState({ validationErr: Object.assign(this.state.validationErr, { secQuestion: null }) })
    } else {
      verdict = false
      this.setState({ validationErr: Object.assign(this.state.validationErr, { secQuestion: `Please select a security question!` }) })
    }
    //sec answer
    if (answer) {
      this.setState({ validationErr: Object.assign(this.state.validationErr, { secAnswer: null }) })
    }
    else {
      verdict = false
      this.setState({ validationErr: Object.assign(this.state.validationErr, { secAnswer: `Please enter a security answer!` }) })
    }
    //the verdict
    return verdict
  }
  register = async () => {
    if (this.state.privacy && this.validate()) {
      try {
        const form = this.buildRegistrationRequestForm()
        const req = await axios({
          method: 'post',
          url: `${URL.testing}/api/auth/register/admin`,
          headers: {},
          data: form
        })
        // console.log(req)
        Notifications.notify({ title: `Ready to log in!`, body: req.data.results.message })
        this.props.history.push(`/auth/login`)
      } catch (error) {
        if (error || error.response) {
          console.log(error)
          Notifications.notify({ title: `Error!`, body: error.response.data.error })
        }
      }
    } else {
      // handle check box response
      !this.state.privacy ? console.warn('Agree to privacy policy!') : console.log('You have agreed to the privacy policy!')
      // alert('Agree to privacy policy!')
    }
  }
  render() {
    // console.log(`state`, this.state)
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
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-3 text-center">
              <div>
                Sign Up
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              {/* <div className="text-center text-muted mb-4">
                <small>Sign  Up</small>
              </div> */}
              <Form role="form">
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-1">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Name" type="text" onChange={e => this.setState({ name: e.target.value })} />
                  </InputGroup>
                  {
                    this.state.validationErr.name ?
                      <div className="text-red font-italic">
                        <small>
                          {this.state.validationErr.name}
                        </small>
                      </div> : ''
                  }
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-1">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" type="email" onChange={e => this.setState({ email: e.target.value })} />
                  </InputGroup>
                  {
                    this.state.validationErr.email ?
                      <div className="text-red font-italic">
                        <small>
                          {this.state.validationErr.email}
                        </small>
                      </div> : ''
                  }
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Password [1 upper, 1 lower, 1 special, 1 number, 8 chars]" type="password" onChange={this.handlePasswordInput} />
                  </InputGroup>
                  <div className="text-red font-italic">
                    <small>
                      {this.state.validationErr.password ? this.state.validationErr.password + ' | ' : ''} Password Strength is:  {this.handlePasswordScore()}
                    </small>
                  </div>
                </FormGroup>
                <FormGroup>
                  <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                    onChange={e => this.setState({ sec_question: e.target.value })}
                    defaultValue={`Select a security question`}
                  >
                    <option disabled>Select a security question</option>
                    {questions.map((question, index) => {
                      return <option key={index}>{question}</option>
                    })}
                  </Input>
                  {
                    this.state.validationErr.secQuestion ?
                      <div className="text-red font-italic">
                        <small>
                          {this.state.validationErr.secQuestion}
                        </small>
                      </div> : ''
                  }
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Security question"
                      type="password"
                      onChange={e => this.setState({ sec_answer: e.target.value })}
                    />
                  </InputGroup>
                  {
                    this.state.validationErr.secAnswer ?
                      <div className="text-red font-italic">
                        <small>
                          {this.state.validationErr.secAnswer}
                        </small>
                      </div> : ''
                  }
                </FormGroup>
                <Row className="my-4">
                  <Col xs="12">
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id="customCheckRegister"
                        type="checkbox"
                        onChange={e => this.setState({ privacy: !this.state.privacy })}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheckRegister"
                      >
                        <span className="text-muted">
                          I agree with the{" "}
                          <a href="#pablo" onClick={e => e.preventDefault()}>
                            Privacy Policy
                          </a>
                        </span>
                      </label>
                    </div>
                  </Col>
                </Row>
                <div className="text-center">
                  <Button className="mt-4" color="primary" type="button" onClick={this.register}>
                    Create account
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
                href="/auth/login"
                onClick={e => {
                  this.setState({ redirect: '/auth/login' })
                  e.preventDefault()
                }}
              >
                <small>Login</small>
              </a>
            </Col>
          </Row>
        </Col>
      </>
    );
  }
}
export default withRouter(Register)
