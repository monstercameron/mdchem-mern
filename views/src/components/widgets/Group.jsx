import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// reactstrap components
import {
    Col,
    Row,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "reactstrap"
import URL from '../../variables/url'
import axios from 'axios'
class Group extends Component {
    constructor(props) {
        super(props)
        this.state = { modal: false, deleted: false }
    }
    toggle = () => {
        this.setState({ modal: !this.state.modal })

    }
    componentWillMount = () => {
        this.countAllStudentsOfAGroup()
    }
    countAllStudentsOfAGroup = async () => {
        const count = await axios({
            url: `${URL.testing}/api/players/count/${this.props.group.id}`,
            method: 'get',
            withCredentials: true
        })
        // console.log(count)
        this.setState({ count: count.data.results.count })
    }
    removeGroup = async () => {
        const req = await axios({
            url: `${URL.testing}/api/admin/groups/delete`,
            method: 'post',
            withCredentials: true,
            data: {
                group: this.props.group.id
            }
        })

        console.log(req)
        if (req.status === 200) {
            this.setState({ modal: !this.state.modal, deleted: !this.state.deleted })
        }

    }
    render() {
        // console.log('Count:', this.state)
        // console.log(this.state)
        return (
            <Col className='border rounded p-3 m-2 shadow-lg mx-auto'>
                <Row
                    style={!this.state.deleted ? { visibility: 'hidden' } : { visibility: 'visible' }}
                >
                    <Col className='text-center'>
                        Removed!
                    </Col>
                </Row>
                <Row
                    style={this.state.deleted ? { visibility: 'hidden' } : { visibility: 'visible' }}
                >
                    <Col sm={9}>
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
                    <Col sm={1}>
                        <Link to={`/admin/students/${this.props.group.id}`}>
                            <Button color='success' className='btn-block'>
                                <i className="fa fa-eye" aria-hidden="true"></i>
                            </Button>
                        </Link>
                    </Col>
                    <Col sm={1} className='text-center'>
                        <Button color="danger" className='btn-block' onClick={this.toggle}>
                            <i className="fa fa-trash" aria-hidden="true"></i>
                        </Button>
                    </Col>
                </Row>

                <div>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Remove Group?</ModalHeader>
                        <ModalBody>
                            This will remove the group from the web interface.
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" onClick={this.removeGroup}>Remove</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </Col>
        )
    }
}
export default Group