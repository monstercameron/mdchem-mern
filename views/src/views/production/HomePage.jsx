import React, { Component } from 'react'
import { Col, Row, Container, Input, InputGroup, InputGroupAddon, Button } from 'reactstrap'
import clip from '../../assets/video/mdchem-intro.mp4'
import image1 from '../../assets/img/samples/level2.png'
import image2 from '../../assets/img/samples/login.png'
import image3 from '../../assets/img/samples/halloffame.PNG'
import image4 from '../../assets/img/samples/level5.PNG'
import image5 from '../../assets/img/samples/tech.png'
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
            <Container fluid className='carbon'>
                <Row>
                    <Col sm={12} md={12} lg={12} className='p-0 m-0'>
                        <video src={clip} autoPlay={true} loop={true} muted className='img-fluid' />
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} md={7} lg={7} className='text-white p-1' style={{ height: '35vw', overflow: 'hidden' }}>
                        <img src={image1} alt='team' width='100%' height='100%' className='d-block mx-auto rounded' />
                    </Col>
                    <Col sm={12} md={5} lg={5} className='text-center text-white'>
                        <Row className='h-25'><Col></Col></Row>
                        <Row className=''>
                            <Col className='align-self-center'>
                                <h2 className='text-white'>
                                    Students will learn chemistry concepts such as names of elements,
                                    ions and compounds. As students progress through each level the
                                    challenges become more and more intense. You will need all your
                                    concentration to master MDChem.
                                </h2>
                            </Col>
                        </Row>
                        <Row className='h-25'><Col></Col></Row>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} md={7} lg={7} className='text-white p-2' style={{ height: '35vw', overflow: 'hidden' }}>
                        <img src={image2} alt='team' width='100%' height='100%' className='d-block mx-auto rounded' />
                    </Col>
                    <Col sm={12} md={5} lg={5} className='text-center'>
                        <Row className='h-25'><Col></Col></Row>
                        <Row className='h-50'>
                            <Col className='align-self-center'>
                                <h2 className='text-white'>
                                    Special thanks to Miami Dade College’s President’s Innovation Fund and the ARCOS Grant that provided the resources for the creation of this game.
                                </h2></Col>
                        </Row>
                        <Row className='h-25'><Col></Col></Row>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} md={7} lg={7} className='text-white p-2' style={{ height: '35vw', overflow: 'hidden' }}>
                        <img src={image3} alt='team' width='100%' height='100%' className='d-block mx-auto rounded' />
                    </Col>
                    <Col sm={12} md={5} lg={5} className='text-center'>
                        <Row className='h-25'><Col></Col></Row>
                        <Row className='h-50'>
                            <Col className='align-self-center'>
                                <Row>
                                    <Col sm={12} className='mb-3'>
                                        <h2 className='text-white'>Thanks to the following Miami Dade (MDC) College professor, staff and students who made this game a reality.</h2>
                                    </Col>
                                    <Col sm={12} className='text-left mb-3'>
                                        <h2 className='text-white'>Author – Dr. Davia Hudson-Holness</h2>
                                    </Col>
                                    <Col sm={12} className='text-left mb-3'>
                                        <h2 className='text-white'>Professor - David Freer</h2>
                                    </Col>
                                    <Col sm={12} className='text-left mb-3'>
                                        <h2 className='text-white'>Staff - John Stilien</h2>
                                    </Col>
                                    <Col sm={12} className='text-left mb-3'>
                                        <h2 className='text-white'>Students - Jason Balladares, Earl Cameron, Francisco Belliard, Jorge Sanchez, Kevin Quinones</h2>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className='h-25'><Col></Col></Row>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} md={7} lg={7} className='text-white p-2' style={{ height: '35vw', overflow: 'hidden' }}>
                        <img src={image5} alt='team' width='100%' height='100%' className='d-block mx-auto rounded' />
                    </Col>
                    <Col sm={12} md={5} lg={5} className='text-center'>
                        <Row className='h-25'><Col></Col></Row>
                        <Row className='h-50'><Col className='align-self-center'>
                            <h2 className='text-white'>Technology Highlight.</h2>
                        </Col></Row>
                        <Row className='h-25'><Col></Col></Row>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} md={6} lg={6} className='text-dark p-5 mt-3 mb-3 mx-auto rounded shadow-lg' style={{ background: 'rgba(255,255,255,1)' }}>
                        <form action="https://formspree.io/david.freer@gmail.com" method="POST">
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
                                        <Input placeholder="" type="text" name="name"/>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12} md={12} lg={12} className='mt-3'>
                                    <InputGroup >
                                        <InputGroupAddon addonType="prepend">Email</InputGroupAddon>
                                        <Input placeholder="" type="email" name="_replyto"/>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12} md={12} lg={12} className='mt-3'>
                                    <InputGroup >
                                        <InputGroupAddon addonType="prepend">Message</InputGroupAddon>
                                        <Input placeholder="" type="text" name="message"/>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col className='mt-3'>
                                    <Button color='primary' className='btn-block'>Submit</Button>
                                </Col>
                            </Row>
                        </form>
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default HomePage