import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import notify from "../utils/Notification";

const useStyles = makeStyles(theme => ({
  paper: {
    // marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function EditPost(props) {
  const classes = useStyles();
  const [body, setBody] = useState(props.post.body);
  const [imageUrl, setImageUrl] = useState(props.post.imgUrl);

  const edit = async e => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (token) {
      const url = `${process.env.REACT_APP_API_URL}/posts/${props.post.id}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        },
        body: JSON.stringify({
          body: body,
          image_url: imageUrl
        })
      });
      if (response.ok) {
        const data = await response.json();
        if (data.code === 200) {
          setBody("");
          props.handleClose();
          notify("Info", `Updated`, "success");
          props.getPosts();
        }
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <form className={classes.form} noValidate>
          <TextField
            id="post"
            label="What's on your mind?"
            multiline
            fullWidth
            rows="4"
            value={body}
            variant="outlined"
            onChange={e => {
              setBody(e.target.value);
            }}
          />
          <TextField
            className="mt-2"
            id="image-url"
            label="Image URL"
            multiline
            fullWidth
            value={imageUrl}
            variant="outlined"
            onChange={e => {
              setImageUrl(e.target.value);
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={edit}
          >
            Edit
          </Button>
        </form>
      </div>
    </Container>
  );
}
