import React, { useEffect } from "react";
import { connect } from "react-redux";

import Header from "../../templates/header";
import Banner from "./banner";
import ProfileBody from "./profileBody";

import { clearUser, fetchUser } from "../../../reduxStore/profile";

const Profile = ({ fetchUser, clearUser }) => {
  useEffect(() => {
    const profileId = window.location.href.slice(30);
    fetchUser(profileId);
    return () => {
      clearUser();
    };
  }, []);
  return (
    <>
      <Header />
      <Banner />
      <ProfileBody />
    </>
  );
};

export default connect(null, { fetchUser, clearUser })(Profile);
