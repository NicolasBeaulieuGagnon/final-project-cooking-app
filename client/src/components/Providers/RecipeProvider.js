import React, { createContext, useState, useEffect } from "react";
export const RecipeContext = createContext(null);

export const RecipeProvider = ({ children }) => {
  const [isGettingRecipe, setIsGettingRecipe] = useState(true);
  const [filteredRecipe, setFilteredRecipe] = useState([]);
  const [filterInformation, setFilterInformation] = useState([]);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (filterInformation.length > 1 && filterInformation[0] !== null) {
      fetch("/apiKey").then((res) => {
        res.json().then((data) => {
          console.log(filterInformation);
          if (
            (filterInformation[1] === "no" ||
              filterInformation[1] === "none of these") &&
            (filterInformation[3] === "no" ||
              filterInformation[3] === "none of these")
          ) {
            setUrl(
              `https://api.spoonacular.com/recipes/random?apiKey=${data.data}`
            );
          } else if (
            filterInformation[1] === "no" ||
            filterInformation[1] === "none of these"
          ) {
            setUrl(
              `https://api.spoonacular.com/recipes/complexSearch?apiKey=${data.data}&${filterInformation[2]}=${filterInformation[3]}&number=3`
            );
          } else if (
            filterInformation[3] === "no" ||
            filterInformation[3] === "none of these"
          ) {
            setUrl(
              `https://api.spoonacular.com/recipes/complexSearch?apiKey=${data.data}&${filterInformation[0]}=${filterInformation[1]}&number=3`
            );
          } else {
            setUrl(
              `https://api.spoonacular.com/recipes/complexSearch?apiKey=${data.data}&${filterInformation[0]}=${filterInformation[1]}&${filterInformation[2]}=${filterInformation[3]}&number=3`
            );
          }
        });
      });
    }
  }, [isGettingRecipe]);

  useEffect(() => {
    if (url) {
      console.log("calling question recipe API");
      console.log(url);
      fetch(url).then((res) => {
        res.json().then((data) => {
          setFilteredRecipe(data.results);
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
