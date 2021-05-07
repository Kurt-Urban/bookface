import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { onPhotoCardError } from "../../../../../functions/images";

import { Container, Image, Card, Row, Col, Nav } from "react-bootstrap";

const FriendsCard = ({ friends }) => {
  const [profileFriends, setProfileFriends] = useState([]);
  useEffect(() => {
    if (!friends) return;
    else setProfileFriends(friends.map((n) => n).reverse());
  }, [friends]);
  const displayFriendsCard = () => {
    if (!profileFriends) return <div></div>;
    return (
      <>
        <Card className="mb-3 photos-card">
          <Card.Title className="ml-1 mt-3 mb-0">
            <Nav className="mx-3">
              <Nav.Item className="mr-auto font-weight-bold">Friends</Nav.Item>
              <Nav.Item>
                <Link className="h6">See All Friends</Link>
              </Nav.Item>
            </Nav>
          </Card.Title>
          <Card.Body className="">
            <Container fluid className="photos-container">
              <Row className="top-row">
                {[0, 1, 2].map((n) => {
                  return (
                    <Col
                      className="p-1 photo-card-container"
                      key={profileFriends[n]}
                    >
                      <Image
                        fluid
                        src={`http://localhost:3001/images/${profileFriends[n]}`}
                        className="photo-list-img"
                        onError={(e) => onPhotoCardError(e)}
                      />
                    </Col>
                  );
                })}
              </Row>
              <Row>
                {[3, 4, 5].map((n) => {
                  if (!profileFriends[3]) return <div></div>;
                  return (
                    <Col
                      className="p-1 photo-card-container"
                      key={profileFriends[n]}
                    >
                      <Image
                        fluid
                        src={`http://localhost:3001/images/${profileFriends[n]}`}
                        className="photo-list-img"
                        onError={(e) => onPhotoCardError(e)}
                      />
                    </Col>
                  );
                })}
              </Row>
              <Row className="bottom-row">
                {[6, 7, 8].map((n) => {
                  if (!profileFriends[6]) return <div></div>;
                  return (
                    <Col
                      className="p-1 photo-card-container"
                      key={profileFriends[n]}
                    >
                      <Image
                        fluid
                        src={`http://localhost:3001/images/${profileFriends[n]}`}
                        className="photo-list-img"
                        onError={(e) => onPhotoCardError(e)}
                      />
                    </Col>
                  );
                })}
              </Row>
            </Container>
          </Card.Body>
        </Card>
      </>
    );
  };
  return <>{displayFriendsCard()}</>;
};

export default connect((state) => {
  return {
    friends: state.profile.friends,
  };
}, {})(FriendsCard);
