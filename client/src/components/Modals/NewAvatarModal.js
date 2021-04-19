import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ImFolderUpload } from "react-icons/im";
import { FiCheckCircle } from "react-icons/fi";

import NotStyledButton from "../Button/NoStyledButton";
import MainStyledButton from "../Button/MainStyledButton";

const NewAvatarModal = ({ loggedInUser, updatingUser, setUpdatingUser }) => {
  const [defaultAvatarChoices, setDefaultAvatarChoices] = useState([]);
  const [Pick, setPick] = useState(null);
  const [fileValue, setFileValue] = useState("");

  useEffect(() => {
    fetch("/avatarChoice").then((res) => {
      res.json().then((data) => {
        setDefaultAvatarChoices(data.data);
      });
    });
    if (Pick === null) {
      document.getElementById("avatarDoneButton").disabled = true;
    } else {
      document.getElementById("avatarDoneButton").disabled = false;
    }
  }, [Pick]);

  const handlePick = (ev) => {
    if (ev.target.type === "file") {
      setPick(ev.target.files[0]);
      setFileValue(ev.target.files[0].name);
    } else {
      setPick(ev.target.id);
      document.getElementById("fileUploadInput").value = "";
      setFileValue("");
    }
  };

  const handleUploadChoice = () => {
    if (typeof Pick === "object") {
      fetch("/s3Url").then((res) => {
        res.json().then((data) => {
          const secretUrl = data.url;
          const file = Pick;
          const image = secretUrl.split("?")[0];
          console.log(file);
          fetch(secretUrl, {
            method: "PUT",
            headers: {
              "Content-Type": "multipart/form-data",
            },
            body: file,
          });

          fetch(`/users/user/${loggedInUser._id}`, {
            method: "PATCH",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ avatarSrc: image }),
          }).then(() => {
            setUpdatingUser(!updatingUser);
          });
        });
      });
    } else {
      fetch(`/users/user/${loggedInUser._id}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatarSrc: Pick,
        }),
      }).then((res) => {
        res.json().then((data) => {
          setUpdatingUser(!updatingUser);
        });
      });
    }

    handleClose();
  };

  const handleClose = () => {
    setPick(null);
    document.getElementById("fileUploadInput").value = "";
    const modalBg = document.getElementById("avatarChangeModalBg");
    const modal = document.getElementById("avatarChangeModal");
    if (modalBg) {
      modalBg.style.visibility = "hidden";
      modalBg.style.opacity = "0";
      modal.style.top = "150%";
    }
  };

  const handleClickInput = () => {
    document.getElementById("fileUploadInput").click();
  };

  return (
    <ModalBgWrapper id="avatarChangeModalBg">
      <Modal id="avatarChangeModal">
        <HiddenButton onClick={handleClose}>x</HiddenButton>
        <AvatarWrapper>
          <UploadInput onChange={handlePick} type="file" id="fileUploadInput" />
          {fileValue && (
            <CheckWrapper>
              <FiCheckCircle size="30" />
            </CheckWrapper>
          )}
          <ChoiceButton id="upload" onClick={handleClickInput}>
            <ImFolderUpload style={{ paddingLeft: "10px" }} size="65" />
          </ChoiceButton>
          {defaultAvatarChoices.length > 0 &&
            defaultAvatarChoices.map((avatar, index) => {
              return (
                <ChoiceButton
                  id={avatar}
                  onClick={handlePick}
                  key={`index-${index}`}
                >
                  {Pick === avatar && (
                    <CheckWrapper style={{ top: "0px", left: "5px" }}>
                      <FiCheckCircle size="30" />
                    </CheckWrapper>
                  )}
                  <ModalImage
                    id={avatar}
                    src={avatar}
                    alt={`avatar-${index}`}
                  />
                </ChoiceButton>
              );
            })}
        </AvatarWrapper>
        <Button onClick={handleUploadChoice} id="avatarDoneButton">
          submit
        </Button>
        <CloseButton onClick={handleClose}>Close</CloseButton>
      </Modal>
    </ModalBgWrapper>
  );
};

const CheckWrapper = styled.div`
  height: 28px;
  width: 28px;
  position: absolute;
  top: 20px;
  left: 22px;
  color: green;
  border-radius: 50%;
  z-index: 20;
`;
const UploadInput = styled.input`
  top: 0;
  left: 0;
  opacity: 0;
  width: 0.1px;
  height: 0.1px;
  position: absolute;
  z-index: -200;
`;

const ModalImage = styled.img`
  width: 70px;
`;
const HiddenButton = styled(NotStyledButton)`
  font-weight: bold;
  font-size: 20px;
  position: absolute;
  top: 0px;
  right: 2px;
`;
const ChoiceButton = styled(NotStyledButton)`
  position: relative;
  padding-top: 10px;
  margin-right: 10px;
  margin-bottom: 5px;
  height: 70px;
  width: 70px;
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
  flex-wrap: wrap;
  position: absolute;
  top: 150%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: 0.3s ease-in-out;
`;
const AvatarWrapper = styled.div`
  width: 350px;
  height: 300px;
  overflow-y: scroll;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
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
export default NewAvatarModal;
