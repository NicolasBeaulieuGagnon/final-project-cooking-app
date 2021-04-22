import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { HiOutlineArrowNarrowDown } from "react-icons/hi";
import { TiArrowBackOutline } from "react-icons/ti";

import logo from "../assets/designIcons/004-chef.png";

import { Link } from "react-router-dom";

const Homepage = () => {
  const history = useHistory();
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [displayedRecipe, setDisplayedRecipe] = useState(null);
  const [numberIncrease, setNumberIncrease] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("logged in") === "true") {
      history.push(`/newsFeed`);
    } else {
      fetch(`/apiKey`).then((res) => {
        res.json().then((data) => {
          fetch(
            `https://api.spoonacular.com/recipes/random?apiKey=${data.data}&number=10`
          ).then((res) => {
            res.json().then((data) => {
              setRandomRecipes(data.recipes);
            });
          });
        });
      });
    }
  }, []);

  useEffect(() => {
    setDisplayedRecipe(randomRecipes[0]);
  }, [randomRecipes]);

  useEffect(() => {
    if (randomRecipes.length > 0) {
      changeImage();
    }
  }, [randomRecipes, numberIncrease]);

  useEffect(() => {
    if (randomRecipes.length > 0) {
      const imageDiv = document.getElementById("changingImage");
      setTimeout(() => {
        if (imageDiv.style) {
          imageDiv.style.opacity = "1";
          setDisplayedRecipe(randomRecipes[numberIncrease]);
        }
      }, 400);
    }
  }, [numberIncrease]);

  const changeImage = () => {
    const imageDiv = document.getElementById("changingImage");
    if (numberIncrease === randomRecipes.length - 1) {
      setTimeout(() => {
        setNumberIncrease(0);
        if (imageDiv?.style) {
          imageDiv.style.opacity = "0";
        }
      }, 20000);
    } else {
      setTimeout(() => {
        setNumberIncrease((numberIncrease) => {
          return numberIncrease + 1;
        });
        if (imageDiv?.style) {
          imageDiv.style.opacity = "0";
        }
      }, 20000);
    }
  };

  return (
    <Wrapper>
      <Title>What's Cooking?</Title>
      {randomRecipes.length > 0 && displayedRecipe && (
        <>
          <ChangingImageWrapper
            id="changingImage"
            image={displayedRecipe.image}
          >
            <RecipeContent>
              <RecipeTitle>
                {displayedRecipe.title.length > 20
                  ? `${displayedRecipe.title.slice(0, 20)}...`
                  : displayedRecipe.title}
              </RecipeTitle>
              <StyledLink to={`/recipe/${displayedRecipe.id}`}>
                <ArrowDiv>
                  <TiArrowBackOutline size="50" />
                </ArrowDiv>
              </StyledLink>
              <RecipeInfoWrapper>
                <InfoTitle>
                  Ready in <Info>{displayedRecipe.readyInMinutes}</Info>{" "}
                  minutes.
                </InfoTitle>
                {displayedRecipe.analyzedInstructions[0]?.steps.length && (
                  <InfoTitle>
                    Only{" "}
                    <Info>
                      {displayedRecipe.analyzedInstructions[0].steps.length}
                    </Info>{" "}
                    steps.
                  </InfoTitle>
                )}
                <InfoTitle>
                  made with{" "}
                  <Info>{displayedRecipe.extendedIngredients.length}</Info>{" "}
                  ingredients.
                </InfoTitle>
              </RecipeInfoWrapper>
            </RecipeContent>
          </ChangingImageWrapper>
          <LogoImg src={logo} />
          <IntroWrapper>
            Welcome to <Info>What's Cooking</Info>. Here you will find all your
            recipe needs! If you are unsure as to how the site works. Please
            visit the About page found in our drop down menu.
          </IntroWrapper>
          <IntroWrapper>
            With this app you can connect with friends, share your discovered
            Recipes and follow your friends to alway see how their cookbook is
            doing!
          </IntroWrapper>
        </>
      )}
    </Wrapper>
  );
};

const LogoImg = styled.img`
  margin-top: 50px;
  width: 250px;
  transform: translate(50%);
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const IntroWrapper = styled.div`
  margin-top: 30px;
  padding: 10px 20px;
  font-weight: normal;
  font-size: 24px;
`;

const ArrowDiv = styled.div`
  color: black;
  position: absolute;
  background: transparent;
  bottom: -15px;
  left: 80%;
  height: 70px;
  width: 50px;
  transform: rotate(35deg);
  transition: 0.2s ease-in-out;

  &:hover {
    transform: rotate(-45deg);
  }
  &:active {
    transform: rotate(-85deg) scale(0.9);
  }
`;

const RecipeInfoWrapper = styled.div`
  background: rgb(134, 150, 163, 0.5);
  font-size: 23px;
  text-shadow: 0 0 6px black;
  color: white;
  font-weight: normal;
  display: flex;
  flex-direction: column;
  position: absolute;
  justify-content: flex-end;
  align-items: flex-end;
  position: absolute;
  right: 0;
  padding: 5px 20px;
  border-bottom-left-radius: 5px;
`;
const Info = styled.span`
  font-weight: bold;
  background: transparent;
`;
const InfoTitle = styled.div`
  background: transparent;
`;

const ChangingImageWrapper = styled.div`
  border-top: 2px solid var(--dark-accent);
  border-bottom: 2px solid var(--dark-accent);
  box-shadow: 0 0 10px 1px var(--slight-box-shadow);
  background-image: ${(props) => {
    return `url(${props.image})`;
  }};
  width: 100%;
  height: 300px;
  background-size: cover;
  transition: 0.5s ease-in-out;
`;

const Title = styled.div`
  margin-left: 20px;
  margin-bottom: 30px;
`;

const RecipeTitle = styled.div`
  background: var(--dropDown-bg-color);
  padding: 2px 5px;
  border-radius: 3px;
  border: 2px solid var(--primary-border-color);
  position: absolute;
  top: 255px;
  left: 10px;
  max-width: 400px;
  margin-right: 100px;
  font-size: 34px;
  font-weight: bold;
`;

const RecipeContent = styled.div`
  background: transparent;
  backdrop-filter: blur(5px);
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  padding: 30px 0;
  font-weight: bold;
  font-size: 50px;
`;

export default Homepage;
