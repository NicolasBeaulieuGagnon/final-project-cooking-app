import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import MainStyledButton from "../Button/MainStyledButton";
import PostComments from "./PostComments";

const CreateComment = ({
  commentsArray,
  setCommentsArray,
  loggedInUser,
  postId,
}) => {
  const [characterCount, setCharacterCount] = useState(0);
  const [postValue, setPostValue] = useState("");

  const handleCharacterCount = (ev) => {
    setCharacterCount(ev.target.value.length);
    setPostValue(ev.target.value);
  };

  const handlePostComment = () => {
    document.getElementById("commentTextArea").value = "";

    const author = {
      handle: loggedInUser.userName,
      avatar: loggedInUser.avatarSrc,
      _id: loggedInUser._id,
    };

    const newPost = {
      comment: postValue,
      author,
      postId,
    };

    fetch(`/posts/comment/create`, {
      method: "PATCH",
      headers: {
        Accepts: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...newPost }),
    }).then((res) => {
      res.json().then((data) => {
        const newArray = [...commentsArray];
        newArray.unshift(data.data);
        setCommentsArray(newArray);
      });
    });
  };

  return (
    <Wrapper>
      <Border />
      {commentsArray.length > 0 &&
        commentsArray.map((comment) => {
          return <PostComments comment={comment} />;
        })}
      <UserWrapper>
        <AvatarWrapper>
          <Avatar src={loggedInUser.avatarSrc} />
        </AvatarWrapper>
      </UserWrapper>

      <TextArea
        placeholder="write comment here.."
        onChange={handleCharacterCount}
        id="commentTextArea"
      />
      <PostButton onClick={handlePostComment}>Post</PostButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-left: 21px;
  margin-top: 15px;
  background: transparent;
  position: relative;
`;

const Border = styled.div`
  height: 2px;
  width: 90%;
  border-radius: 5px;
`;

const UserWrapper = styled.div`
  margin-top: 30px;
  background: transparent;
`;

const TextArea = styled.input`
  width: 70%;
  height: 70px;
  font-weight: bold;
  font-size: 19px;
  padding: 5px 10px;
  outline: none;
  border: none;
  border-radius: 4px;
  box-shadow: 0 0 10px 0.1px var(--light-bg-color);
`;

const PostButton = styled(MainStyledButton)`
  bottom: 0;
`;

const AvatarWrapper = styled.div`
  position: absolute;
  left: 70%;
  bottom: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: var(--dropDown-bg-color);
  border: 2px solid var(--dark-accent);
  margin-left: -30px;
  border-radius: 50%;
  width: 45px;
  height: 45px;
`;

const Avatar = styled.img`
  width: 100%;
  height: auto;
`;

export default CreateComment;
