import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import EditPost from "./EditPost";
import NewComment from "./NewComment";
import Comment from "./Comment";
import Avatar from "@material-ui/core/Avatar";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}));

export default function Post(props) {
  const classes = useStyles();
  const { post } = props;
  const [isLike, setIsLike] = useState(post.isLiked);
  const [open, setOpen] = React.useState(false);
  const [comments, setComments] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const edit = (event, id) => {
    event.preventDefault();
    setOpen(true);
  };

  const deletePost = async (e, id) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (token) {
      const url = `${process.env.REACT_APP_API_URL}/posts/${id}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        }
      });
      if (response.ok) {
        console.log("RES", response);

        const data = await response.json();
        if (data.code === 200) {
          props.getPosts();
        }
      }
    }
  };

  const like = async (event, id) => {
    event.preventDefault();
    const url = `${process.env.REACT_APP_API_URL}/posts/${id}/like`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`
      }
    });
    const data = await response.json();
    if (data.status) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  };

  const getComments = async postId => {
    const token = localStorage.getItem("token");
    if (token) {
      const url = `${process.env.REACT_APP_API_URL}/posts/${postId}/comments/`;
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        }
      });
      const data = await response.json();
      setComments(data);
    }
  };

  return (
    <div className="img-newpost">
      <img
        className="home-img-left"
        alt="..."
        src="https://s2.upanh.pro/2019/12/15/bcg-01.png"
      />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <EditPost
              post={props.post}
              getPosts={props.getPosts}
              handleClose={handleClose}
            />
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Container>
        <div className="row d-flex justify-content-around post">
          <div className="text-left">
            <div className="card shadow-sm ">
              <div className="card-body">
                <div className="avatar-email-head-post">
                  <Link to={`/profile/${post.author.id}`}>
                    <Avatar alt="..." src={post.author.avatar} />
                  </Link>
                  <p className="email-head-post">
                    {post && post.author.firstname}
                  </p>
                </div>

                {post.imgUrl &&
                  <div>
                    <hr />
                    <img className="post-img" alt="..." src={post.imgUrl} />
                    <hr />
                  </div>}

                <div className="body-text-post">
                  <p className="card-text">
                    {post && post.body}
                  </p>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">
                    <Moment add={{ hours: 16 }} fromNow>
                      {post && post.created_at}
                    </Moment>
                  </small>
                  <div className="btn-group">
                    {post.author.id === props.user.id &&
                      <span>
                        <button
                          onClick={event => {
                            deletePost(event, post.id);
                          }}
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                        >
                          Delete
                        </button>
                        <button
                          onClick={event => edit(event, post.id)}
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                        >
                          Edit
                        </button>
                      </span>}
                    <button
                      type="button"
                      onClick={e => {
                        like(e, post.id);
                      }}
                      className="btn btn-sm btn-outline-secondary"
                    >
                      {isLike ? "Unlike" : "Like"}
                    </button>
                  </div>
                </div>
              </div>
              <ExpansionPanel onChange={() => getComments(post.id)}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>
                    {post.commentCount > 0 && post.commentCount} Comments...
                  </Typography>
                </ExpansionPanelSummary>
                <NewComment post={post} getComments={getComments} />
                <ExpansionPanelDetails>
                  <List className={classes.root}>
                    {comments &&
                      comments.reverse().map(comment => {
                        return (
                          <div key={comment.id}>
                            <Comment comment={comment} user={props.user} />
                            <Divider />
                          </div>
                        );
                      })}
                  </List>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </div>
          </div>
        </div>
      </Container>
      <img
        className="home-img-right"
        alt="..."
        src="https://s8.upanh.pro/2019/12/15/bcg-3.png"
      />
    </div>
  );
}
