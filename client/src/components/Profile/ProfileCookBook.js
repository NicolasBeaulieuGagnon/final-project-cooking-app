import React from "react";
import styled from "styled-components";
import NotStyledButton from "../Button/NoStyledButton";
import { Link, useHistory } from "react-router-dom";

import moment from "moment";
import CookBookRecipeCard from "../CookBook/CookBookRecipeCard";

const ProfileCookBook = ({ user, cookBook }) => {
  const history = useHistory();

  return (
    <Wrapper>
      {cookBook ? (
        <>
          <Title>{cookBook.cookBookName}</Title>
          <Border />
          <Book>
            <BookInfo>
              <Info>
                Created: {moment(cookBook.created, "YYYYMMDD").fromNow()}
              </Info>
              <Info>holds {cookBook.recipes.length} recipes</Info>
            </BookInfo>
            {cookBook.recipes.length > 0 ? (
              <RecipesWrapper>
                {cookBook.recipes.map((recipe, index) => {
                  return <CookBookRecipeCard recipe={recipe} index={index} />;
                })}
              </RecipesWrapper>
            ) : (
              <NoRecipe>This is the start of something great...</NoRecipe>
            )}
          </Book>
        </>
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

const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  font-size: 20px;
  margin: 10px 0 0 40px;
`;

const Info = styled.div``;

const RecipesWrapper = styled.div`
  padding: 20px 40px;
  display: flex;
  flex-wrap: wrap;
`;

const NoRecipe = styled.div``;

const CreateBookButton = styled(NotStyledButton)``;
const EmptyBook = styled.div``;

const Wrapper = styled.div``;

const Title = styled.div`
  font-weight: bold;
  font-size: 30px;
  margin: 10px 0 0 40px;
`;

const Border = styled.div`
  margin-left: 20px;
  width: 90%;
  height: 3px;
  background: var(--dark-accent);
`;

const Book = styled.div``;

export default ProfileCookBook;
