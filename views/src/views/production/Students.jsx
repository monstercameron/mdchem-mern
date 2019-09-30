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
import { withRouter, Link } from 'react-router-dom'
import DataTable from "../../components/widgets/tables"
// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  Container,
  Row,
  Col
} from "reactstrap"
// core components
import Header from "components/Headers/Header.jsx"
class Tables extends React.Component {
  hasGroupId = () => {
    return this.props.match.params.group ? `In Group: ${this.props.match.params.group}` : ''
  }
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          {this.props.match.params.group ?
            <Row>
            <Col sm={3}
              className='mb-3 text-white border p-2 ml-3 rounded'
              style={{ backgroundColor: 'white', a: { active: 'red' } }}
            >
              <Link to='/admin/students'>
                <i className="ni ni-bold-left"></i> Back To All Students
        </Link>
            </Col>
          </Row> :
            ''
          }
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">My Students {this.hasGroupId()}</h3>
                </CardHeader>
                <DataTable />
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
export default withRouter(Tables)