import React, { Component } from 'react'
import { Col, Row, Container, Button } from 'reactstrap'
import Axios from 'axios';
import URL from '../../variables/url'
import { Table } from 'reactable'
import Notifications from './Notifications';
class Highscore extends Component {
    constructor(props) {
        super(props);
        this.state = { highScore: [] }
    }
    componentWillMount = () => {
        this.getHighscoreData()
    }
    getHighscoreData = async () => {
        try {
            const req = await Axios({
                url: `${URL.testing}/api/players/highscore`,
                method: 'get',
                withCredentials: true,
            })
            // console.log(req.data)
            this.setState({ highScore: req.data.scores })
        } catch (error) {
            console.log(error)
        }
    }
    manualRefresh = async () => {
        try {
            const query = await Axios({
                url: `${URL.testing}/api/players/highscore/update`,
                method: 'get',
                withCredentials: true,
            })
            Notifications.notify({ title: query.data.results.message })
        } catch (error) {
            Notifications.notify({ title: `Error!`, body: error.response })
        }
    }
    render() {
        // console.log('highscore', this.state)
        return (
            <Container>
                <Row className=''>
                    <Col
                        style={{ backgroundColor: 'white' }}
                        className='shadow-lg rounded m-2 p-5'
                    >
                        <Row>
                            <Col sm={10} className='mx-auto m-2 text-center pb-3'>
                                <h3>Top 10 Highscores</h3>
                            </Col>
                            <Col sm={2} >
                                <Button color='primary' onClick={this.manualRefresh}>
                                    <i className="fa fa-refresh" aria-hidden="true">refresh</i>
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Table className="table" data={this.state.highScore} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default Highscore