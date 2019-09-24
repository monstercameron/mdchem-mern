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
import { withRouter } from "react-router-dom"
import questions from "../../variables/SecurityQuestions"
import URL from '../../variables/url'
import zxcvbn from "zxcvbn"
import axios from "axios"
// import validator from 'validator'
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
      password: null,
      secAnswer: null,
      secQuestion: null
    }
  }
  handlePasswordInput = (e) => {
    const results = zxcvbn(e.target.value)
    this.setState({ password: e.target.value })
    if (e.target.value.length > 6) {
      this.setState({ score: results.score })
    }
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
  buildResetRequest = () => {
    return {
      email: this.state.email,
      password: this.state.password,
      question: this.state.secQuestion,
      answer: this.state.secAnswer
    }
  }
  submit = async () => {
    try {
      console.log(this.buildResetRequest())
      const req = await axios({
        method: 'post',
        url: `${URL.testing}/api/auth/reset/admin?type=forgot`,
        headers: {},
        data: this.buildResetRequest()
      })
      // console.log(req.data)
      Notifications.notify({ title: req.data.results.message })
      this.props.history.push('/auth/login')
    } catch (error) {
      // console.log(error)
      Notifications.notify({ title: error.message })
    }
  }
  render() {
    console.log(this.state)
    return (
      <>
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-3 text-center">
              <div>
                Reset Password
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
                    <Input placeholder="Password [1 upper, 1 lower, 1 special, 1 number, 8 chars]" type="password" onChange={this.handlePasswordInput} />
                  </InputGroup>
                  <div className="text-red font-italic">
                    <small>
                      Password Strength is:  {this.handlePasswordScore()}
                    </small>
                  </div>
                </FormGroup>
                <FormGroup>
                  <Input
                    type="select"
                    name="select"
                    id=""
                    onChange={e => this.setState({ secQuestion: e.target.value })}
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
                      onChange={e => this.setState({ secAnswer: e.target.value })}
                    />
                  </InputGroup>
                </FormGroup>
                <div className="text-center">
                  <Button className="mt-4" color="primary" type="button" onClick={this.submit}>
                    Reset Password
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6">
              <a
                className="text-light"
                href="/auth/register"
                onClick={e => {
                  this.props.history.push('/auth/register')
                  e.preventDefault()
                }}
              >
                <small>Create new account</small>
              </a>
            </Col>
            <Col className="text-right" xs="6">
              <a
                className="text-light"
                href="/auth/login"
                onClick={e => {
                  this.props.history.push('/auth/login')
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
