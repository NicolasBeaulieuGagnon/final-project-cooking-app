import React, { useState, useEffect } from "react";
import styled from "styled-components";

import MainStyledButton from "../Button/MainStyledButton";
import NotStyledButton from "../Button/NoStyledButton";

const AvatarOptionModal = ({ userAvatar, setUserAvatar }) => {
  const [defaultAvatarChoices, setDefaultAvatarChoices] = useState([]);
  useEffect(() => {
    fetch("/avatarChoice").then((res) => {
      res.json().then((data) => {
        setDefaultAvatarChoices(data.data);
      });
    });
  }, []);

  const handleChoice = (ev) => {
    setUserAvatar(ev.target.id);
  };

  const handleClose = () => {
    const modal = document.getElementById("avatarModalBg");
    if (modal) {
      modal.style.visibility = "hidden";
      modal.style.opacity = "0";
    }
  };
  useEffect(() => {
    const doneButton = document.getElementById("avatarDoneButton");

    if (doneButton) {
      if (userAvatar) {
        doneButton.disabled = false;
        doneButton.style.cursor = "pointer";
      } else {
        const doneButton = document.getElementById("avatarDoneButton");
        doneButton.disabled = true;
        doneButton.style.cursor = "not-allowed";
      }
    }
  }, [userAvatar]);

  return (
    <ModalBgWrapper id="avatarModalBg">
      <Modal>
        <HiddenButton onClick={handleClose}>x</HiddenButton>
        <AvatarWrapper>
          {defaultAvatarChoices.length > 0 &&
            defaultAvatarChoices.map((avatar, index) => {
              return (
                <ChoiceButton
                  id={avatar}
                  onClick={handleChoice}
                  key={`index-${index}`}
                >
                  <ModalImage
                    id={avatar}
                    src={avatar}
                    alt={`avatar-${index}`}
                  />
                </ChoiceButton>
              );
            })}
        </AvatarWrapper>
        <Button onClick={handleClose} id="avatarDoneButton">
          Done
        </Button>
        <CloseButton onClick={handleClose}>Close</CloseButton>
      </Modal>
    </ModalBgWrapper>
  );
};

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
const ChoiceButton = styled(NotStyledButton)``;
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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const AvatarWrapper = styled.div`
  width: 350px;
  height: 300px;
  overflow-y: scroll;
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

export default AvatarOptionModal;
