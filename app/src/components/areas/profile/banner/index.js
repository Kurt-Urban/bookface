import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  onProfileImgError,
  onBannerImgError,
} from "../../../../functions/images";
import {
  cancelFriendReq,
  sendFriendReq,
  acceptRequest,
} from "../../../../reduxStore/profile";

import "./banner.scss";
import {
  Container,
  Image,
  Row,
  Col,
  Navbar,
  Nav,
  Button,
  NavDropdown,
} from "react-bootstrap";
import { FaPencilAlt } from "react-icons/fa";

const Banner = ({
  acceptRequest,
  sendFriendReq,
  cancelFriendReq,
  bannerImg,
  profileImg,
  firstName,
  lastName,
  profileId,
  sentRequests,
  friendRequests,
  userProfileId,
  userFirstName,
  userLastName,
  userProfileImg,
  userFriends,
}) => {
  const [cancelText, setCancelText] = useState("Request Sent");
  const [sentRequest, setSentRequest] = useState(null);

  useEffect(() => {
    if (sentRequests.some((e) => e.receivingId === profileId)) {
      setSentRequest(true);
    }
  }, [sentRequests, profileId, setSentRequest]);

  const friendRequestData = {
    sender: {
      senderId: userProfileId,
      firstName: userFirstName,
      lastName: userLastName,
      profileImg: userProfileImg,
    },
    recipient: { receivingId: profileId, firstName, lastName, profileImg },
  };
  const accepterData = {
    accepter: {
      profileId: userProfileId,
      firstName: userFirstName,
      lastName: userLastName,
      profileImg: userProfileImg,
    },
    sender: { profileId, firstName, lastName, profileImg },
  };

  const displayFriendReqBtn = () => {
    const handleSendClick = () => {
      sendFriendReq(friendRequestData);
      setSentRequest(true);
    };
    const handleCancelClick = () => {
      cancelFriendReq(friendRequestData);
      setSentRequest(false);
    };
    if (profileId === userProfileId) return;
    if (userFriends.some((e) => e.profileId === profileId)) {
      return (
        <Nav.Item className="mr-2">
          <Button
            className="shadow-none"
            variant="light"
            onClick={() => console.log("add friend removal")}
          >
            Friends
          </Button>
        </Nav.Item>
      );
    }
    if (friendRequests.some((e) => e.senderId === profileId)) {
      return (
        <Nav.Item className="mr-2">
          <Button
            className="shadow-none"
            variant="info"
            onClick={() => acceptRequest(accepterData)}
          >
            Accept Request
          </Button>
        </Nav.Item>
      );
    }
    if (sentRequest) {
      return (
        <Nav.Item className="mr-2">
          <Button
            className="shadow-none"
            variant="info"
            onClick={handleCancelClick}
            onMouseEnter={() => setCancelText("Cancel Request?")}
            onMouseLeave={() => setCancelText("Request Sent")}
          >
            {cancelText}
          </Button>
        </Nav.Item>
      );
    }
    return (
      <Nav.Item className="mr-2">
        <Button
          className="shadow-none"
          variant="info"
          onClick={handleSendClick}
        >
          Add Friend
        </Button>
      </Nav.Item>
    );
  };
  return (
    <>
      <Container className="bg-white p-0 header shadow" fluid>
        <Row xs={8} className="justify-content-center">
          <Col xs={8} className="banner-img-container">
            <Image
              src={`http://localhost:3001/images/${bannerImg}`}
              className="banner-img"
              onError={(e) => onBannerImgError(e)}
            />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col
            xs={8}
            className="d-flex profile-img-container justify-content-center"
          >
            <Image
              src={`http://localhost:3001/images/${profileImg}`}
              alt="Not Found"
              className="profile-img"
              onError={(e) => onProfileImgError(e)}
            />
            <h3 className="d-block font-weight-bold mt-2 pb-0">
              {firstName + " " + lastName}
            </h3>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={10} md={8}>
            <Navbar className="border-top mt-4 navbar">
              <Nav className="mr-auto d-none d-md-flex font-weight-bold">
                <Nav.Item>
                  <Nav.Link className="mr-2">Posts</Nav.Link>
                </Nav.Item>
                <Nav.Item className="mr-2">
                  <Nav.Link>About</Nav.Link>
                </Nav.Item>
                <Nav.Item className="mr-2">
                  <Nav.Link>Friends</Nav.Link>
                </Nav.Item>
                <Nav.Item className="mr-2">
                  <Nav.Link>Photos</Nav.Link>
                </Nav.Item>
              </Nav>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto d-md-none">
                  <Nav.Item>
                    <NavDropdown title="More">
                      <NavDropdown.Item>
                        <Nav.Link>Posts</Nav.Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Nav.Link>About</Nav.Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Nav.Link>Friends</Nav.Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Nav.Link>Photos</Nav.Link>
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav.Item>
                </Nav>
              </Navbar.Collapse>
              <Nav>
                {displayFriendReqBtn()}
                <Nav.Item>
                  <Button variant="light" className="">
                    <FaPencilAlt /> Edit Profile
                  </Button>
                </Nav.Item>
              </Nav>
            </Navbar>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default connect(
  (state) => {
    return {
      userProfileId: state.auth.user.profileId,
      sentRequests: state.auth.user.sentRequests,
      friendRequests: state.auth.user.friendRequests,
      userFirstName: state.auth.user.firstName,
      userLastName: state.auth.user.lastName,
      userProfileImg: state.auth.user.profileImg,
      userFriends: state.auth.user.friends,
      profileId: state.profile.profileId,
      bannerImg: state.profile.bannerImg,
      profileImg: state.profile.profileImg,
      firstName: state.profile.firstName,
      lastName: state.profile.lastName,
    };
  },
  { sendFriendReq, cancelFriendReq, acceptRequest }
)(Banner);
