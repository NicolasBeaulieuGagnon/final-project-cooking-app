import React, { useState, useEffect } from "react";
import styled from "styled-components";

import NotStyledButton from "../Button/NoStyledButton";
import MainStyledButton from "../Button/MainStyledButton";

const ShareRecipeAddModal = ({
  recipe,
  loggedInUser,
  loggedInUserCookBook,
}) => {
  const [recipeImage, setRecipeImage] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const [postValue, setPostValue] = useState("");
  const [isPostComplete, setIsPostComplete] = useState(false);

  useEffect(() => {
    if (loggedInUserCookBook.recipes) {
      const recipeFromUserCookBook = loggedInUserCookBook.recipes.filter(
        (entry) => {
          return entry.recipeId === recipe.id;
        }
      );
      if (recipeFromUserCookBook.length === 1) {
        setRecipeImage(recipeFromUserCookBook[0].recipeImage);
      }
    }
  }, [loggedInUserCookBook]);
  useEffect(() => {
    if (characterCount > 250 || characterCount < 3) {
      document.getElementById("sharePostButton").disabled = true;
    } else {
      document.getElementById("sharePostButton").disabled = false;
    }
  }, [characterCount]);

  const handleCharacterCount = (ev) => {
    setCharacterCount(ev.target.value.length);
    setPostValue(ev.target.value);
  };

  const handlePost = (ev) => {
    ev.target.disabled = true;
    ev.target.innerText = "Loading...";
    document.getElementById("shareTextArea").value = "";
    setCharacterCount(0);
    const newPostObj = {
      userId: loggedInUser._id,
      post: postValue,
      postImage: recipeImage,
    };

    fetch(`/posts/post`, {
      method: "POST",
      headers: {
        Allowed: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...newPostObj }),
    }).then((res) => {
      res.json().then(() => {
        setIsPostComplete(true);
        setTimeout(() => {
          handleClose();
          ev.target.innerText = "Post";
          setIsPostComplete(false);
        }, 900);
      });
    });
  };

  const handleClose = () => {
    const modal = document.getElementById("shareRecipeModalBg");
    if (modal) {
      modal.style.visibility = "hidden";
      modal.style.opacity = "0";
    }
  };

  return (
    <ModalBgWrapper id="shareRecipeModalBg">
      <Modal id="shareRecipeModal">
        <ModalRecipeImage src={recipe.image} />
        <AvatarWrapper>
          <Avatar src={loggedInUser.avatarSrc} />
        </AvatarWrapper>
        <CharacterCount count={characterCount}>
          {250 - characterCount}
        </CharacterCount>
        <TextArea
          placeholder="share how you found this!"
          id="shareTextArea"
          onChange={handleCharacterCount}
        />
        <PostComplete isPosted={isPostComplete}>Posted</PostComplete>
        <Button id="sharePostButton" onClick={handlePost}>
          Post
        </Button>
        <HiddenButton onClick={handleClose}>x</HiddenButton>
        <CloseButton onClick={handleClose}>Close</CloseButton>
      </Modal>
    </ModalBgWrapper>
  );
};

const PostComplete = styled.div`
  position: absolute;
  bottom: 6px;
  left: 50%;
  transform: translate(-50%);
  transition: 0.1s ease-in-out;
  opacity: ${(props) => {
    return props.isPosted ? 1 : 0;
  }};
  box-shadow: 0 0 10px 0.5px rgb(58, 224, 92);
  font-weight: bold;
  background: rgb(58, 224, 92);
  border: 2px solid rgb(0, 64, 13);
  border-radius: 3px;
  padding: 5px 15px;
`;

const TextArea = styled.textarea`
  font-weight: bold;
  padding: 20px;
  font-size: 20px;
  padding-right: 50px;
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 30px;
  width: 300px;
  height: 100px;
  resize: none;
  border: none;
  outline: none;
  border-radius: 5px;
  box-shadow: 0 0 10px 1px var(--dark-accent);
`;

const ModalRecipeImage = styled.img`
  border-radius: 5px;
  margin: 2px 2px;
  margin-left: 20px;
  width: 125px;
  box-shadow: 0 0 10px 0.5px var(--slight-box-shadow);
  transition: 0.2 ease-in-out;
`;
const HiddenButton = styled(NotStyledButton)`
  font-weight: bold;
  font-size: 20px;
  position: absolute;
  top: 0px;
  right: 2px;
`;

const Button = styled(MainStyledButton)`
  bottom: 10px;
  right: 20px;
`;

const CloseButton = styled(MainStyledButton)`
  bottom: 10px;
  left: 10px;
`;

const Modal = styled.div`
  border-radius: 5px;
  padding: 20px;
  padding-bottom: 60px;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const AvatarWrapper = styled.div`
  position: absolute;
  left: 330px;
  bottom: 135px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: var(--dropDown-bg-color);
  border: 2px solid var(--dark-accent);
  margin-left: -30px;
  border-radius: 50%;
  width: 55px;
  height: 55px;
`;

const Avatar = styled.img`
  width: 100%;
  height: auto;
`;

const ModalBgWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  width: 100%;
  height: 100vh;
  background-color: rgb(0, 0, 0, 0.4);
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.5s;
`;

const CharacterCount = styled.div`
  position: absolute;
  bottom: 58px;
  right: 55px;
  background: transparent;
  color: ${(props) => {
    return props.count >= 250
      ? "red"
      : props.count > 175
      ? "orange"
      : props.count >= 3
      ? "green"
      : "gray";
  }};
  font-weight: bold;
  font-size: 20px;
`;

export default ShareRecipeAddModal;
