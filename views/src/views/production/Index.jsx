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
import {
  Container,
  Row,
  // Col
} from "reactstrap";
import Highscore from '../../components/widgets/highscore'
import Header from "components/Headers/Header.jsx"
class Index extends React.Component {
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Highscore />
            {/* <Col
              lg={4}
              style={{ backgroundColor: 'white' }}
              className='shadow-lg rounded m-2 p-5'
            >
              messages feed
            </Col> */}
          </Row>
        </Container>
      </>
    );
  }
}
export default Index