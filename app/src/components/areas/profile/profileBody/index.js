import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import uuid from "react-uuid";
import { submitPost } from "../../../../reduxStore/post";
import { authenticate } from "../../../../reduxStore/auth";

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
  FormLabel,
} from "react-bootstrap";

import { HiVideoCamera } from "react-icons/hi";
import { MdPhotoLibrary } from "react-icons/md";
import { IoFlagSharp } from "react-icons/io5";

import { onProfileImgError } from "../../../../functions/images";
import PhotosCard from "./photosCard";

const ProfileBody = ({
  authenticate,
  submitPost,
  userId,
  profileImg,
  firstName,
  lastName,
  profileId,
  currentProfileId,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [imgFile, setImgFile] = useState(null);
  const [imgName, setImgName] = useState(null);
  const [postValues, setPostValues] = useState({
    id: "",
    textPost: "",
    img: "",
    date: "",
    comments: [],
    likes: null,
  });

  useEffect(() => {
    authenticate();
  }, [authenticate, submitPost]);

  const handleModalHide = () => {
    setModalShow(false);
    setImgName(null);
  };

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
    setImgName(file.name);
  };
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setTimeout(() => {
      window.location.reload(1);
    }, 500);
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

  const displayCreatePost = () => {
    const urlProfileId = window.location.href.slice(30);
    if (urlProfileId !== currentProfileId) {
      return (
        <>
          <Card>Posts</Card>
        </>
      );
    }
    return (
      <>
        <Card className="post-card">
          <Card.Header className="bg-white post-card-header">
            <Form className="d-flex" method="/post" onSubmit={handlePostSubmit}>
              <Image
                src={`http://localhost:3001/images/${profileImg}`}
                className="post-profile-img mr-2"
                onError={(e) => onProfileImgError(e)}
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
                  className="shadow-none w-100 submit-btn"
                >
                  <HiVideoCamera style={{ color: "red", marginBottom: 2 }} /> Go
                  Live
                </Button>
              </Nav.Item>
              <Nav.Item className="post-card-body-item text-dark">
                <Button
                  variant="white"
                  className="shadow-none w-100 submit-btn"
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
                  className="shadow-none w-100 submit-btn"
                >
                  <IoFlagSharp style={{ color: "#39afd5", marginBottom: 2 }} />{" "}
                  Life Event
                </Button>
              </Nav.Item>
            </Nav>
          </Card.Body>
        </Card>
      </>
    );
  };

  return (
    <>
      <Modal
        show={modalShow}
        onHide={() => handleModalHide()}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="post-modal px-5"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" className="ml-auto">
            Create Post
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handlePostSubmit}>
            <Nav className="mb-2">
              <Nav.Item>
                <Image
                  src={`http://localhost:3001/images/${profileImg}`}
                  alt="Not Found"
                  className="post-profile-img"
                />
              </Nav.Item>
              <Nav.Item className="font-weight-bold font-size-sm ml-1">
                {firstName + " " + lastName}
              </Nav.Item>
            </Nav>
            <FormControl
              onChange={(e) => handleTextChange(e)}
              className="mb-2 shadow-none border-0 px-0 text-area"
              as="textarea"
              placeholder="What's on your mind?"
            />
            <FormControl
              type="file"
              id="file"
              name="selectedImg"
              onChange={handleFileChange}
              className="mb-2 d-none"
            />{" "}
            <Nav className="justify-content-center align-items-center">
              <FormLabel for="file" className="mb-3 file-label">
                <MdPhotoLibrary style={{ color: "#45bd62", marginBottom: 3 }} />{" "}
                {imgName === null ? "Add a Photo..." : imgName}
              </FormLabel>
            </Nav>
            <Button
              type="submit"
              variant="info"
              block
              onClick={() => handleModalHide()}
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Container fluid className="p-0 mt-3 profile-body-container">
        <Row className="justify-content-center">
          <Col xs={10} md={8} lg={3} className="photo-list">
            <PhotosCard />
          </Col>
          <Col xs={10} md={8} lg={5}>
            {displayCreatePost()}
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
      currentProfileId: state.auth.user.profileId,
      profileId: state.profile.profileId,
      profileImg: state.profile.profileImg,
      firstName: state.profile.firstName,
      lastName: state.profile.lastName,
    };
  },
  { submitPost, authenticate }
)(ProfileBody);
