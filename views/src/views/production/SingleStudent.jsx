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
import React from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  Container,
  Row
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";
import axios from 'axios'
class Tables extends React.Component {
  testCookieFetch = () => {
    axios({
      url: `http://localhost:8080/api/admin`,
      method: 'get',
      headers: {
        // 'Credentials':'include',
        // 'Access-Control-Allow-Credentials': true
      },
      withCredentials: true,
      data: {}
  })
    .then(res => console.log(res))
  }
  componentWillMount = () => {
    this.testCookieFetch()
  }
  render() {
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
                  <h3 className="mb-0">All Students</h3>
                </CardHeader>
                <div>student info goes here</div>
                <CardFooter className="py-4">
                  things go here
                </CardFooter>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}
export default Tables;