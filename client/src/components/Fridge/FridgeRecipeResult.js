import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Loading from "../Animations/Loading";
import { VscLoading } from "react-icons/vsc";
import NotStyledButton from "../Button/NoStyledButton";

// displays the 3 given recipes that we get back from what the user got
//when they inputed the things from their fridge.
const FridgeRecipeResult = ({ onClick, recipeResults }) => {
  return (
    <Wrapper>
      <CloseResultButton onClick={onClick}>x</CloseResultButton>
      {recipeResults?.length > 0 ? (
        recipeResults.map((result) => {
          return (
            <RecipeWrapper key={result.id}>
              <StyledLink to={`/recipe/${result.id}`}>
                <Title>{result.title}</Title>
              </StyledLink>
              <StyledLink to={`/recipe/${result.id}`}>
                <ImageWrapper>
                  <Image src={result.image} />
                </ImageWrapper>
              </StyledLink>
              <InfoWrapper>
                {result.usedIngredients.length > 0 && (
                  <InfoTitle>
                    Ingredients in your fridge:
                    <Info>
                      {result.usedIngredients.map((usedIng) => {
                        return (
                          <IngredientDetail>{usedIng.name}</IngredientDetail>
                        );
                      })}
                    </Info>
                  </InfoTitle>
                )}
                {result.missedIngredients.length > 0 && (
                  <InfoTitle>
                    Not in your fridge:
                    <Info>
                      {result.missedIngredients.map((missedIng) => {
                        return (
                          <IngredientDetail>{missedIng.name}</IngredientDetail>
                        );
                      })}
                    </Info>
                  </InfoTitle>
                )}
              </InfoWrapper>
            </RecipeWrapper>
          );
        })
      ) : (
        <NoMatch>
          <Loading size="100px">
            <VscLoading size="100" />
          </Loading>
        </NoMatch>
      )}
    </Wrapper>
  );
};

const IngredientDetail = styled.div``;
const CloseResultButton = styled(NotStyledButton)`
  font-weight: bold;
  font-size: 21px;
  position: sticky;
  float: right;
  margin-right: 15px;
  transition: 0.3s ease-in-out;
  &:hover {
    transform: rotate(360deg);
  }
`;

const NoMatch = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const InfoWrapper = styled.div`
  padding-top: 10px;
  font-weight: bold;
`;
const Info = styled.div`
  font-weight: normal;
  padding-left: 20px;
  font-style: italic;
`;
const InfoTitle = styled.div``;
const RecipeWrapper = styled.div`
  font-size: 20px;
  display: flex;
  flex-direction: column;
  padding: 35px 25px;
`;
const Wrapper = styled.div``;
const Title = styled.div`
  font-size: 25px;
  font-weight: bold;
  padding: 10px 20px;
  transition: 0.2s ease-in-out;
  &:hover {
    text-shadow: 0 0 20px var(--dark-accent);
  }
`;
const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  margin-left: 2%;
  margin-bottom: 10px;
  border: 2px solid var(--primary-border-color);
  box-shadow: 1px 1px 10px 0.1px var(--slight-box-shadow);

  border-radius: 2px;
  overflow: hidden;
`;
const Image = styled.img`
  width: 100%;
  transition: 0.1s ease-in-out;
  &:hover {
    transform: rotate(5deg) scale(1.1);
  }
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

export default FridgeRecipeResult;
