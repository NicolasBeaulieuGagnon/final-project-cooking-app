import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";

import { LoggedInUserContext } from "../Providers/LoggedInUserProvider";
import Post from "../Post/Post";
import CreatePost from "../Post/CreatePost";

const NewsFeed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [createdPost, setCreatedPost] = useState(true);
  const { loggedInUser } = useContext(LoggedInUserContext);

  useEffect(() => {
    fetch("/newsFeed").then((res) => {
      res.json().then((data) => {
        setAllPosts(data.data.reverse());
      });
    });
  }, [createdPost]);

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
      {allPosts.length > 0 && (
        <PostsWrapper>
          {allPosts.map((post, index) => {
            return (
              <>
                <Post index={index} givenPost={post} />
                <Border key={post.Id} />
              </>
            );
          })}
        </PostsWrapper>
      )}
    </Wrapper>
  );
};

const DisabledCreateAPost = styled.div``;

const NewsFeedWrapper = styled.div``;

const Border = styled.div`
  width: 90%;
  margin-left: 5%;
  margin-bottom: 10px;
  height: 2px;
  opacity: 0.5;
  background: var(--dark-accent);
`;

const PostsWrapper = styled.div`
  padding-top: 50px;
  margin-bottom: 50px;
  background: transparent;
  width: 90%;
  margin-left: 5%;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  border: 5px solid var(--dark-accent);
  box-shadow: 0 0 20px 5px var(--dark-accent);
  background: var(--primary-bg-color);
  border-top: none;
`;
const Wrapper = styled.div`
  position: relative;
  background: var(--primary-bg-color);
`;

export default NewsFeed;
