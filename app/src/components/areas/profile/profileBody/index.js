import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import uuid from "react-uuid";
import { submitPost, fetchPosts } from "../../../../reduxStore/post";

import PostCard from "./postCard";

import "./profilebody.scss";
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
} from "react-bootstrap";

import { HiVideoCamera } from "react-icons/hi";
import { MdPhotoLibrary } from "react-icons/md";
import { IoFlagSharp } from "react-icons/io5";

const ProfileBody = ({ userId, submitPost, fetchPosts }) => {
  const [modalShow, setModalShow] = useState(false);
  const [imgFile, setImgFile] = useState(null);
  const [postValues, setPostValues] = useState({
    id: "",
    textPost: "",
    img: "",
    date: "",
  });

  useEffect(() => {
    fetchPosts(userId);
    console.log("Fetching");
  }, []);

  const handleTextChange = (event) => {
    const value = event.target.value;
    setPostValues((prevState) => {
      prevState.textPost = value;
      return prevState;
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImgFile(file);
  };
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const postId = uuid();
    await setPostValues((prevState) => {
      prevState.id = postId;
      return prevState;
    });
    const data = new FormData();
    data.append("imageFile", imgFile);
    data.append("post", JSON.stringify(postValues));
    data.append("userId", userId);
    submitPost(data);
  };

  return (
    <>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create Post
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handlePostSubmit}>
            <Nav className="mb-2">
              <Nav.Item>Image</Nav.Item>
              <Nav.Item className="font-weight-bold font-size-sm ml-1">
                Kurt Urban
              </Nav.Item>
            </Nav>
            <FormControl
              onChange={(e) => handleTextChange(e)}
              className="mb-2"
            />
            <FormControl
              type="file"
              name="selectedImg"
              onChange={handleFileChange}
            />
            <Button
              type="submit"
              variant="info"
              block
              onClick={() => setModalShow(false)}
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Container fluid className="p-0 mt-3 profile-body-container">
        <Row className="justify-content-center d-flex">
          <Col xs={8} sm={3} className="photo-list">
            <Card>Photos</Card>
          </Col>
          <Col xs={8} sm={4} className="create-post">
            <Card className="post-card">
              <Card.Header className="bg-white post-card-header">
                <Form className="d-flex" onSubmit={handlePostSubmit}>
                  <Image
                    src={`http://localhost:3001/images/${"1619980030154-profileImg.jpg"}`}
                    alt="profileImg"
                    roundedCircle
                    style={{ maxWidth: 38, marginRight: 10 }}
                  />
                  <FormControl
                    placeholder="What's on your mind?"
                    className="post-input border-0 bg-light shadow-none"
                    onChange={(e) => handleTextChange(e)}
                  />
                </Form>
              </Card.Header>
              <Card.Body className="py-3">
                <Nav fill>
                  <Nav.Item className="post-card-body-item text-dark">
                    <Button
                      variant="white"
                      className="shadow-none w-100 post-btn"
                    >
                      <HiVideoCamera
                        style={{ color: "red", marginBottom: 2 }}
                      />{" "}
                      Go Live
                    </Button>
                  </Nav.Item>
                  <Nav.Item className="post-card-body-item text-dark">
                    <Button
                      variant="white"
                      className="shadow-none w-100 post-btn"
                      onClick={() => setModalShow(true)}
                    >
                      <MdPhotoLibrary
                        style={{ color: "#45bd62", marginBottom: 2 }}
                      />{" "}
                      Photo/Video
                    </Button>
                  </Nav.Item>
                  <Nav.Item className="post-card-body-item text-dark">
                    <Button
                      variant="white"
                      className="shadow-none w-100 post-btn"
                    >
                      <IoFlagSharp
                        style={{ color: "#39afd5", marginBottom: 2 }}
                      />{" "}
                      Life Event
                    </Button>
                  </Nav.Item>
                </Nav>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="justify-content-center d-flex">
          <Col xs={3}></Col>
          <Col xs={4}>
            <PostCard />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default connect(
  (state) => {
    return {
      userId: state.auth.user._id,
    };
  },
  { submitPost, fetchPosts }
)(ProfileBody);
