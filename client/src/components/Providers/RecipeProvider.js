import React, { createContext, useState, useEffect } from "react";
export const RecipeContext = createContext(null);

export const RecipeProvider = ({ children }) => {
  const [isGettingRecipe, setIsGettingRecipe] = useState(true);
  const [filteredRecipe, setFilteredRecipe] = useState([]);
  const [filterInformation, setFilterInformation] = useState([]);
  const [fullArray, setFullArray] = useState([]);
  const [retryRandom, setRetryRandom] = useState(true);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (filterInformation.length > 1 && filterInformation[0] !== null) {
      fetch("/apiKey").then((res) => {
        res.json().then((data) => {
          if (
            (filterInformation[1] === "no" ||
              filterInformation[1] === "none of these") &&
            (filterInformation[3] === "no" ||
              filterInformation[3] === "none of these")
          ) {
            setUrl(
              `https://api.spoonacular.com/recipes/random?apiKey=${data.data}&number=50`
            );
          } else if (
            filterInformation[1] === "no" ||
            filterInformation[1] === "none of these"
          ) {
            setUrl(
              `https://api.spoonacular.com/recipes/complexSearch?apiKey=${data.data}&${filterInformation[2]}=${filterInformation[3]}&number=50`
            );
          } else if (
            filterInformation[3] === "no" ||
            filterInformation[3] === "none of these"
          ) {
            setUrl(
              `https://api.spoonacular.com/recipes/complexSearch?apiKey=${data.data}&${filterInformation[0]}=${filterInformation[1]}&number=50`
            );
          } else {
            setUrl(
              `https://api.spoonacular.com/recipes/complexSearch?apiKey=${data.data}&${filterInformation[0]}=${filterInformation[1]}&${filterInformation[2]}=${filterInformation[3]}&number=50`
            );
          }
        });
      });
    }
  }, [isGettingRecipe]);

  let numOne;
  let numTwo;
  let numThree;

  const getRandomNumber = (array) => {
    numOne = Math.round(Math.random() * (array.length - 1));
    numTwo = Math.round(Math.random() * (array.length - 1));
    numThree = Math.round(Math.random() * (array.length - 1));

    if (numOne === numTwo || numOne === numThree || numTwo === numThree) {
      setRetryRandom(!retryRandom);
      return false;
    } else {
      return [numOne, numTwo, numThree];
    }
  };

  useEffect(() => {
    if (fullArray?.length > 3) {
      const result = getRandomNumber(fullArray);
      if (result) {
        setFilteredRecipe([
          fullArray[result[0]],
          fullArray[result[1]],
          fullArray[result[2]],
        ]);
      }
    } else {
      setFilteredRecipe(fullArray);
    }
  }, [retryRandom, url, fullArray]);

  useEffect(() => {
    if (url) {
      fetch(url).then((res) => {
        res.json().then((data) => {
          if (data.recipes) {
            setFullArray(data.recipes);
          } else {
            setFullArray(data.results);
          }
        });
      });
    }
  }, [url]);

  return (
    <RecipeContext.Provider
      value={{
        isGettingRecipe,
        setIsGettingRecipe,
        filteredRecipe,
        filterInformation,
        setFilterInformation,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
