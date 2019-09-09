import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Col, Row, Container } from 'reactstrap'
import HomePage from '../views/production/HomePage'
import Privacy from '../views/production/Privacy'
import logo from '../assets/img/brand/logo.png'
class Landing extends Component {
    header = {
        background: 'linear-gradient(353deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 23%, rgba(0,212,255,1) 84%)'
    }
    footer = {
        background: 'rgba(2,0,36,1)',
        position: 'fixed',
        bottom: '0'
    }
    login = {
        background: 'rgba(1,99,180,1)'
    }
    constructor(props) {
        super(props);
        this.state = {}
    }
    childContainer = () => {
        switch (this.props.location.pathname) {
            case '/privacy':
                return <Privacy />
            default:
                return <HomePage />
        }
    }
    render() {
        // console.log(this.props)
        return (
            <Container fluid className='dotted' >
                <Row>
                    <Col
                        className='p-4'
                        style={this.header}
                    >
                        <Row>
                            <Col xs={12} sm={12} md={3} lg={3} xl={2}>
                                <img src={logo} className='img-fluid d-block' alt='MDChem.app' />
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={2} xl={2} className="ml-auto">
                                <Row>
                                    <Col sm={'auto'}
                                        className='mx-auto mt-3 mb-1 p-3 rounded shadow-lg--hover align-middle text-center  text-white cursor glow'
                                        style={this.login}
                                        onClick={e => this.props.history.push('/auth/login')}
                                    >
                                        <i className="material-icons d-block">
                                            arrow_right_alt
                                        </i>
                                        Login
                                </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    {this.childContainer()}
                </Row>
                {/* <Row className='text-center'>
                    <Col style={this.footer}>
                        <Row>
                            <Col sm={12} md={4} lg={4} className='p-3 text-white'>
                                things  for  the footer
                            </Col>
                            <Col sm={12} md={4} lg={4} className='p-3 text-white'>
                                things  for  the footer
                            </Col>
                            <Col sm={12} md={4} lg={4} className='p-3 text-white'>
                                things  for  the footer
                            </Col>
                        </Row>
                    </Col>
                </Row> */}
            </Container>
        )
    }
}

export default withRouter(Landing)