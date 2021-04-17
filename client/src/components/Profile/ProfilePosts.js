import React from "react";
import styled from "styled-components";

import Post from "../Post/Post";

const ProfilePosts = ({ user, posts }) => {
  return (
    <Wrapper>
      <Title>Posts</Title>
      <Border />
      {posts?.length > 0 ? (
        <Feed>
          {posts.map((post, index) => {
            return <Post index={index} key={post._id} givenPost={post} />;
          })}
        </Feed>
      ) : (
        <EmptyPosts></EmptyPosts>
      )}
    </Wrapper>
  );
};

const EmptyPosts = styled.div``;

const Wrapper = styled.div`
  background: var(--primary-bg-color);
  ::-webkit-scrollbar {
    width: 0;
  }
`;
const Border = styled.div`
  margin-left: 20px;
  width: 90%;
  height: 3px;
  background: var(--dark-accent);
`;
const Title = styled.div`
  font-weight: bold;
  font-size: 30px;
  margin: 10px 0 0 40px;
  background: var(--primary-bg-color);
`;

const Feed = styled.div`
  background: var(--primary-bg-color);
`;

export default ProfilePosts;
