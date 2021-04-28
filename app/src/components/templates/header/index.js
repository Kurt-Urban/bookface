import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./header.scss";
import {
  Navbar,
  Nav,
  Image,
  NavDropdown,
  Row,
  Col,
  Form,
  InputGroup,
  FormControl,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import {
  FaSearch,
  FaHome,
  FaTv,
  FaStoreAlt,
  FaUsers,
  FaGamepad,
  FaBell,
  FaFacebookMessenger,
  FaPlus,
  FaCaretDown,
} from "react-icons/fa";

import { authenticate, logout } from "../../../reduxStore/auth";

const Header = ({ isAuthenticated, logout, authenticate }) => {
  const displayHeader = () => {
    if (!isAuthenticated) {
      return <div></div>;
    }
    return (
      <Navbar
        bg="white"
        fixed="top"
        className="shadow-sm"
        style={{ zIndex: 1 }}
      >
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Row className="w-100" noGutters>
          <Col xs={3} className="d-flex align-items-center">
            <Navbar.Brand>
              <Image
                src="https://i.imgur.com/nn2j8nS.png"
                alt="logo"
                roundedCircle
                style={{ height: 35 }}
              />
            </Navbar.Brand>
            <Form autoComplete="off" inline>
              <InputGroup className="d-none d-lg-flex">
                <InputGroup.Prepend className="border-custom pr-0">
                  <InputGroup.Text id="basic-addon1" className="border-custom">
                    <FaSearch className="text-dark" />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  id="searchbox"
                  className="bg-light shadow-none pl-0"
                  placeholder="Search Bookface"
                  aria-label="Search"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
            </Form>
            <Navbar.Collapse>
              <NavDropdown
                title={<FaSearch className="text-dark" />}
                id="searchbtn"
                className="d-sm-inline d-lg-none bg-light rounded-circle"
              ></NavDropdown>
            </Navbar.Collapse>
          </Col>
          <Col
            xs={6}
            className="d-flex align-items-center justify-content-center"
          >
            <Nav className="text-primary">
              <Nav.Item className="h3 px-4">
                <Link to="/dashboard">
                  <FaHome />
                </Link>
              </Nav.Item>
              <Nav.Item className="h3 px-4">
                <FaTv />
              </Nav.Item>
              <Nav.Item className="h3 px-4">
                <FaStoreAlt />
              </Nav.Item>
              <Nav.Item className="h3 px-4">
                <FaUsers />
              </Nav.Item>
              <Nav.Item className="h3 px-4">
                <FaGamepad />
              </Nav.Item>
            </Nav>
          </Col>
          <Col xs={3}>
            <Navbar.Collapse className="justify-content-end">
              <NavDropdown
                title={
                  <div className="position-absolute w-0">
                    <OverlayTrigger
                      trigger="hover"
                      placement="bottom"
                      overlay={<Tooltip id="overlay">Create</Tooltip>}
                    >
                      <FaPlus />
                    </OverlayTrigger>
                  </div>
                }
                id="left-dropdown"
                className="bg-light rounded-circle p-0 mr-2 mt-1 right-dropdown-group"
              >
                <NavDropdown.Item>Left Item 1</NavDropdown.Item>
                <NavDropdown.Item>Item 2</NavDropdown.Item>
                <NavDropdown.Item>Item 3</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title={
                  <OverlayTrigger
                    trigger="hover"
                    placement="bottom"
                    overlay={<Tooltip id="overlay">Messenger</Tooltip>}
                  >
                    <FaFacebookMessenger />
                  </OverlayTrigger>
                }
                id="midL-dropdown"
                className="bg-light rounded-circle p-0 mr-2 mt-1 right-dropdown-group"
              >
                <NavDropdown.Item>Mid Left Item 1</NavDropdown.Item>
                <NavDropdown.Item>Item 2</NavDropdown.Item>
                <NavDropdown.Item>Item 3</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown
                title={
                  <OverlayTrigger
                    trigger="hover"
                    placement="bottom"
                    overlay={<Tooltip id="overlay">Notifications</Tooltip>}
                  >
                    <FaBell />
                  </OverlayTrigger>
                }
                id="midR-dropdown"
                className="bg-light rounded-circle p-0 mr-2 mt-1 right-dropdown-group"
              >
                <NavDropdown.Item>Mid Right Item 1</NavDropdown.Item>
                <NavDropdown.Item>Item 2</NavDropdown.Item>
                <NavDropdown.Item>Item 3</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown
                title={
                  <OverlayTrigger
                    trigger="hover"
                    placement="bottom"
                    overlay={<Tooltip id="overlay">Account</Tooltip>}
                  >
                    <FaCaretDown />
                  </OverlayTrigger>
                }
                id="right-dropdown"
                className="bg-light rounded-circle p-0 mt-1 right-dropdown-group"
              >
                <NavDropdown.Item onClick={logout}>Sign-Out</NavDropdown.Item>
              </NavDropdown>
            </Navbar.Collapse>
          </Col>
        </Row>
      </Navbar>
    );
  };

  return <>{displayHeader()}</>;
};

export default connect(
  (state) => {
    return {
      isAuthenticated: state.auth.isAuthenticated,
    };
  },
  { logout, authenticate }
)(Header);

{
  /* <Nav.Link as={Link} to="/" >Home</Nav.Link> */
}
