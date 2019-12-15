import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";


const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: "600px",
    backgroundColor: theme.palette.background.paper
  }
}));

export default function Users(props) {
  const classes = useStyles();
  const { searchResults } = props;

  return (
    <Container className="search-results">
    <img className="img-search-result" src="https://s5.upanh.pro/2019/12/15/search.png"/>
    <List dense className={classes.root}>

      {searchResults &&
        searchResults.map(user => {
          return (
            <div className="search-result">
              <Link to={`/profile/${user.id}`}>
                <ListItem key={user.id} button>
                  <ListItemAvatar>
                    <Avatar
                      alt={`Avatar n°${user.id + 1}`}
                      src={
                        user.avatar ||
                        "https://s4.upanh.pro/2019/12/15/user.png"
                      }
                    />
                  </ListItemAvatar>

                  <ListItemText primary={user.email} />
                </ListItem>
                {/* <hr></hr> */}
              </Link>
            </div>
          );
        })}
    </List>
    
    </Container>

  );
}
