import React from "react";

import "./banner.scss";
import {
  Container,
  Image,
  Row,
  Col,
  Navbar,
  Nav,
  Button,
  NavDropdown,
} from "react-bootstrap";
import { FaPencilAlt } from "react-icons/fa";

const Banner = () => {
  return (
    <>
      <Container className="bg-white p-0 header shadow" fluid>
        <Row xs={8} className="justify-content-center">
          <Col xs={8} className="banner-img-container">
            {/* <FaRegImage className="cover-icon text-placeholder h2" /> */}
            <Image
              src={`http://localhost:3001/images/${"1619982046081-shadow-zugspitze.jpg"}`}
              alt="banner"
              rounded
              className="banner-img"
            />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col
            xs={8}
            className="d-flex profile-img-container justify-content-center"
          >
            <Image
              src={`http://localhost:3001/images/${"1619980030154-profileImg.jpg"}`}
              alt="profileImg"
              roundedCircle
              className="profile-img"
            />
            <h3 className="d-block font-weight-bold mt-2 pb-0">Kurt Urban</h3>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={8}>
            <Navbar className="border-top mt-4 navbar">
              <Nav className="mr-auto d-none d-md-flex font-weight-bold">
                <Nav.Item>
                  <Nav.Link className="mr-2">Posts</Nav.Link>
                </Nav.Item>
                <Nav.Item className="mr-2">
                  <Nav.Link>About</Nav.Link>
                </Nav.Item>
                <Nav.Item className="mr-2">
                  <Nav.Link>Friends</Nav.Link>
                </Nav.Item>
                <Nav.Item className="mr-2">
                  <Nav.Link>Photos</Nav.Link>
                </Nav.Item>
              </Nav>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto d-md-none">
                  <Nav.Item>
                    <NavDropdown title="More">
                      <NavDropdown.Item>
                        <Nav.Link>Posts</Nav.Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Nav.Link>About</Nav.Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Nav.Link>Friends</Nav.Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Nav.Link>Photos</Nav.Link>
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav.Item>
                </Nav>
              </Navbar.Collapse>
              <Nav>
                <Nav.Item>
                  <Button variant="light" className="">
                    <FaPencilAlt /> Edit Profile
                  </Button>
                </Nav.Item>
              </Nav>
            </Navbar>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Banner;
