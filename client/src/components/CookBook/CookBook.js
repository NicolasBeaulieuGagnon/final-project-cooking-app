import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";

import CookBookRecipeCard from "./CookBookRecipeCard";
import cookBookIcon from "../../assets/designIcons/cookbook.png";
import toolsBannerBg from "../../assets/designIcons/toolsBanner.jpg";

const CookBook = () => {
  const [cookBook, setCookBook] = useState({});
  const { cookbookId } = useParams();

  useEffect(() => {
    if (cookbookId) {
      fetch(`/cookbook/${cookbookId}`).then((res) => {
        res.json().then((data) => {
          setCookBook(data.data);
        });
      });
    }
  }, [cookbookId]);
  console.log(cookBook);

  return (
    <Wrapper>
      {cookBook.creator && (
        <>
          <Title>
            {cookBook.cookBookName}
            <CookBookIcon src={cookBookIcon} />
            <InfoWrapper>
              <InfoTitle>
                Created :<Info>{moment(cookBook.created).format("LL")}</Info>
              </InfoTitle>
              <InfoTitle>
                By:
                <StyledLink to={`/profile/${cookBook.creator.authorId}`}>
                  <Info>{cookBook.creator.author}</Info>
                </StyledLink>
              </InfoTitle>
              <InfoTitle>
                {" "}
                Holds <Info>{cookBook.recipes.length} recipes.</Info>
              </InfoTitle>
            </InfoWrapper>
          </Title>
          <Recipes>
            {cookBook.recipes.map((recipe, index) => {
              return <CookBookRecipeCard index={index} recipe={recipe} />;
            })}
          </Recipes>
        </>
      )}
    </Wrapper>
  );
};

const Title = styled.h1`
  background: rgb(212, 212, 212, 0.8);
  position: relative;
  font-size: 50px;
  border-bottom: 2px solid var(--dark-accent);
  padding-top: 50px;
  margin: 0;
  padding-bottom: 50px;
  padding-left: 110px;
  box-shadow: 0 5px 20px 0.5px var(--slight-box-shadow);
`;

const CookBookIcon = styled.img`
  position: absolute;
  top: 25%;
  left: 10px;
  width: 100px;
`;
const Wrapper = styled.div`
  background-image: ${`url(${toolsBannerBg})`};
  background-size: 100%;
  position: relative;
`;
const Info = styled.span`
  font-weight: normal;
  font-style: italic;
`;

const InfoTitle = styled.div``;
const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

const Recipes = styled.div`
  width: 100%;
  background: var(--dark-accent);
  box-shadow: 0 0 20px 0.5px var(--slight-box-shadow);
  padding: 50px 10px;
  padding-top: 150px;
  display: flex;
  flex-wrap: wrap;
`;

const InfoWrapper = styled.div`
  font-size: 20px;
  font-weight: bold;
  position: absolute;
  right: 2%;
  bottom: -90px;
  margin-top: 40px;
  border-radius: 2px;
  border: 2px solid var(--dark-accent);
  padding: 20px 50px;
`;
export default CookBook;
