import React, { useState } from "react";

import Button from "@material-ui/core/Button";
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

export default function NewComment(props) {
  const classes = useStyles();
  const [body, setBody] = useState("");
  const { post } = props;

  const comment = async (e, postId) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (token) {
      const url = `${process.env.REACT_APP_API_URL}/posts/${postId}/comments`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        },
        body: JSON.stringify({
          body: body
        })
      });
      if (response.ok) {
        const data = await response.json();
        if (data.code === 200) {
          setBody("");
          props.getComments(post.id);
          notify("Info", `Created new comment`, "success");
        }
      }
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <div className={classes.paper}>
        <form className={classes.form} noValidate>
          <TextField
            id="post"
            label="New comment"
            multiline
            fullWidth
            rows="2"
            value={body}
            variant="outlined"
            onChange={e => {
              setBody(e.target.value);
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={e => {
              comment(e, post.id);
            }}
          >
            Send
          </Button>
        </form>
      </div>
    </Container>
  );
}
