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
import { Redirect } from "react-router-dom"
import questions from "../../variables/SecurityQuestions"
import zxcvbn from "zxcvbn"
import axios from "axios"
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

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: null,
      privacy: false
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
    if (name) {
      console.log(`name is good`)
    } else {
      return false
    }
    if (email) {
      console.log(`email is good`)
    } else {
      return false
    }
    if (password) {
      console.log(`password is good`)
    } else {
      return false
    }
    if (role) {
      console.log(`role is good`)
    } else {
      return false
    }
    if (question) {
      console.log(`question is good`)
    } else {
      return false
    }
    if (answer) {
      console.log(`answer is good`)
    } else {
      return false
    }
    return true
  }
  register = () => {
    if (this.state.privacy && this.validate()) {
      const form = this.buildRegistrationRequestForm()
      axios({
        method: 'post',
        url: 'http://localhost:8080/api/auth/register/admin',
        headers: {},
        data: form
      })
        .then(res => {
          console.log(res)
          this.setState({ toLogin: true })
        })
        .catch(err => console.log(err))
    } else {
      // handle check box response
      console.log('agree to privacy policy')
    }
  }
  render() {
    //console.log(`state`, this.state)
    if (this.state.toLogin === true) {
      return <Redirect to='/auth/login' />
    }
    return (
      <>
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div>
                something can go here
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Sign  Up</small>
              </div>
              <Form role="form">
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Name" type="text" onChange={e => this.setState({ name: e.target.value })} />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" type="email" onChange={e => this.setState({ email: e.target.value })} />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Password" type="password" onChange={this.handlePasswordInput} />
                  </InputGroup>
                  <div className="text-muted font-italic">
                    <small>
                      Password Strength is:  {this.handlePasswordScore()}
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
        </Col>
      </>
    );
  }
}
export default Register
