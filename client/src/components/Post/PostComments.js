import moment from "moment";
import React from "react";
import styled from "styled-components";

const PostComments = ({ comment }) => {
  comment;

  return (
    <Wrapper>
      <UserWrapper>
        <AvatarWrapper>
          <PostedTime>{moment(comment.created).fromNow()}</PostedTime>
          <Avatar src={comment.author.avatar} />
          <Name>{comment.author.handle}</Name>
        </AvatarWrapper>
      </UserWrapper>
      <CommentBox>{comment.comment}</CommentBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 5px 0;
  margin-bottom: 10px;
  background: transparent;
`;

const UserWrapper = styled.div`
  background: transparent;
  position: relative;
`;

const Avatar = styled.img`
  width: 100%;
  height: auto;
`;

const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: var(--dropDown-bg-color);
  border: 2px solid var(--dark-accent);
  margin: 15px 0;
  border-radius: 50%;
  width: 60px;
  height: 60px;
`;
const Name = styled.span`
  background: var(--dropDown-bg-color);
  padding: 2px 5px;
  border-radius: 5px;
  border: 2px solid var(--primary-border-color);
  position: absolute;
  top: -10px;
  left: 30px;
  font-size: 15px;
  font-weight: bold;
`;

const PostedTime = styled.div`
  background: transparent;
  position: absolute;
  top: 24px;
  left: 60px;
  font-size: 14px;
  font-style: italic;
  opacity: 0.7;
`;

const CommentBox = styled.div`
  font-size: 20px;
  font-weight: bold;
  box-shadow: 2px 2px 20px 1px var(--slight-box-shadow);
  border-radius: 2px;
  margin-left: 40px;
  margin-top: -30px;
  padding: 15px 10px;
  width: 60%;
`;

export default PostComments;
