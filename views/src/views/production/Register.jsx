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
import questions from "../../variables/SecurityQuestions"
import zxcvbn from "zxcvbn"

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
} from "reactstrap";



class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: null,
    };
  }
  handlePasswordInput = (e) => {
    const results = zxcvbn(e.target.value)
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
    const form = {

    }
    console.log('runs')
  }
  render() {
    console.log(`score`, this.state.score)
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
                    <Input placeholder="Name" type="text" />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" type="email" />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Password" type="password" onKeyUp={this.handlePasswordInput} />
                  </InputGroup>
                  <div className="text-muted font-italic">
                    <small>
                      Password Strength is:  {this.handlePasswordScore()}
                    </small>
                  </div>
                </FormGroup>
                <FormGroup>
                  <Input type="select" name="select" id="exampleSelect">
                    <option disabled defaultValue>Select a security question</option>
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
                    <Input placeholder="Security question" type="password" />
                  </InputGroup>
                </FormGroup>
                <Row className="my-4">
                  <Col xs="12">
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id="customCheckRegister"
                        type="checkbox"
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
                  <Button className="mt-4" color="primary" type="button" onClick={this.buildRegistrationRequestForm}>
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

export default Register;
