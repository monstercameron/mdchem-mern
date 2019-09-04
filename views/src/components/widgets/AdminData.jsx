import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import {
    Container, Row, Col, Input, Button, FormGroup, Label,
    Modal, ModalHeader, ModalBody, ModalFooter,
    DropdownItem, DropdownToggle, DropdownMenu, ButtonDropdown
} from "reactstrap"
import axios from 'axios'
import URL from '../../variables/url'
import Notifications from '../../components/widgets/Notifications'
class AdminData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            approved: this.props.approved,
            modal: false,
            dropdownOpen: false,
            selectedGroup: null,
            redirect: false
        }
    }
    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    toggleDropDown = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
    approveAdmin = async () => {
        if (this.state.approved !== this.props.approved) {
            try {
                const req = await axios({
                    url: `${URL.testing}/api/admin/approve`,
                    method: 'post',
                    withCredentials: true,
                    data: { id: this.props._id, approved: this.state.approved }
                })
                // console.log(req.data)
                Notifications.notify({ title: req.data.results.message })
                this.props.getListOfAdmins()
            } catch (error) {
                // console.error(error.response.data.error)
                Notifications.notify({ title: `Error!`, body:error.response.data.error })
            }
        } else {
            Notifications.notify({ title: `No changes were made`})
        }
    }
    deleteAdmin = async () => {
        try {
            const req = await axios({
                url: `${URL.testing}/api/admin/`,
                method: 'delete',
                withCredentials: true,
                data: { id: this.props._id }
            })
            console.log(req.data)
            this.toggle()
            this.props.getListOfAdmins()
        } catch (error) {
            console.error(error.response.data.error)
            Notifications.notify({ title: `Error!`, body:error.response.data.error })
        }
    }
    toggleRedirect = e => {
        if (this.state.selectedGroup) {
            this.props.history.push(`/admin/students/${this.state.selectedGroup}`)
        }
    }
    groupSelector = () => {
        if (this.props.meta.mygroups.length > 0) {
            return (
                <React.Fragment>
                    <Row>
                        <Col sm={7} className=''>
                            <Row>
                                <Col sm={'auto'} className='mx-auto '>
                                    <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
                                        <DropdownToggle caret color="info">
                                            {this.state.selectedGroup ? this.state.selectedGroup : 'Admin Groups'}
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {this.props.meta.mygroups.map((group, index) => {
                                                return <DropdownItem key={index}
                                                    onClick={e => this.setState({ selectedGroup: e.target.innerText })}
                                                >
                                                    {group.id}
                                                </DropdownItem>
                                            })}
                                        </DropdownMenu>
                                    </ButtonDropdown>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={5} className='text-right' style={this.state.selectedGroup ? { visibility: 'visible' } : { visibility: 'hidden' }}>
                            <Button color='primary' className='btn-block' onClick={this.toggleRedirect}>
                                Go <i className="fa fa-arrow-right" aria-hidden="true"></i>
                            </Button>
                        </Col>
                    </Row>
                </React.Fragment >
            )
        } else {
            return (
                <div></div>
            )
        }
    }
    render() {
        // console.log(this.state)
        return (
            <Container className='border-top pt-3 pb-2 mx-auto'>
                <Row>
                    <Col sm={3}>
                        <Row>
                            <Col sm={12}>
                                {this.props.name}
                            </Col>
                            <Col sm={12}>
                                {this.props.email}
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={4}>
                        {this.groupSelector()}
                    </Col>
                    <Col sm={5} className='text-right'>
                        <Row>
                            <Col sm={4} className='mx-auto'>
                                <FormGroup check inline>
                                    <Label check>
                                        <Input
                                            type="checkbox"
                                            defaultChecked={this.props.approved}
                                            onChange={e => this.setState({ approved: e.target.checked })}
                                        /> Approved
                                    </Label>
                                </FormGroup>
                            </Col>
                            <Col sm={4}>
                                <Button
                                    className='btn-block'
                                    color='primary'
                                    onClick={this.approveAdmin}
                                >
                                    <i className="fa fa-check" aria-hidden="true"></i>
                                </Button>
                            </Col>
                            <Col sm={4}>
                                <Button
                                    className='btn-block'
                                    color='danger'
                                    onClick={this.toggle}
                                >
                                    <i className="fa fa-trash" aria-hidden="true"></i>
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                            <ModalHeader toggle={this.toggle}>Delete Admin</ModalHeader>
                            <ModalBody>
                                Are you sure you want to delete admin '{this.props.email}' ?
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onClick={this.deleteAdmin}>Delete</Button>{' '}
                                <Button color="success" onClick={this.toggle}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default withRouter(AdminData)