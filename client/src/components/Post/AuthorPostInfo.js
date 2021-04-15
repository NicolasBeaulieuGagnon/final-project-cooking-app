import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import moment from "moment";

const AuthorPostInfo = ({ author, posted }) => {
  return (
    <Wrapper>
      <StyledLink
        onClick={() => {
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
        }}
        to={`/profile/${author.authorId}`}
      >
        <Avatar src={author.authorAvatarSrc} />
        <Name>{author.handle}</Name>
      </StyledLink>
      <PostedTime>posted: {moment(posted).format("ll")}</PostedTime>
    </Wrapper>
  );
};

const PostedTime = styled.div`
  background: transparent;
  margin-left: 10px;
  margin-top: 4px;
  font-size: 15px;
  font-style: italic;
  opacity: 0.8;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const Wrapper = styled.div`
  background: transparent;
  position: relative;
`;

const Name = styled.span`
  background: var(--dropDown-bg-color);
  padding: 2px 5px;
  border-radius: 5px;
  border: 2px solid var(--dark-accent);
  position: absolute;
  top: 87px;
  left: 60px;
  font-size: 24px;
  font-weight: bold;
  transition: 0.2s ease-in-out;
  &:hover {
    transform: translate(-2%);
  }
  &:active {
    transform: scale(0.95);
  }
`;
const Avatar = styled.img`
  background: var(--dropDown-bg-color);
  border: 2px solid var(--dark-accent);
  margin: 15px 10px;
  border-radius: 50%;
  width: 90px;
  transition: 0.2s ease-in-out;
  &:hover {
    transform: rotate(5deg);
  }
  &:active {
    transform: scale(0.95);
  }
`;
export default AuthorPostInfo;
