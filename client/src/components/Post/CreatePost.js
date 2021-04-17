import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ImFolderUpload } from "react-icons/im";
import { GiWhiteBook } from "react-icons/gi";

import MainStyledButton from "../Button/MainStyledButton";
import CookBookModal from "../Modals/CookBookModal";

const CreatePost = ({ setCreatedPost, createdPost, user }) => {
  const [characterCount, setCharacterCount] = useState(0);
  const [postValue, setPostValue] = useState("");
  const [postImage, setPostImage] = useState("");
  const [userPickedRecipe, setUserPickedRecipe] = useState("");
  const [mediaChoice, setMediaChoice] = useState("");

  // console.log(user);

  useEffect(() => {
    if (characterCount > 250 || characterCount < 3) {
      document.getElementById("postButton").disabled = true;
    } else {
      document.getElementById("postButton").disabled = false;
    }
  }, [characterCount]);

  useEffect(() => {
    if (userPickedRecipe) {
      setPostImage(userPickedRecipe);
    }
  }, [userPickedRecipe]);

  const handleCharacterCount = (ev) => {
    setCharacterCount(ev.target.value.length);
    setPostValue(ev.target.value);
  };

  const handleSubmitPost = () => {
    const btn = document.getElementById("postButton");
    btn.disabled = true;
    btn.innerText = "Posting...";
    setTimeout(() => {
      btn.innerText = "Post";
    }, 1000);

    if (postImage.type === "file") {
      fetch(`/s3Url`).then((res) => {
        res.json().then((data) => {
          const secretUrl = data.url;
          const file = postImage.image[0];
          fetch(secretUrl, {
            method: "PUT",
            headers: {
              "Content-Type": "multipart/form-data",
            },
            body: file,
          }).then(() => {
            const image = secretUrl.split("?")[0];

            const newPostObj = {
              userId: user._id,
              post: postValue,
              postImage: image,
            };
            fetch(`/posts/post`, {
              method: "POST",
              headers: {
                Allowed: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ ...newPostObj }),
            }).then((res) => {
              res.json().then((data) => {
                if (data.status === 202) {
                  setCreatedPost(!createdPost);
                  document.getElementById("textArea").value = "";
                  setCharacterCount(0);
                }
              });
            });
          });
        });
      });
    } else {
      const newPostObj = {
        userId: user._id,
        post: postValue,
        postImage,
      };
      fetch(`/posts/post`, {
        method: "POST",
        headers: {
          Allowed: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newPostObj }),
      }).then((res) => {
        res.json().then((data) => {
          if (data.status === 202) {
            setCreatedPost(!createdPost);
            document.getElementById("textArea").value = "";
            setCharacterCount(0);
          }
        });
      });
    }
  };

  const handleSelectedImage = (ev) => {
    if (ev.target.type === "file") {
      const image = ev.target.files;
      const type = ev.target.type;
      const allChoices = document.getElementsByClassName("recipeChoices");
      for (let i = 0; i < allChoices.length; i++) {
        allChoices[i].style.background = "white";
      }
      setMediaChoice("userImported");
      setPostImage({ image, type });
      setUserPickedRecipe("");
    }
  };

  const handleCookBookModal = () => {
    const modal = document.getElementById("recipeModalBg");
    modal.style.visibility = "visible";
    modal.style.opacity = "1";
  };

  const handleRemoveMedia = () => {
    setMediaChoice("");
    setPostImage("");
    setUserPickedRecipe("");

    const allChoices = document.getElementsByClassName("recipeChoices");
    for (let i = 0; i < allChoices.length; i++) {
      allChoices[i].style.background = "white";
    }
    document.getElementById("typeSelection").value = "";
  };

  const handleGetFileType = () => {
    const Input = document.getElementById("typeSelection");

    Input.click();
  };

  return (
    <Wrapper>
      <CookBookModal
        userPickedRecipe={userPickedRecipe}
        setUserPickedRecipe={setUserPickedRecipe}
        setMediaChoice={setMediaChoice}
      />
      <UserWrapper>
        <UserAvatar src={user.avatarSrc} />
        <Handle>{user.userName}</Handle>
      </UserWrapper>
      <TextArea
        placeholder="What's cooking today?"
        id="textArea"
        onChange={handleCharacterCount}
      />
      {user.hasCookBook && (
        <>
          <UploadedImage
            id="typeSelection"
            onChange={handleSelectedImage}
            type="file"
            name="fileFromComputer"
          />
          <InputFileButton onClick={handleGetFileType}>
            <ImFolderUpload size="22" />
          </InputFileButton>

          <CookBookModalButton onClick={handleCookBookModal}>
            <GiWhiteBook />
          </CookBookModalButton>
        </>
      )}
      <PostButton onClick={handleSubmitPost} id="postButton">
        Post
      </PostButton>
      <CharacterCount count={characterCount}>
        {250 - characterCount}
      </CharacterCount>
      {mediaChoice === "cookBookRecipe" ? (
        <MediaWrapper>
          <MediaChoiceResetButton onClick={handleRemoveMedia}>
            remove
          </MediaChoiceResetButton>
          <MediaUploadChoice>
            <MediaUploadImage src={userPickedRecipe} />
          </MediaUploadChoice>
        </MediaWrapper>
      ) : mediaChoice === "userImported" ? (
        <MediaWrapper>
          <MediaChoiceResetButton onClick={handleRemoveMedia}>
            remove
          </MediaChoiceResetButton>
          <MediaUploadChoice>
            you have Selected{" "}
            {document.getElementById("typeSelection").files[0].name} from your
            computer.
          </MediaUploadChoice>
        </MediaWrapper>
      ) : (
        <div></div>
      )}
    </Wrapper>
  );
};

const MediaUploadImage = styled.img`
  border: 1px solid var(--dark-accent);
  width: 130px;
  border-radius: 5px;
`;
const MediaWrapper = styled.div`
  margin-left: 5%;
  font-weight: bold;
  font-size: 20px;
`;

const MediaUploadChoice = styled.div`
  height: 140px;
  background: var(--primary-bg-color);
`;
const MediaChoiceResetButton = styled(MainStyledButton)`
  bottom: 10px;
  margin-left: 5%;
  left: -5px;
`;

const Handle = styled.div`
  background: var(--dropDown-bg-color);
  padding: 2px 5px;
  border-radius: 5px;
  border: 2px solid var(--dark-accent);
  position: absolute;
  margin-left: 5%;
  top: 87px;
  left: 50px;
  font-size: 24px;
  font-weight: bold;
`;

const Wrapper = styled.div`
  position: relative;
  background: var(--primary-bg-color);
  padding-bottom: 10px;
  border-bottom: 5px solid var(--dark-accent);
  box-shadow: 0 5px 10px 1px var(--dark-accent);
`;

const TextArea = styled.textarea`
  font-weight: bold;
  padding: 20px;
  font-size: 20px;
  padding-right: 50px;
  margin-top: 20px;
  width: 75%;
  height: 150px;
  margin-left: 5%;
  resize: none;
  border: none;
  outline: none;
  border-radius: 5px;
  box-shadow: 0 0 10px 1px var(--dark-accent);
`;

const PostButton = styled(MainStyledButton)`
  top: 260px;
  right: 20%;
`;

const InputFileButton = styled(MainStyledButton)`
  top: 144px;
  padding-top: 5px;
  padding-bottom: 0px;
  right: 20%;
  margin-left: 150px;
`;

const UserAvatar = styled.img`
  background: var(--dropDown-bg-color);
  border: 2px solid var(--dark-accent);
  margin: 15px 10px;
  margin-left: 5%;
  border-radius: 50%;
  width: 90px;
  transition: 0.2s ease-in-out;
`;

const UserWrapper = styled.div`
  background: transparent;
  position: relative;
`;

const UploadedImage = styled.input`
  top: 0;
  left: 0;
  opacity: 0;
  width: 0.1px;
  height: 0.1px;
  position: absolute;
  z-index: -200;
`;

const CharacterCount = styled.div`
  position: absolute;
  right: 20%;
  margin-right: 65px;
  top: 273px;
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
const CookBookModalButton = styled(MainStyledButton)`
  padding-top: 5px;
  padding-bottom: 0px;
  top: 180px;
  right: 20%;

  margin-left: 150px;
`;

export default CreatePost;
