import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AsyncSelect from "react-select/async";

import "./header.scss";
import { Navbar, Nav, Image, NavDropdown, Row, Col } from "react-bootstrap";
import {
  FaSearch,
  FaHome,
  FaTv,
  FaStoreAlt,
  FaUsers,
  FaGamepad,
} from "react-icons/fa";

import SignIn from "../../areas/signIn";
import { authenticate, logout } from "../../../reduxStore/auth";

const Header = ({ isAuthenticated, logout, authenticate }) => {
  const displayHeader = () => {
    if (!isAuthenticated) {
      return <div></div>;
    }
    return (
      <Navbar bg="white" fixed="top">
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
            <Navbar.Collapse
              className="bg-light rounded-pill text-placeholder"
              id="basic-navbar-nav"
              style={{ height: 35, maxWidth: 250, minWidth: 100 }}
            >
              <NavDropdown
                title={<FaSearch className="text-placeholder" />}
                id="search"
                className="pb-1"
              ></NavDropdown>
              Search Bookface
            </Navbar.Collapse>
          </Col>
          <Col
            xs={6}
            className="d-flex align-items-center justify-content-center"
          >
            <Nav className="text-primary">
              <Nav.Item className="h3 px-4">
                <FaHome />
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
              <NavDropdown alignRight className="bg-white rounded-circle p-0">
                <NavDropdown.Item onClick={logout}>Sign-Out</NavDropdown.Item>
                <NavDropdown.Item onClick={authenticate}>Test</NavDropdown.Item>
              </NavDropdown>
            </Navbar.Collapse>
          </Col>
        </Row>
      </Navbar>
    );
  };

  return (
    <>
      {displayHeader()}
      <SignIn />
    </>
  );
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
