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
  // Input,
  // Button
} from "reactstrap"
// core components
import Header from "components/Headers/Header.jsx"
import axios from 'axios'
import URL from '../../variables/url'
import AdminData from '../../components/widgets/AdminData'
import { ClipLoader } from 'react-spinners';
class Admins extends React.Component {
  state = { admins: null }
  componentWillMount = () => {
    this.getListOfAdmins()
  }
  getListOfAdmins = async () => {
    const req = await axios({
      url: `${URL.testing}/api/admin/`,
      method: 'get',
      withCredentials: true
    })
    // console.log(req.data)
    this.setState({ admins: req.data.results.admins })
  }
  displayAdmins = () => {
    if (this.state.admins) {
      return this.state.admins.map((admin, index) => {
        return <AdminData
          getListOfAdmins={this.getListOfAdmins}
          {...admin}
          key={index}
        />
      })
    } else {
      return (
        <Col sm={3} className='mx-auto'>
          <ClipLoader
            // css={override}
            sizeUnit={"px"}
            size={150}
            color={'#123abc'}
            loading={this.state.loading}
          />
        </Col>
      )
    }
  }
  render() {
    // console.log('state', this.state)
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">My Admins</h3>
                </CardHeader>
                <Container className='mt-2'>
                  <Row>
                    <Col sm={3} className='text-center'>
                      <h4>Email/name</h4>
                    </Col>
                    <Col sm={3} className='text-center'>
                      <h4>Groups</h4>
                    </Col>
                    <Col sm={6} className='text-center'>
                      <h4>Actions</h4>
                    </Col>
                  </Row>
                </Container>
                {this.displayAdmins()}
                <CardFooter className="py-4">
                  {/* things go here */}
                </CardFooter>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    )
  }
}
export default withRouter(Admins)