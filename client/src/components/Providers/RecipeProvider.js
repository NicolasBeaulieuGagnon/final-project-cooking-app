import React, { createContext, useState, useEffect } from "react";
export const RecipeContext = createContext(null);

export const RecipeProvider = ({ children }) => {
  const [filteredRecipe, setFilteredRecipe] = useState([]);
  const [filterInformation, setFilterInformation] = useState([]);
  console.log(filterInformation);
  if (filterInformation.length > 1 && filterInformation[0] !== null) {
    console.log("made it here... calling API");

    fetch("/apiKey").then((res) => {
      res.json().then((data) => {
        const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${data.data}&${filterInformation[0]}=${filterInformation[1]}&${filterInformation[2]}=${filterInformation[3]}&number=3`;
        console.log(url);

        fetch(url).then((res) => {
          res.json().then((data) => {
            console.log(data);
          });
        });
      });
    });
  }

  return (
    <RecipeContext.Provider
      value={{ filteredRecipe, filterInformation, setFilterInformation }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
