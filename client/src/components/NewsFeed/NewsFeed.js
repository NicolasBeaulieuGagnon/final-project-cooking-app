import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";

import { LoggedInUserContext } from "../Providers/LoggedInUserProvider";
import Post from "../Post/Post";
import CreatePost from "../Post/CreatePost";

// main newsFeed area
const NewsFeed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [createdPost, setCreatedPost] = useState([]);
  const { loggedInUser } = useContext(LoggedInUserContext);

  // gets all the posts and reverses the array always showing the newest post at the top.
  // sends each post in the AllPosts array to Post.js
  useEffect(() => {
    fetch("/newsFeed").then((res) => {
      res.json().then((data) => {
        setAllPosts(data.data.reverse());
      });
    });
  }, []);

  return (
    <Wrapper>
      {localStorage.getItem("logged in") === "true" ? (
        <CreatePost
          createdPost={createdPost}
          setCreatedPost={setCreatedPost}
          user={loggedInUser}
        />
      ) : (
        <DisabledCreateAPost>Log In to be able to post.</DisabledCreateAPost>
      )}

      <PostsWrapper>
        {createdPost.length > 0 &&
          createdPost.map((post, index) => {
            return <Post key={index} index={index} givenPost={post} />;
          })}
        {allPosts.length > 0 &&
          allPosts.map((post, index) => {
            return <Post key={index} index={index} givenPost={post} />;
          })}
      </PostsWrapper>
    </Wrapper>
  );
};

const DisabledCreateAPost = styled.div``;

const PostsWrapper = styled.div`
  padding-top: 50px;
  margin-bottom: 50px;
  background: transparent;
  width: 90%;
  margin-left: 5%;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  border: 2px solid var(--primary-border-color);
  box-shadow: 0 0 20px 1px var(--slight-box-shadow);
  background: var(--primary-bg-color);
  border-top: none;
`;
const Wrapper = styled.div`
  position: relative;
  background: var(--light-bg-color);
  overflow-x: hidden;
`;

export default NewsFeed;
