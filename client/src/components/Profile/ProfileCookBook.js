import React from "react";
import styled from "styled-components";
import NotStyledButton from "../Button/NoStyledButton";
import { Link, useHistory } from "react-router-dom";

import testImage from "../../assets/cordonBleu.png";

const ProfileCookBook = ({ user, cookBook }) => {
  const history = useHistory();
  console.log(cookBook);
  return (
    <Wrapper>
      <Title>{user}'s Cookbook</Title>
      {cookBook ? (
        <Book>
          {cookBook.recipes.length > 0 ? (
            <RecipesWrapper>
              {cookBook.recipes.map((recipe) => {
                return (
                  <RecipeWrapper>
                    <RecName>Cordon Bleu</RecName>
                    <RecLink to={`/recipe/`}>
                      <RecImgWrapper>
                        <RecImg src={testImage} />
                      </RecImgWrapper>
                    </RecLink>
                  </RecipeWrapper>
                );
              })}
            </RecipesWrapper>
          ) : (
            <NoRecipe>This is the start of something great...</NoRecipe>
          )}
        </Book>
      ) : (
        <EmptyBook>
          <CreateBookButton
            onClick={() => {
              history.push(`/createCookBook`);
            }}
          >
            create your own book
          </CreateBookButton>
        </EmptyBook>
      )}
    </Wrapper>
  );
};

const RecName = styled.div``;

const RecImgWrapper = styled.div`
  width: 170px;
  height: 170px;

  overflow: hidden;
  position: relative;
`;

const RecImg = styled.img`
  height: 100%;
  width: auto;
`;
const RecLink = styled(Link)``;

const RecipesWrapper = styled.div``;

const RecipeWrapper = styled.div``;

const NoRecipe = styled.div``;

const CreateBookButton = styled(NotStyledButton)``;
const EmptyBook = styled.div``;

const Wrapper = styled.div``;

const Title = styled.div``;

const Book = styled.div``;

export default ProfileCookBook;
