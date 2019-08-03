import React, { Component } from 'react'
import { Col, Row, Container } from 'reactstrap'
import Axios from 'axios';
import URL from '../../variables/url'
import { Table } from 'reactable'
class Highscore extends Component {
    constructor(props) {
        super(props);
        this.state = { highscore: [] }
    }
    componentWillMount = () => {
        this.getHighscoreData()
    }
    getHighscoreData = () => {
        Axios({
            url: `${URL.testing}/api/players/highscore`,
            method: 'get',
            withCredentials: true,
        })
            .then(res => this.setState({ highscore: res.data.results.highscores }))
            .catch(err => console.log(err.response))
    }
    render() {
        return (
            <Container>
                <Row className=''>
                    <Col
                        style={{ backgroundColor: 'white' }}
                        className='shadow-lg rounded m-2 p-5'
                    >
                        <Row>
                            <Col className='mx-auto m-2 text-center pb-3'>
                                <h3>Top 10 Highscores</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Table className="table" data={this.state.highscore} />
                            </Col>
                        </Row>
                    </Col>
                    <Col
                        lg={4}
                        style={{ backgroundColor: 'white' }}
                        className='shadow-lg rounded m-2 p-5'
                    >
                        messages feed
                </Col>
                </Row>
            </Container>
        )
    }
}
export default Highscore