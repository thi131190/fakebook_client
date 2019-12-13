/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import NewPost from "../components/NewPost";
import Post from "../components/Post";

export default function Home(props) {
  const [posts, setPosts] = useState([]);

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
    <div>
      <NewPost getPosts={getPosts} />
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
