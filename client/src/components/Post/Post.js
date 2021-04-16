import React, { useState, useContext } from "react";
import styled from "styled-components";

import ActionBar from "./ActionBar";
import AuthorPostInfo from "./AuthorPostInfo";
import { LoggedInUserContext } from "../Providers/LoggedInUserProvider";
import MainStyledButton from "../Button/MainStyledButton";

const Post = ({ givenPost }) => {
  const [isEditing, setIsEditing] = useState();
  const { loggedInUser } = useContext(LoggedInUserContext);
  const { author, edited, numLikes, post, postImage, posted, _id } = givenPost;

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };
  return (
    <Wrapper key={_id} id={_id}>
      <AuthorPostInfo author={author} posted={posted} />
      {edited && <Edited>edited post</Edited>}
      <Border />
      {isEditing ? (
        <>
          <EditingPostMessage placeholder={post} />
          <RemovePostButton>x</RemovePostButton>
          <SubmitEditButton>Submit</SubmitEditButton>
        </>
      ) : (
        <PostMessage> {post} </PostMessage>
      )}

      {postImage === "" ? <div></div> : <PostImg src={postImage} />}

      <ActionBar numLikes={numLikes} />
      {author.authorId === loggedInUser._id && (
        <EditPostButton onClick={handleEdit}>Edit </EditPostButton>
      )}
    </Wrapper>
  );
};

const EditingPostMessage = styled.textarea`
  border-radius: 5px;
  font-weight: bold;
  font-size: 17px;
  margin-left: 35px;
  margin-top: 20px;
  width: 300px;
  height: 70px;
  resize: none;
  outline: none;
  border: none;
`;

const RemovePostButton = styled.button`
  top: 5px;
  right: 5px;
  outline: none;
  cursor: pointer;
  position: absolute;
  border-radius: 3px;
  padding: 2px 10px;
  box-shadow: 1px 1px 6px 0.1px rgb(120, 41, 15, 0.6);
  border: 2px solid rgb(120, 41, 15);
  background: var(--btn-bg-color);
  margin-left: 10px;
  font-size: 15px;
  font-weight: bold;
  transition: 0.1s ease-in-out;
  &:hover {
    background: rgb(255, 160, 71, 0.5);
  }
  &:active {
    transform: scale(0.9);
  }
`;

const SubmitEditButton = styled(RemovePostButton)`
  top: 224px;
  left: 279px;
`;

const EditPostButton = styled(MainStyledButton)`
  padding-left: 5px;
  padding-right: 5px;
  font-size: 13px;
  opacity: 0.5;
  border-radius: 50px;
  bottom: 0px;
  left: -10px;
  &:hover {
    opacity: 1;
  }
`;
const Edited = styled.span`
  opacity: 0.6;
  position: absolute;
  background: var(--post-bg-color);
  top: 72px;
  left: 120px;
  font-style: italic;
`;

const PostImg = styled.img`
  border-radius: 5px;
  box-shadow: 0 0 5px 1px var(--dark-accent);
  margin-top: 10px;
  margin-left: 5%;
  width: 70%;
  border: 1px solid var(--dark-accent);
`;

const PostMessage = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin-left: 35px;
  margin-top: 20px;
  background: var(--post-bg-color);
`;

const Border = styled.div`
  width: 100%;
  height: 2px;
  border-radius: 5px;
  margin: 3px 0;
`;

const Wrapper = styled.div`
  box-shadow: 0 0 4px 1px #c7c5c3;
  padding: 5px 20px;
  border-radius: 5px;
  margin: 10px 40px;
  min-width: 350px;
  max-width: 800px;
  min-height: 230px;
  position: relative;
  background: var(--post-bg-color);
`;
export default Post;
