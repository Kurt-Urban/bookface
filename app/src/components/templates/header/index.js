import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./header.scss";
import {
  Button,
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

import { logout } from "../../../reduxStore/auth";
import profile, { fetchUser } from "../../../reduxStore/profile";

const Header = ({
  isAuthenticated,
  logout,
  fetchUser,
  id,
  profileImg,
  firstName,
  profileId,
}) => {
  const [hover, setHover] = useState(false);

  const handleHover = () => setHover(!hover);

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
            <Navbar.Brand
              id="brand"
              onMouseEnter={handleHover}
              onMouseLeave={handleHover}
            >
              <Image
                className={hover ? "dumbspinner" : ""}
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
            <Nav className="text-primary d-none d-md-flex">
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
          <Col xs={3} className="d-flex justify-content-center">
            <Navbar.Collapse className="justify-content-end">
              <Button
                as={Link}
                className={`mr-2 m1-1 border-0 shadow-none rounded-pill d-flex justify-content-center ${
                  window.location.href.slice(30) === profileId
                    ? "profile-btn-alt"
                    : "profile-btn"
                } `}
                to={`/profile/${profileId}`}
                onClick={() => fetchUser(profileId)}
              >
                <Image
                  src={`http://localhost:3001/images/${profileImg}`}
                  className="mr-1 profile-thumbnail"
                />{" "}
                <Nav className="align-items-center">{firstName}</Nav>
              </Button>
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
                className="bg-light d-none d-lg-flex rounded-circle p-0 mr-2 mt-1 right-dropdown-group"
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
                className="bg-light d-none d-lg-flex rounded-circle p-0 mr-2 mt-1 right-dropdown-group"
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
                className="bg-light d-none d-lg-flex rounded-circle p-0 mr-2 mt-1 right-dropdown-group"
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
                <NavDropdown.Item
                  onClick={() => console.log(window.location.href.slice(30))}
                >
                  Test
                </NavDropdown.Item>
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
      id: state.auth.user._id,
      profileImg: state.auth.user.profileImg,
      firstName: state.auth.user.firstName,
      profileId: state.auth.user.profileId,
    };
  },
  { logout, fetchUser }
)(Header);
