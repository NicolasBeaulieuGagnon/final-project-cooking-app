import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ImFolderUpload } from "react-icons/im";
import { GiWhiteBook } from "react-icons/gi";

import MainStyledButton from "../Button/MainStyledButton";
import CookBookModal from "../Modals/CookBookModal";

// createPost function used in the NewsFeed.js
const CreatePost = ({ setCreatedPost, createdPost, user }) => {
  const [characterCount, setCharacterCount] = useState(0);
  const [postValue, setPostValue] = useState("");
  const [postImage, setPostImage] = useState("");
  const [userPickedRecipe, setUserPickedRecipe] = useState("");
  const [mediaChoice, setMediaChoice] = useState("");

  // tracks to see their is at least 4 or less than 250 to be able to post.
  useEffect(() => {
    if (characterCount > 250 || characterCount < 3) {
      document.getElementById("postButton").disabled = true;
    } else {
      document.getElementById("postButton").disabled = false;
    }
  }, [characterCount]);

  // becomes true when the user picked a recipe saved in their cookbook
  useEffect(() => {
    if (userPickedRecipe) {
      setPostImage(userPickedRecipe);
    }
  }, [userPickedRecipe]);

  // aesthetic entrance to the createPost to make it have a bounce/ stretch entrance
  useEffect(() => {
    const createPostDiv = document.getElementById("createPostId");

    setTimeout(() => {
      createPostDiv.style.height = "450px";
      setTimeout(() => {
        createPostDiv.style.height = "340px";
      }, 200);
    }, 700);
  }, []);

  // onChange function that tracks the value and length of the post.
  const handleCharacterCount = (ev) => {
    setCharacterCount(ev.target.value.length);
    setPostValue(ev.target.value);
  };

  // calls handleRemoveMedia to remove the chose Image/file.
  // than checks if postImage has type of file meaning
  // we need to upload the file. If it doesn't than we can upload the post without
  // first having to upload anything.
  const handleSubmitPost = () => {
    handleRemoveMedia();
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
                  if (createdPost.length > 0) {
                    const array = [...createdPost];
                    array.unshift(data.data);
                    setCreatedPost(array);
                  } else {
                    setCreatedPost([data.data]);
                  }
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
            if (createdPost.length > 0) {
              const array = [...createdPost];
              array.unshift(data.data);
              setCreatedPost(array);
            } else {
              setCreatedPost([data.data]);
            }
            document.getElementById("textArea").value = "";
            setCharacterCount(0);
          }
        });
      });
    }
  };

  // if a file is picked to be uploaded creates an object with it for the postImage useState
  // changes mediaChoice to userImported
  // resets userPickedRecipe.
  // increases the size of the CreatePost div to accomodate for the file name and remove button.
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
      const createPostDiv = document.getElementById("createPostId");
      createPostDiv.style.height = "400px";
    }
  };

  // enables the cookbook modal visually
  const handleCookBookModal = () => {
    const modal = document.getElementById("recipeModalBg");
    modal.style.visibility = "visible";
    modal.style.opacity = "1";
  };

  // resets the CreateComment useStates.
  // called after a post is posted.
  const handleRemoveMedia = () => {
    setMediaChoice("");
    setPostImage("");
    setUserPickedRecipe("");

    const allChoices = document.getElementsByClassName("recipeChoices");
    for (let i = 0; i < allChoices.length; i++) {
      allChoices[i].style.background = "white";
    }
    document.getElementById("typeSelection").value = "";
    const createPostDiv = document.getElementById("createPostId");
    createPostDiv.style.height = "340px";
  };

  // styled button for the upload file input.
  const handleGetFileType = () => {
    const Input = document.getElementById("typeSelection");

    Input.click();
  };

  return (
    <Wrapper id="createPostId">
      <CookBookModal
        userPickedRecipe={userPickedRecipe}
        setUserPickedRecipe={setUserPickedRecipe}
        setMediaChoice={setMediaChoice}
      />
      <UserWrapper>
        <AvatarWrapper>
          <UserAvatar src={user.avatarSrc} />
        </AvatarWrapper>
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
  border-bottom: 2px solid var(--primary-border-color);
  box-shadow: 0 1px 5px 0.1px var(--slight-box-shadow);
  height: 0px;
  overflow: hidden;
  transition: 0.2s ease-in-out;
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

const AvatarWrapper = styled.div`
  margin-left: 5%;
  z-index: 10;
  border: 3px solid var(--dark-accent);
  box-shadow: 0 10px 20px 0.1px var(--btn-bg-color);
  width: 90px;
  height: 90px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--dropDown-bg-color);
`;

const UserAvatar = styled.img`
  height: auto;
  width: 100%;
`;

const UserWrapper = styled.div`
  padding-top: 35px;

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
  left: 6%;
  margin-right: 65px;
  top: 269px;
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
