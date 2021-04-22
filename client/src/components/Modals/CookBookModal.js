import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import MainStyledButton from "../Button/MainStyledButton";
import NotStyledButton from "../Button/NoStyledButton";
import { LoggedInUserContext } from "../Providers/LoggedInUserProvider";

const CookBookModal = ({
  userPickedRecipe,
  setUserPickedRecipe,
  setMediaChoice,
}) => {
  const { loggedInUserCookBook, loggedInUser } = useContext(
    LoggedInUserContext
  );

  const handleChoice = (ev) => {
    const createPostDiv = document.getElementById("createPostId");
    createPostDiv.style.height = "450px";
    const allChoices = document.getElementsByClassName("recipeChoices");
    for (let i = 0; i < allChoices.length; i++) {
      allChoices[i].style.background = "white";
    }
    const choice = document.getElementById(ev.target.id);
    choice.style.background = "#cccccc";
    setUserPickedRecipe(ev.target.id);
    document.getElementById("typeSelection").value = "";
    setMediaChoice("cookBookRecipe");
    setTimeout(() => {
      handleClose();
    }, 300);
  };
  const handleClose = () => {
    const modal = document.getElementById("recipeModalBg");
    if (modal) {
      modal.style.visibility = "hidden";
      modal.style.opacity = "0";
    }
  };

  return (
    <ModalBgWrapper id="recipeModalBg">
      <Modal>
        <HiddenButton onClick={handleClose}>x</HiddenButton>
        <RecipesWrapper>
          {loggedInUserCookBook?.recipes?.length > 0 &&
            loggedInUserCookBook.recipes.map((recipe) => {
              return (
                <ChoiceButton
                  className="recipeChoices"
                  id={recipe.recipeImage}
                  key={recipe.recipeId}
                  onClick={handleChoice}
                >
                  <RecipeTitle id={recipe.recipeImage}>
                    {recipe.recipeTitle.length > 15
                      ? `${recipe.recipeTitle.slice(0, 23)}...`
                      : recipe.recipeTitle}
                  </RecipeTitle>
                  <ModalImage
                    id={recipe.recipeImage}
                    src={recipe.recipeImage}
                  />
                </ChoiceButton>
              );
            })}
        </RecipesWrapper>
        <CloseButton onClick={handleClose}>Close</CloseButton>
      </Modal>
    </ModalBgWrapper>
  );
};

const RecipeTitle = styled.div`
  background: transparent;
  font-weight: bold;
  width: 100px;
`;
const ModalImage = styled.img`
  border: 1px solid var(--dark-accent);
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
  box-shadow: 0 0 5px 0.1px var(--slight-box-shadow);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 2px;
  margin: 3px;
  height: 90px;
  transition: 0.1s ease-in-out;
  &:hover {
    opacity: 0.5;
  }
  &:active {
    transform: scale(0.8);
  }
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
const RecipesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 370px;
  height: 270px;
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
export default CookBookModal;
