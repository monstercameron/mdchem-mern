import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// reactstrap components
import {
    Col,
    Row,
    Button
} from "reactstrap"
import URL from '../../variables/url'
import axios from 'axios'
class Group extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentWillMount = () => {
        this.countAllStudentsOfAGroup()
    }
    countAllStudentsOfAGroup = async () => {
        const count = await axios({
            url: `${URL.testing}/api/players/list/${this.props.group.id}`,
            method: 'get',
            withCredentials: true
        })
        // console.log(count)
        this.setState({ count: count.data.results.count })
    }
    render() {
        // console.log('Count:', this.state)
        return (
            <Col className='border rounded p-3 m-2 shadow-lg mx-auto'>
                <Row>
                    <Col>
                        <Row>
                            <Col>
                                Group: {this.props.group.id}
                            </Col>
                            <Col>
                                Students: {this.state.count}
                            </Col>
                            <Col sm={12}>
                                Notes: {this.props.group.notes}
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={2}>
                        <Link to={`/admin/students/${this.props.group.id}`}>
                            <Button color='success' className='btn-block'>
                                View Group
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </Col>
        )
    }
}
export default Group