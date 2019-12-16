/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import NewPost from "../components/NewPost";
import Post from "../components/Post";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import { positions } from "@material-ui/system";

export default function Home(props) {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const getPosts = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const url = `${process.env.REACT_APP_API_URL}/posts/`;
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        }
      });
      const data = await response.json();
      setPosts(data);
      console.log(data);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="body-home" style={{ marginTop: "120px" }}>
      <Button
        style={{
          marginTop: "100px",
          bottom: "20px",
          right: "20px",
          zIndex: "99",
          position: "fixed"
        }}
        className="new-post-btn"
        variant="contained"
        color="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        New post
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <NewPost getPosts={getPosts} handleClose={handleClose} />
        </DialogContent>
      </Dialog>
      {posts &&
        posts.map(post => {
          return (
            <Post
              post={post}
              key={post.id}
              getPosts={getPosts}
              user={props.user}
            />
          );
        })}
    </div>
  );
}
