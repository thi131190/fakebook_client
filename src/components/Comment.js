import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: "700px",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  }
}));

export default function Comment(props) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={props.comment.commenter.avatar} />
        </ListItemAvatar>
        <ListItemText
          // primary="Brunch this weekend?"
          secondary={
            <React.Fragment>
              <div className="d-flex justify-content-between">
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {props.comment.commenter.firstname}
                </Typography>
                <small
                  component="span"
                  variant="body2"
                  // className={classes.inline}
                  className="date-comment"
                  color="textPrimary"
                >
                  {props.comment.created_at}
                </small>
              </div>
              <p className="body-text-comment">
                {props.comment.body}
              </p>
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}
