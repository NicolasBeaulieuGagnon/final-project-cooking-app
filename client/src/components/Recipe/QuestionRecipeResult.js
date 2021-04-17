import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { RecipeContext } from "../Providers/RecipeProvider";

const QuestionRecipeResult = () => {
  const { filteredRecipe } = useContext(RecipeContext);
  return (
    <Wrapper id="choicesWrapper">
      {filteredRecipe &&
        filteredRecipe.length > 0 &&
        filteredRecipe[0] !== null && (
          <RecipeWrapper id="choicesRecipeWrapper">
            {filteredRecipe.map((recipe) => {
              return (
                <RecipeItem key={recipe.id} id={recipe.id}>
                  <Title>{recipe.title}</Title>
                  <RecipeImgWrapper>
                    <StyledLink to={`/recipe/${recipe.id}`}>
                      <RecipeImage src={recipe.image} alt={recipe.title} />
                    </StyledLink>
                  </RecipeImgWrapper>
                </RecipeItem>
              );
            })}
          </RecipeWrapper>
        )}
    </Wrapper>
  );
};

const StyledLink = styled(Link)``;

const RecipeImgWrapper = styled.div`
  border: 2px solid var(--primary-border-color);
  background: transparent;
  overflow: hidden;
  width: 200px;
  margin-top: 10px;
  border-radius: 2px;
  margin-right: 0;
`;

const RecipeImage = styled.img`
  width: 200px;
  transform: scale(1.2);
  transition: 0.1s ease-in-out;
  &:hover {
    transform: scale(1.4);
  }
`;
const Title = styled.div`
  font-weight: bold;
  font-size: 22px;
  background: transparent;
`;
const RecipeItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  padding: 20px;
  background: transparent;
  word-wrap: break-word;
`;
const Wrapper = styled.div`
  border-top: 2px solid var(--primary-border-color);
  height: 0px;
  overflow: hidden;
  background: var(--primary-bg-color);
  transition: 0.5s ease-in-out;
`;
const RecipeWrapper = styled.div`
  padding: 30px;
  margin: 0 20px;
  background: var(--primary-bg-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0px 5px 20px 1px var(--slight-box-shadow);
  overflow: hidden;
  border: 2px solid var(--primary-border-color);
  border-top: none;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
`;
export default QuestionRecipeResult;
