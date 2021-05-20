import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import "./postcard.scss";
import {
  Container,
  Image,
  Card,
  Row,
  Col,
  Dropdown,
  Button,
  DropdownButton,
  Modal,
  Form,
  FormControl,
} from "react-bootstrap";
import { AiOutlineLike } from "react-icons/ai";
import { BiShare } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { FaRegCommentAlt } from "react-icons/fa";
import { MdClose } from "react-icons/md";

import { onProfileImgError } from "../../../../../functions/images";
import { deletePost, editPost } from "../../../../../reduxStore/post";

const PostCard = ({
  posts,
  profileImg,
  profileId,
  userId,
  firstName,
  lastName,
  deletePost,
  editPost,
}) => {
  const [userPosts, setUserPosts] = useState([]);
  const [show, setShow] = useState(false);
  const [focusedPost, setFocusedPost] = useState({});
  const [postImg, setPostImg] = useState(true);
  const [editedPost, setEditedPost] = useState({});

  const handleClose = () => {
    setPostImg(true);
    setFocusedPost({});
    setEditedPost({});
    setShow(false);
  };
  const handleShow = (post) => {
    setFocusedPost(post);
    setEditedPost(post);
    setShow(true);
  };

  const handleSubmit = () => {
    editPost(editedPost);
    handleClose();
    window.location.reload();
  };
  const handlePostEdit = (e) => {
    setEditedPost((prevState) => ({ ...prevState, textPost: e.target.value }));
  };

  const removePostImg = () => {
    setEditedPost((prevState) => ({ ...prevState, img: "" }));
    setPostImg(false);
  };

  const displayModal = ({ id, img, textPost, date }) => {
    if (!focusedPost.date) return;
    return (
      <>
        <Modal size="lg" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="font-weight-bold ml-auto">
              Edit Post
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-3">
            <Container>
              <Row>
                <Col xs={1} className="pl-0 mr-3">
                  <Image
                    src={`http://localhost:3001/images/${profileImg}`}
                    className="post-profile-thumbnail"
                    onError={(e) => onProfileImgError(e)}
                  />
                </Col>
                <Col className="pl-0 ">
                  <div className="post-name">{firstName + " " + lastName}</div>
                  <div className="post-date">
                    {`${date.slice(3, 10)} at ${date.slice(15, 21)}`}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className="p-0 mt-2">
                  <FormControl
                    className="border-0 shadow-none pl-0"
                    defaultValue={textPost}
                    placeholder="What's on your mind?"
                    onChange={(e) => handlePostEdit(e)}
                  />
                </Col>
              </Row>
            </Container>
            <Container className="m-0 p-0 position-relative d-flex justify-content-end">
              <Button
                variant="light"
                className={`rounded-circle shadow-none pt-0 px-2 position-absolute mt-3 mr-2 ${
                  postImg ? "" : "d-none"
                }`}
                style={{ opacity: 0.8 }}
                onClick={removePostImg}
              >
                <MdClose />
              </Button>
              <Image
                fluid
                rounded
                className={`mt-2 ${postImg ? "" : "d-none"}`}
                src={`http://localhost:3001/images/${img}`}
              />
            </Container>
            <Button
              block
              variant="info"
              className="mt-3"
              onClick={handleSubmit}
            >
              Save
            </Button>
          </Modal.Body>
        </Modal>
      </>
    );
  };

  useEffect(() => {
    if (!posts) return;
    else setUserPosts(posts.map((n) => n).reverse());
  }, [posts]);

  const displayPostImg = (postImg) => {
    if (postImg !== "") {
      return <Image fluid src={`http://localhost:3001/images/${postImg}`} />;
    }
    return;
  };

  const displayPostMenu = (post) => {
    if (profileId !== userId) return <div></div>;
    return (
      <DropdownButton
        title={
          <BsThreeDots style={{ fontSize: "1.5rem" }} className="text-dark" />
        }
        id="post-menu"
        className="border-0"
        variant="white"
        menuAlign="right"
      >
        <Dropdown.Item onClick={() => handleShow(post)}>Edit</Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            deletePost([post.id, post.img]);
            window.location.reload(1);
          }}
        >
          Delete
        </Dropdown.Item>
      </DropdownButton>
    );
  };

  const displayPost = () => {
    if (!userPosts) return <div></div>;
    return userPosts.map((post, index) => {
      return (
        <>
          <Container key={index} className="p-0 mt-3">
            <Card className="post-card">
              <Card.Header className="post-card-header pb-0 mb-0 bg-white border-bottom-0">
                <Container>
                  <Row>
                    <Col xs={1} className="pl-0 mr-3">
                      <Image
                        src={`http://localhost:3001/images/${profileImg}`}
                        className="post-profile-thumbnail"
                        onError={(e) => onProfileImgError(e)}
                      />
                    </Col>
                    <Col className="pl-0 ">
                      <div className="post-name">
                        {firstName + " " + lastName}
                      </div>
                      <div className="post-date">
                        {`${post.date.slice(3, 10)} at ${post.date.slice(
                          15,
                          21
                        )}`}
                      </div>
                    </Col>
                    <Col className="post-date d-flex justify-content-end pt-1">
                      {displayPostMenu(post)}
                    </Col>
                  </Row>
                </Container>
              </Card.Header>
              <Card.Body className="pt-0 post-body">
                <Row className="mt-1">
                  <Col
                    className={`py-2 ${
                      post.textPost.length <= 50 ? "post-text-alt" : "post-text"
                    }`}
                  >
                    {post.textPost}
                  </Col>
                </Row>
                <Row className="mb-2 d-flex justify-content-center">
                  {displayPostImg(post.img)}
                </Row>
                <Row className="px-2 d-flex justify-content-center">
                  <Row className="d-flex p-1 w-100 align-items-center border border-grey border-right-0 border-left-0">
                    <Col className="px-0">
                      <Button
                        fluid
                        variant="white"
                        className="shadow-none font-weight-bold w-100 post-btn py-1"
                      >
                        <AiOutlineLike className="like-icon mr-1" /> Like
                      </Button>
                    </Col>
                    <Col className="px-1">
                      <Button
                        variant="white"
                        className="shadow-none font-weight-bold w-100 post-btn py-1"
                      >
                        <FaRegCommentAlt className="comment-icon mr-1" />{" "}
                        Comment
                      </Button>
                    </Col>
                    <Col className="px-0">
                      <Button
                        variant="white"
                        className="shadow-none font-weight-bold w-100 post-btn py-1"
                      >
                        <BiShare className="share-icon mr-1" /> Share
                      </Button>
                    </Col>
                  </Row>
                </Row>
              </Card.Body>
            </Card>
          </Container>
        </>
      );
    });
  };
  return (
    <>
      {displayPost()}
      {displayModal(focusedPost)}
    </>
  );
};

export default connect(
  (state) => {
    return {
      posts: state.profile.posts,
      userId: state.auth.user.profileId,
      profileId: state.profile.profileId,
      profileImg: state.profile.profileImg,
      firstName: state.profile.firstName,
      lastName: state.profile.lastName,
    };
  },
  { deletePost, editPost }
)(PostCard);
