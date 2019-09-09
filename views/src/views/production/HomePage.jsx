import React, { Component } from 'react'
import { Col, Row, Container, Input, InputGroup, InputGroupAddon, Button } from 'reactstrap'
class HomePage extends Component {
    images = [
        `https://via.placeholder.com/150`,
        `https://via.placeholder.com/150`
    ]
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Container fluid>
                <Row className='carbon p-0'>
                    <Col sm={12} md={6} lg={6} className='text-center text-white'>
                        <Row className='h-25'><Col></Col></Row>
                        <Row className='h-50'><Col className='align-self-center'>
                            about
                        </Col></Row>
                        <Row className='h-25'><Col></Col></Row>
                    </Col>
                    <Col sm={12} md={6} lg={6} className='text-white p-0' style={{ height: '35vw', overflow: 'hidden' }}>
                        <img src={this.images[0]} alt='team' width='100%' height='100%' className='d-block mx-auto' />
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} md={6} lg={6} className='text-white p-0' style={{ height: '35vw', overflow: 'hidden' }}>
                        <img src={this.images[0]} alt='team' width='100%' height='100%' className='d-block mx-auto' />
                    </Col>
                    <Col sm={12} md={6} lg={6} className='text-center'>
                        <Row className='h-25'><Col></Col></Row>
                        <Row className='h-50'><Col className='align-self-center'>
                            who
                        </Col></Row>
                        <Row className='h-25'><Col></Col></Row>
                    </Col>
                </Row>
                <Row className='blueprint'>
                    <Col sm={12} md={6} lg={6} className='text-center'>
                        <Row className='h-25'><Col></Col></Row>
                        <Row className='h-50'><Col className='align-self-center'>
                            goal
                        </Col></Row>
                        <Row className='h-25'><Col></Col></Row>
                    </Col>
                    <Col sm={12} md={6} lg={6} className='text-white p-0' style={{ height: '35vw', overflow: 'hidden' }}>
                        <img src={this.images[0]} alt='team' width='100%' height='100%' className='d-block mx-auto' />
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} md={6} lg={6} className='text-white p-0' style={{ height: '35vw', overflow: 'hidden' }}>
                        <img src={this.images[0]} alt='team' width='100%' height='100%' className='d-block mx-auto' />
                    </Col>
                    <Col sm={12} md={6} lg={6} className='text-center border-bottom'>
                        <Row className='h-25'><Col></Col></Row>
                        <Row className='h-50'><Col className='align-self-center'>
                            tech
                        </Col></Row>
                        <Row className='h-25'><Col></Col></Row>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} md={6} lg={6} className='text-dark p-5 m-5 mx-auto rounded shadow-lg' style={{ background: 'rgba(255,255,255,1)' }}>
                        <Row>
                            <Col className='text-center'>
                                <h1>Contact Us</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            David Freer: <a href='mailto:david.freer@gmail.com'>david.freer@gmail.com</a>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12} md={12} lg={12} className='mt-3'>
                                <InputGroup >
                                    <InputGroupAddon addonType="prepend">Name</InputGroupAddon>
                                    <Input placeholder="" />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12} md={12} lg={12} className='mt-3'>
                                <InputGroup >
                                    <InputGroupAddon addonType="prepend">Email</InputGroupAddon>
                                    <Input placeholder="" />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12} md={12} lg={12} className='mt-3'>
                                <InputGroup >
                                    <InputGroupAddon addonType="prepend">Message</InputGroupAddon>
                                    <Input placeholder="" />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col className='mt-3'>
                                <Button color='primary' className='btn-block'>Submit</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default HomePage