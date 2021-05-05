import React, { useEffect } from "react";
import { connect } from "react-redux";

import { fetchUsers } from "../../../../reduxStore/users";
import { fetchUser } from "../../../../reduxStore/profile";

import { Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { onImgError } from "../../../../functions/images/onImgError";

const DashboardBody = ({ fetchUsers, users, fetchUser }) => {
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <>
      {users.map((user, index) => (
        <Container key={index}>
          <Link
            to={`/profile/${user.profileId}`}
            onClick={() => fetchUser(user.profileId)}
          >
            <Image
              src={`http://localhost:3001/images/${user.profileImg}`}
              alt="Not Found"
              className="profile-thumbnail"
              onError={(e) => onImgError(e)}
            />
          </Link>
        </Container>
      ))}
    </>
  );
};

export default connect(
  (state) => {
    return { users: state.users };
  },
  { fetchUsers, fetchUser }
)(DashboardBody);
