import React from "react";

import "./sidebar.scss";
import { Nav, Container } from "react-bootstrap";

const Sidebar = () => {
  return (
    <>
      <Container id="sidebar" className="d-none d-sm-none d-md-block">
        <Nav className="flex-column pt-3">
          <Nav.Item>
            <Nav.Link>Item 1</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-1">Item 2</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2">Item 3</Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    </>
  );
};

export default Sidebar;
