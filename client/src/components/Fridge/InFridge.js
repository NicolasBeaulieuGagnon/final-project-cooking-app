import React, { useEffect, useState } from "react";
import styled from "styled-components";

import MainStyledButton from "../Button/MainStyledButton";
import fridgeIcon from "../../assets/designIcons/012-fridge.png";
import FridgeRecipeResult from "./FridgeRecipeResult";
import Ingredient from "./Ingredient";

const InFridge = () => {
  const [ingredientsArray, setIngredientsArray] = useState([]);
  const [recipeResults, setRecipeResults] = useState([]);
  const [notFilteredRecipes, setNotFilteredRecipes] = useState([]);
  const [rankingChoice, setRankingChoice] = useState(0);
  const [retryRandom, setRetryRandom] = useState(false);

  // calls our function to get 3 random numbers, if they aren't restarts.
  // if they are all different it then looks at the array of notFilteredRecipes
  // and grabs 3 recipes with the random numbers found by us.

  useEffect(() => {
    if (notFilteredRecipes?.length > 3) {
      const result = getRandomNumber(notFilteredRecipes);

      if (result) {
        setRecipeResults([
          notFilteredRecipes[result[0]],
          notFilteredRecipes[result[1]],
          notFilteredRecipes[result[2]],
        ]);
      }
    } else {
      setRecipeResults(notFilteredRecipes);
    }
  }, [retryRandom, notFilteredRecipes]);

  // checks to see that their is at least 1 ingredient in the ingredientsArray before
  // letting you try to search.
  useEffect(() => {
    const searchButton = document.getElementById("searchFridgeButton");

    if (ingredientsArray.length > 0) {
      searchButton.disabled = false;
    } else {
      searchButton.disabled = true;
    }
  }, [ingredientsArray]);

  // Empties the setIngredientsArray incase it isn't for some reason
  // and auto focuses the cursor to the text input field.
  useEffect(() => {
    document.getElementById("textInputId").focus();
    setIngredientsArray([]);
  }, []);

  // gets 3 random numbers and only returns them if they are all different, if not return false
  const getRandomNumber = (array) => {
    let numOne = Math.round(Math.random() * (array.length - 1));
    let numTwo = Math.round(Math.random() * (array.length - 1));
    let numThree = Math.round(Math.random() * (array.length - 1));

    if (numOne === numTwo || numOne === numThree || numTwo === numThree) {
      setRetryRandom(!retryRandom);
      return false;
    } else {
      return [numOne, numTwo, numThree];
    }
  };

  // removes the item in the Ingredients array that is clicked on.
  const handleRemoveItem = (ev) => {
    const filteredArray = ingredientsArray.filter((item) => {
      return item !== ev.target.id;
    });

    setIngredientsArray(filteredArray);
  };

  // adds the input text to the ingredientsArray
  // checks to see if enter is pressed as well as click
  // for user friendlyness
  const handleAddItem = (ev) => {
    const item = document.getElementById("textInputId");
    if (ev.key === "Enter" || ev.target.id === "Enter") {
      if (item.value.length > 2) {
        setIngredientsArray((ingredientsArray) => [
          ...ingredientsArray,
          item.value,
        ]);
        setTimeout(() => {
          item.value = "";
        });
      }
    }
  };

  const handleCloseResults = () => {
    const resultsWrapper = document.getElementById("resultWrapperId");

    resultsWrapper.style.opacity = "0";
    resultsWrapper.style.visibility = " hidden";
  };

  // starts the search, first checks if a ranking filter was chosen by the user
  // if not doesn't add it to the url
  const handleSearch = () => {
    setRecipeResults([]);
    let searchString = ingredientsArray.toString();
    fetch(`/apiKey`).then((res) => {
      res.json().then((data) => {
        const key = data.data;
        let url;
        if (rankingChoice !== 0) {
          url = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${key}&ingredients=${searchString}&ranking=${rankingChoice}&number=50`;
        } else {
          url = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${key}&ingredients=${searchString}&number=50`;
        }

        // once the fetch is done set's the fridge ingredients input by the user back ot nothing
        // and sets the 50 recipes found by the Api in notFilterRecipes
        fetch(url).then((res) => {
          res.json().then((data) => {
            setNotFilteredRecipes(data);
            setIngredientsArray([]);
          });
        });
      });
    });
    // makes the FridgeRecipeResult pop up with the recipeResults.
    const resultWrapper = document.getElementById("resultWrapperId");

    resultWrapper.style.opacity = "1";
    resultWrapper.style.visibility = "visible";
  };

  return (
    <>
      <Wrapper>
        <FridgeWrapper>
          <FridgeBackground id="fridge-bg" />
          <FridgeIconWrapper>
            <FridgeIcon src={fridgeIcon} />
          </FridgeIconWrapper>
          <TextInput
            placeholder="what's in your fridge?"
            onKeyDown={handleAddItem}
            type="text"
            id="textInputId"
          />
          <AddButton id="Enter" onClick={handleAddItem}>
            Add
          </AddButton>
          <RadioWrapper>
            <Span>
              <RadioChoice
                onClick={() => {
                  setRankingChoice(1);
                }}
                type="radio"
                id="minimize"
                name="ranking"
                value="minimize"
              />
              <RadioLabel htmlFor="minimize">
                Prioritize using all the ingredients in my fridge
              </RadioLabel>
            </Span>
            <Span>
              <RadioChoice
                onClick={() => {
                  setRankingChoice(2);
                }}
                type="radio"
                id="maximize"
                name="ranking"
                value="maximize"
              />
              <RadioLabel htmlFor="maximize">
                Prioritize not having to buy ingredients
              </RadioLabel>
            </Span>
            <Span>
              <RadioChoice
                onClick={() => {
                  setRankingChoice(null);
                }}
                type="radio"
                id="neither"
                name="ranking"
                value="neither"
              />
              <RadioLabel htmlFor="neither">Neither</RadioLabel>
            </Span>
          </RadioWrapper>

          <IngredientsWrapper>
            Inputs:
            {ingredientsArray.length > 0 &&
              ingredientsArray.map((item, index) => {
                return (
                  <Ingredient
                    key={`${item}-${index}`}
                    onClick={handleRemoveItem}
                    item={item}
                  />
                );
              })}
          </IngredientsWrapper>
          <SearchButton onClick={handleSearch} id="searchFridgeButton">
            Search
          </SearchButton>
        </FridgeWrapper>
      </Wrapper>
      <ResultWrapper id="resultWrapperId">
        <FridgeRecipeResult
          onClick={handleCloseResults}
          recipeResults={recipeResults}
        />
      </ResultWrapper>
    </>
  );
};

const Span = styled.span`
  background: transparent;
  padding: 10px;
  padding-left: 5%;
`;

const FridgeWrapper = styled.div`
  font-weight: bold;
  font-size: 20px;
  height: 100%;
  background: rgb(212, 212, 212, 0.8);
  display: flex;
  flex-direction: column;
`;
const ResultWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 90%;
  height: 75%;
  border: 2px solid var(--primary-border-color);
  box-shadow: 0 0 20px 4px var(--slight-box-shadow);
  margin: 5%;
  border-radius: 3px;
  margin-top: var(--nav-height);
  overflow-y: scroll;
  transition: 0.4s ease-in-out;
  visibility: hidden;
  opacity: 0;
`;

const RadioWrapper = styled.div`
  position: absolute;

  left: 50%;
  transform: translate(-50%);
  top: 650px;
  width: 100%;
  background: rgb(212, 212, 212, 0.8);
  display: flex;
  flex-direction: column;
`;

const IngredientsWrapper = styled.ul`
  margin: 0;
  padding: 10px 20px;
  font-size: 22px;
  position: absolute;
  top: 415px;
  width: 232px;
  height: 190px;
  left: 50%;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  &::-webkit-scrollbar-track {
    background: black;
  }
  transform: translate(-50%);
  margin-left: 2.5px;
  overflow-y: scroll;
  list-style-type: none;
`;

const FridgeBackground = styled.div`
  background: white;
  position: absolute;
  top: 160px;
  left: 50%;
  transform: translate(-50%);
  width: 240px;
  border-radius: 5px;
  margin-top: 19px;
  height: 435px;
`;
const Wrapper = styled.div`
  background-size: cover;
  height: 100%;
`;

const FridgeIconWrapper = styled.div`
  width: 310px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 150px;
  left: 50%;
  transform: translate(-50%);
  background: transparent;
  overflow: hidden;
`;

const FridgeIcon = styled.img`
  width: auto;
  height: 100%;
`;

const TextInput = styled.input`
  font-weight: bold;
  width: 224px;
  border: none;
  outline: none;
  background: var(--light-bg-color);
  font-size: 20px;
  position: absolute;
  height: 50px;
  top: 365px;
  left: 50%;
  transform: translate(-50%);
`;

const RadioLabel = styled.label``;
const RadioChoice = styled.input``;

const SearchButton = styled(MainStyledButton)`
  left: 50%;
  top: 810px;
  font-size: 35px;
  margin-left: 0;
  transform: translate(-50%) scale(1);
  &:hover {
    transform: translate(-50%) scale(1.05);
  }
  &:active {
    transform: translate(-50%) scale(0.8);
  }
`;

const AddButton = styled(SearchButton)`
  border: 12px solid black;
  border-top-left-radius: 20px;
  font-size: 35px;
  padding: 10px 20px;
  margin-left: 67px;
  left: 50%;
  top: 270px;
  &:hover {
    transform: translate(-55%, -5%) scale(1.1);
  }
  &:active {
    transform: translate(-50%, 0) scale(0.9);
  }
`;

export default InFridge;
