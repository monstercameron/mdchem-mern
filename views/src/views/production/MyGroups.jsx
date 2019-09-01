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
import React from "react"
import { withRouter } from 'react-router-dom'
// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Input
} from "reactstrap"
// core components
import Header from "components/Headers/Header.jsx"
import URL from '../../variables/url'
import Group from '../../components/widgets/Group'
import axios from 'axios'
class StudentInfo extends React.Component {
  state = { open: false, notes: '', id: '' }
  componentWillMount = () => {
    this.getAdminGroups()
  }
  getAdminGroups = async () => {
    try {
      const groups = await axios({
        url: `${URL.testing}/api/admin/groups`,
        method: 'post',
        withCredentials: true,
        data: { email: localStorage.getItem('email') }
      })
      // console.log(groups)
      this.setState({ groups: groups.data.results.groups })
    } catch (error) {
      console.log(error)
    }
  }
  displayGroups = () => {
    if (this.state.groups)
      return this.state.groups.map((group, index) => {
        return <Group key={index} group={group} email={localStorage.getItem('temp')} />
      })
  }
  addGroup = async () => {
    const addGroup = await axios({
      url: `${URL.testing}/api/admin/groups/add`,
      method: 'post',
      withCredentials: true,
      data: { ...this.groupForm() }
    })
    console.log(addGroup)
    if (addGroup.status === 200) {
      this.setState({ open: !this.state.open })
      this.getAdminGroups()
      this.forceUpdate()
    }
  }
  groupForm = () => {
    return {
      email: localStorage.getItem('email'),
      id: this.state.id,
      notes: this.state.notes
    }
  }
  render() {
    // console.log(this.state)
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <Col>
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Container>
                    <Row>
                      <Col>
                        <h3 className='d-inline-block'>My Groups</h3>
                      </Col>
                      <Col sm={2} className='text-center'>
                        <Button className='btn-block' color={!this.state.open ? 'success' : 'danger'} alt='Add Group' onClick={() => this.setState({ open: !this.state.open })}>
                          {!this.state.open ? <i className="fa fa-plus-square" aria-hidden="true" /> : <i className="fa fa-minus-square" aria-hidden="true" />}
                        </Button>
                      </Col>
                    </Row>
                  </Container>
                </CardHeader>
                <Container>
                  <Row>
                    <Col>
                      {/* hidden class add */}
                      <Col sm={12} className='border rounded p-2 shadow-lg' style={this.state.open ? { height: 'auto', visibility: 'visible' } : { height: '0', visibility: 'hidden' }}>
                        <Form>
                          <FormGroup>
                            <Input className='mb-2' type="text" name="id" id="id" placeholder="Group ID" onChange={e => this.setState({ id: e.target.value })} />
                            <Input type="text" name="notes" id="notes" placeholder="Notes" onChange={e => this.setState({ notes: e.target.value })} />
                          </FormGroup>
                          <Button className='btn-block' color='primary' onClick={e => this.addGroup()}>Add Group</Button>
                        </Form>
                      </Col>
                      {this.displayGroups()}
                    </Col>
                  </Row>
                </Container>
                <CardFooter className="py-4">
                  <Container>
                    <Row>
                      <Col>
                        {/* Footer */}
                      </Col>
                    </Row>
                  </Container>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
export default withRouter(StudentInfo)