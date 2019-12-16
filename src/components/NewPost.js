import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import notify from "./../utils/Notification";
import { uploadFile } from "react-s3";

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

export default function NewPost(props) {
  const classes = useStyles();
  const [body, setBody] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const config = {
    bucketName: "fakebook-fs",
    dirName: "fakebook" /* optional */,
    region: "us-west-2",
    accessKeyId: `${process.env.REACT_APP_CLIENT}`,
    secretAccessKey: `${process.env.REACT_APP_KEY1}+${process.env
      .REACT_APP_KEY2}`
  };

  const post = async s3URL => {
    const token = localStorage.getItem("token");
    if (token) {
      const url = `${process.env.REACT_APP_API_URL}/posts/`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        },
        body: JSON.stringify({
          body: body,
          image_url: s3URL
        })
      });
      if (response.ok) {
        const data = await response.json();
        if (data.code === 200) {
          setBody("");
          setUploading(false);
          props.handleClose();
          props.getPosts();
          notify("Info", `Created new post`, "success");
        }
      }
    }
  };

  const uploadHandler = e => {
    e.preventDefault();
    setUploading(true);
    console.log(config);
    if (file) {
      uploadFile(file, config)
        .then(data => {
          console.log("URL", data.location);
          setImageUrl(data.location);
          post(data.location);
        })
        .catch(err => console.error(err));
    } else {
      post("");
    }
  };

  const onChangeHandler = e => {
    setFile(e.target.files[0]);
  };

  console.log(file);
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            New post
          </Typography>
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
            {/* <TextField
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
            /> */}
            <input
              accept="image/*"
              className={classes.input}
              style={{ display: "none" }}
              id="raised-button-file"
              multiple
              type="file"
              onChange={e => onChangeHandler(e)}
            />
            <label htmlFor="raised-button-file">
              <Button
                variant="raised"
                component="span"
                fullWidth
                className="upload-btn"
              >
                + Upload image
              </Button>
            </label>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={uploadHandler}
            >
              {uploading ? "Please wait..." : "Post"}
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}
