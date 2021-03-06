import React from "react";
import { connect } from "react-redux";
import { onProfileImgError } from "../../../functions/images";

import { Button, Image, Row, Col, Container } from "react-bootstrap";

const MessageCard = ({ title, acceptable, img }) => {
  const displayBtns = () => {
    if (acceptable) {
      return (
        <p className="mb-0 mt-1">
          <Button variant="info" className="mr-2 py-1">
            Accept
          </Button>
          <Button variant="light" className="py-1">
            Decline
          </Button>
        </p>
      );
    }
  };
  return (
    <>
      <Container className="" fluid>
        <Row>
          <Col xs={2} className="p-0 pl-2">
            <Image
              src={`http://localhost:3001/images/${img}`}
              fluid
              style={{
                maxWidth: 56,
                minHeight: 56,
                objectFit: "cover",
                borderRadius: "50%",
              }}
              onError={(e) => onProfileImgError(e)}
            />
          </Col>
          <Col xs={8} className="text-wrap text-dark pl-4">
            {title} invited you to be their friend.
            {displayBtns()}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default connect(() => {
  return {};
}, {})(MessageCard);
