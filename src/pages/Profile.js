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
    <Container component="main" maxWidth="xs">
      <Avatar alt="Remy Sharp" src={profile && profile.avatar} />
      Email: {profile && profile.email}
      <br />
      Fistname: {profile && profile.firstname}
      <br />
      Lastname: {profile && profile.lastname}
      <br />
      {user.id != id &&
        <i>
          {profile && profile.isFollowing
            ? <Button onClick={unfollow}>UnFollow</Button>
            : <Button onClick={follow}>Follow</Button>}
        </i>}
    </Container>
  );
}
