import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import moment from "moment";

import MainStyledButton from "../Button/MainStyledButton";
import CookBookRecipeCard from "../CookBook/CookBookRecipeCard";

// the user's profile cookbook mini page used in Profile.js
const ProfileCookBook = ({ loggedInUser, user, cookBook }) => {
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
              <RecipesWrapper
                style={{ paddingLeft: "5px", paddingRight: "5px" }}
              >
                {cookBook.recipes.map((recipe, index) => {
                  return <CookBookRecipeCard recipe={recipe} index={index} />;
                })}
              </RecipesWrapper>
            ) : (
              <NoRecipe>This is the start of something great...</NoRecipe>
            )}
          </Book>
        </>
      ) : user._id === loggedInUser._id ? (
        <EmptyBook>
          <Title>Create your own Cookbook!</Title>
          <Border />
          <CreateBookButton
            onClick={() => {
              history.push(`/createCookBook`);
            }}
          >
            create
          </CreateBookButton>
        </EmptyBook>
      ) : (
        <EmptyBook>
          <Title>{user.userName} has no Cookbook yet!</Title>
          <Border />
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
  padding: 1px 40px;
  display: flex;
  flex-wrap: wrap;
`;

const NoRecipe = styled.div``;

const CreateBookButton = styled(MainStyledButton)`
  font-size: 35px;
  font-weight: bold;
  margin-top: 30px;
  left: 50%;
  transform: translate(-50%);
  &:hover {
    transform: translate(-50%) scale(1.2);
  }
`;
const EmptyBook = styled.div`
  height: 300px;
`;

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
