import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// little card for each recipe in a cookbook wrapped in a link so you can go to that recipes page.
// the setTimeout is for aesthetic to give each recipe card a delayed entrance from the next.
const CookBookRecipeCard = ({ recipe, index }) => {
  useEffect(() => {
    const recipeEntrance = document.getElementById(recipe.recipeId);

    setTimeout(() => {
      setTimeout(() => {
        recipeEntrance.style.transform = "translate(0, 50%)";
        recipeEntrance.style.opacity = ".8";
        setTimeout(() => {
          recipeEntrance.style.transform = "translate(0 , 0%)";
          recipeEntrance.style.opacity = "1";
        }, 200);
      }, 200);
    }, index * 150);
  }, []);

  return (
    <RecipeWrapper key={recipe.recipeId} id={recipe.recipeId}>
      <RecLink to={`/recipe/${recipe.recipeId}`}>
        <RecName>{recipe.recipeTitle}</RecName>
        <RecImgWrapper>
          <RecImg src={recipe.recipeImage} />
        </RecImgWrapper>
      </RecLink>
    </RecipeWrapper>
  );
};

const RecName = styled.div``;

const RecImgWrapper = styled.div`
  border: 3px solid var(--primary-border-color);
  width: 150px;
  height: 150px;
  overflow: hidden;
  position: absolute;
  left: 50%;
  bottom: 10px;
  transform: translate(-50%);
  border-radius: 2px;
`;

const RecImg = styled.img`
  height: 100%;
  width: auto;
`;
const RecLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const RecipeWrapper = styled.div`
  position: relative;
  margin: 5px 5px;
  padding: 5px 10px;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  border-radius: 2px;
  width: 170px;
  height: 280px;
  transition: 0.2s ease-in-out;
  opacity: 0;
  transform: translate(0, -200%);
  box-shadow: 0 0 10px 0.1px var(--slight-box-shadow);
  &:hover {
    box-shadow: 0 0 5px 5px var(--slight-box-shadow);
  }
`;

export default CookBookRecipeCard;
