import React from "react";

import { Spinner, Image, Nav } from "react-bootstrap";

const LoadingScreen = () => {
  return (
    <div>
      <Nav className="flex-column justify-content-center align-items-center bg-light">
        <Nav.Item className="my-5">
          <Image
            src="https://i.imgur.com/nn2j8nS.png"
            alt="logo"
            roundedCircle
            style={{ height: 125 }}
          />
        </Nav.Item>
        <Nav.Item>
          <Spinner
            animation="border"
            variant="primary"
            className="justify-content-center"
          />
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default LoadingScreen;
