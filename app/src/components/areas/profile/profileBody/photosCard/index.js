import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { onPhotoCardError } from "../../../../../functions/images";

import "./photosCard.scss";
import {
  Modal,
  Container,
  Image,
  Card,
  Row,
  Col,
  Nav,
  Button,
  Form,
  FormControl,
  FormLabel,
} from "react-bootstrap";

const PhotosCard = ({ photos }) => {
  const [profilePhotos, setProfilePhotos] = useState([]);
  useEffect(() => {
    if (!photos) return;
    else setProfilePhotos(photos.map((n) => n).reverse());
  }, [photos]);
  const displayPhotosCard = () => {
    if (!profilePhotos) return <div></div>;
    return (
      <>
        <Card className="mb-3 photos-card">
          <Card.Title className="ml-1 mt-3 mb-0">
            <Nav className="mx-3">
              <Nav.Item className="mr-auto font-weight-bold">Photos</Nav.Item>
              <Nav.Item>
                <Link className="h6">See All Photos</Link>
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
                      key={profilePhotos[n]}
                    >
                      <Image
                        fluid
                        src={`http://localhost:3001/images/${profilePhotos[n]}`}
                        className="photo-list-img"
                        onError={(e) => onPhotoCardError(e)}
                      />
                    </Col>
                  );
                })}
              </Row>
              <Row>
                {[3, 4, 5].map((n) => {
                  if (!profilePhotos[3]) return <div></div>;
                  return (
                    <Col
                      className="p-1 photo-card-container"
                      key={profilePhotos[n]}
                    >
                      <Image
                        fluid
                        src={`http://localhost:3001/images/${profilePhotos[n]}`}
                        className="photo-list-img"
                        onError={(e) => onPhotoCardError(e)}
                      />
                    </Col>
                  );
                })}
              </Row>
              <Row className="bottom-row">
                {[6, 7, 8].map((n) => {
                  if (!profilePhotos[6]) return <div></div>;
                  return (
                    <Col
                      className="p-1 photo-card-container"
                      key={profilePhotos[n]}
                    >
                      <Image
                        fluid
                        src={`http://localhost:3001/images/${profilePhotos[n]}`}
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
  return <>{displayPhotosCard()}</>;
};

export default connect((state) => {
  return {
    photos: state.profile.photos,
  };
}, {})(PhotosCard);
