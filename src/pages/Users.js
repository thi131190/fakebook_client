import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function Users(props) {
  const classes = useStyles();
  const { searchResults } = props;

  return (
    <List dense className={classes.root}>
      {searchResults &&
        searchResults.map(user => {
          return (
            <Link to={`/profile/${user.id}`}>
              <ListItem key={user.id} button>
                <ListItemAvatar>
                  <Avatar
                    alt={`Avatar n°${user.id + 1}`}
                    src={
                      user.avatar ||
                      "https://image.flaticon.com/icons/svg/747/747376.svg"
                    }
                  />
                </ListItemAvatar>

                <ListItemText primary={user.email} />
              </ListItem>
            </Link>
          );
        })}
    </List>
  );
}
