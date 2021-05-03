import React from "react";
import { connect } from "react-redux";

import "./postcard.scss";
import {
  Container,
  Image,
  Card,
  Row,
  Col,
  Nav,
  Dropdown,
  Button,
  Form,
  FormControl,
} from "react-bootstrap";
import { AiOutlineLike } from "react-icons/ai";
import { BiShare } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { FaRegCommentAlt } from "react-icons/fa";

const PostCard = ({ posts, profileImg, firstName, lastName }) => {
  const userPosts = posts.map((n) => n).reverse();

  const displayPostImg = (postImg) => {
    if (postImg !== "") {
      return <Image fluid src={`http://localhost:3001/images/${postImg}`} />;
    }
    return;
  };
  return (
    <>
      {userPosts.map((post, index) => {
        return (
          <Container key={index} className="p-0 mt-3">
            <Card className="post-card">
              <Card.Header className="post-card-header pb-0 mb-0 bg-white border-bottom-0">
                <Container className="">
                  <Row className="">
                    <Col xs={1} className=" pl-0 mr-3">
                      <Image
                        src={`http://localhost:3001/images/${profileImg}`}
                        alt="Not Found"
                        roundedCircle
                        style={{ maxWidth: 38, marginRight: 10 }}
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
                      <Dropdown title="">
                        <BsThreeDots />
                      </Dropdown>
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
                <Row>{displayPostImg(post.img)}</Row>
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
        );
      })}
    </>
  );
};

export default connect((state) => {
  return {
    posts: state.auth.user.posts,
    profileImg: state.auth.user.profileImg,
    firstName: state.auth.user.firstName,
    lastName: state.auth.user.lastName,
  };
})(PostCard);
