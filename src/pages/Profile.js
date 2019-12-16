import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { useParams } from "react-router-dom";
import notify from "./../utils/Notification";

export default function Profile(props) {
  const { user } = props;
  const { id } = useParams();
  const [profile, setProfile] = useState();

  const getProfile = async id => {
    const url = `${process.env.REACT_APP_API_URL}/user/profile/${id}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`
      }
    });
    const data = await response.json();
    setProfile(data.user);
  };

  const follow = async () => {
    const url = `${process.env.REACT_APP_API_URL}/user/follow/${id}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`
      }
    });
    const data = await response.json();
    if (data.code === 200) {
      notify("Info", `You are following ${profile.email} `);
      getProfile(id);
    }
  };

  const unfollow = async () => {
    const url = `${process.env.REACT_APP_API_URL}/user/unfollow/${id}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`
      }
    });
    const data = await response.json();
    if (data.code === 200) {
      notify("Info", `You are not following  ${profile.email} `);
      getProfile(id);
    }
  };

  useEffect(
    () => {
      getProfile(id);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [id]
  );

  return (
    <div className="profile-img-details" style={{ marginTop: "120px" }}>
      <div className="title-img-profile-left">
        <h2>
          <strong>Let's share something to other people now</strong>
        </h2>
        <img
          src="https://s8.upanh.pro/2019/12/15/profile-bcg.png"
          alt="..."
          className="profile-img-left"
        />;
      </div>
      <Container component="main" maxWidth="xs" className="profile-details">
        <div className="avatar-email-names-profile">
          <Avatar
            alt="Remy Sharp"
            src={profile && profile.avatar}
            className="avatar-profile"
          />
          {user.id != id &&
            <i>
              {profile && profile.isFollowing
                ? <Button onClick={unfollow} className="follow-btn-profile">
                    UnFollow
                  </Button>
                : <Button onClick={follow} className="follow-btn-profile">
                    Follow
                  </Button>}
            </i>}
          <h6 style={{ color: "#8A949C" }}>
            <strong>Email</strong>
          </h6>
          <h5 style={{ color: "#02233A" }}>
            {profile && profile.email}
          </h5>
          <hr />
          <h6 style={{ color: "#8A949C" }}>
            <strong>Fistname</strong>
          </h6>
          <h5 style={{ color: "#02233A" }}>
            {profile && profile.firstname}
          </h5>

          <hr />
          <h6 style={{ color: "#8A949C" }}>
            <strong>Lastname</strong>
          </h6>
          <h5 style={{ color: "#02233A" }}>
            {profile && profile.lastname}
          </h5>
          <hr />
        </div>
      </Container>
    </div>
  );
}
