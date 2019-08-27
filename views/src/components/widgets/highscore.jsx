import React, { Component } from 'react'
import { Col, Row, Container, Button } from 'reactstrap'
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
    manualRefresh = async () => {
        try {
            const query = await Axios({
                url: `${URL.testing}/api/players/highscore/update`,
                method: 'get',
                withCredentials: true,
            })
            alert(query.data.results.message)
        } catch (error) {
            alert(error.response)
        }
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
                                <Table className="table" data={this.state.highscore} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default Highscore