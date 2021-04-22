import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import { IngredientButton } from "../Button/IngredientButton";
import { LoggedInUserContext } from "../Providers/LoggedInUserProvider";
import MainStyledButton from "../Button/MainStyledButton";

const Recipe = () => {
  const [fullRecipe, setFullRecipe] = useState(null);
  const [ownsThisRecipe, setOwnsThisRecipe] = useState(false);

  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const { loggedInUser, updatingUser, setUpdatingUser } = useContext(
    LoggedInUserContext
  );

  const { recipeId } = useParams();

  useEffect(() => {
    if (loggedInUser.hasCookBook === false) {
      const button = document.getElementById("addToCookBookButton");
      if (button) {
        button.disabled = true;
      }
    } else {
      const button = document.getElementById("addToCookBookButton");
      if (button) {
        button.disabled = false;
      }
    }
    if (
      localStorage.getItem("logged in") === "true" &&
      loggedInUser.hasCookBook &&
      fullRecipe
    ) {
      fetch(`/cookbook/${loggedInUser.cookBook}`).then((res) =>
        res.json().then((data) => {
          const recipes = data.data.recipes;
          const owns = recipes.every((recipe) => {
            return recipe.recipeId !== fullRecipe.id;
          });
          setOwnsThisRecipe(!owns);
        })
      );
    }
  }, [loggedInUser, fullRecipe]);
  useEffect(() => {
    if (fullRecipe) {
      const description = document.getElementById("recipeDescription");
      const cutPoint = fullRecipe.summary.indexOf("All things");
      const newSummary = fullRecipe.summary.slice(0, cutPoint);
      description.innerHTML = newSummary;
    }
  }, [fullRecipe]);

  useEffect(() => {
    fetch(`/apiKey`).then((res) => {
      res.json().then((data) => {
        const url = `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=${data.data}`;
        fetch(url).then((res) =>
          res.json().then((data) => {
            setFullRecipe(data);
          })
        );
      });
    });
  }, [recipeId]);
  const handleAddToCookBook = () => {
    const newRecipeObj = {
      recipes: [
        {
          recipeId: fullRecipe.id,
          recipeTitle: fullRecipe.title,
          recipeImage: fullRecipe.image,
        },
      ],
    };
    fetch(`/cookbook/${loggedInUser.cookBook}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecipeObj),
    }).then((res) => {
      res.json().then((data) => {
        if (data.status === 202) {
          setOwnsThisRecipe(true);
          setUpdatingUser(!updatingUser);
        }
      });
    });
  };
  return (
    <>
      {fullRecipe && (
        <Wrapper
          style={{
            backgroundImage: `url(${fullRecipe.image})`,
            backgroundSize: `100%`,
            backgroundRepeat: `no-repeat`,
          }}
        >
          <RecipeWrapper>
            <Title>{fullRecipe.title}</Title>

            <RecipeInfoWrapper>
              <DetailedInfoWrapper>
                <DetailedInfo>
                  Ready Time : <Bold>{fullRecipe.readyInMinutes} minutes</Bold>
                </DetailedInfo>
                <DetailedInfo>
                  Cost :{" "}
                  <Bold>
                    {formatter.format(
                      (fullRecipe.servings * fullRecipe.pricePerServing) / 100
                    )}
                  </Bold>
                </DetailedInfo>
                <DetailedInfo>
                  Servings:
                  <Bold>{fullRecipe.servings}</Bold>
                </DetailedInfo>
                {loggedInUser.hasCookBook ? (
                  ownsThisRecipe ? (
                    <OwnedRecipe>In Cookbook</OwnedRecipe>
                  ) : (
                    <AddCookBookBtn
                      id="addToCookBookButton"
                      onClick={handleAddToCookBook}
                    >
                      {" "}
                      Add to Cook book{" "}
                    </AddCookBookBtn>
                  )
                ) : (
                  <OwnedRecipe>
                    Create a cookbook to keep this recipe
                  </OwnedRecipe>
                )}
              </DetailedInfoWrapper>
              <RecipeDescription id="recipeDescription"></RecipeDescription>

              <Ingredients>
                Ingredients
                <SubText>check off what you have</SubText>
                <IngredientsItemsList>
                  {fullRecipe.extendedIngredients.map((ing, index) => {
                    return (
                      <IngredientButton
                        key={index}
                        name={ing.name}
                        image={ing.image}
                        text={ing.originalString}
                      />
                    );
                  })}
                </IngredientsItemsList>
              </Ingredients>
            </RecipeInfoWrapper>
            <StepsWrapper>
              Steps:
              {fullRecipe.analyzedInstructions.length > 0 ? (
                <StepsItemList>
                  {fullRecipe.analyzedInstructions[0].steps.map((step) => {
                    return (
                      <StepWrapper key={step.number}>
                        <StepNumber>{step.number}</StepNumber>
                        {step.ingredients.length > 0 &&
                          step.ingredients.map((ingredient) => {})}
                        <StepItem>{step.step}</StepItem>
                        <StepBorder />
                      </StepWrapper>
                    );
                  })}
                </StepsItemList>
              ) : (
                <NoInstructionsDiv>
                  {" "}
                  No Instructions came with this Recipe Unfortunetly.
                </NoInstructionsDiv>
              )}
            </StepsWrapper>
          </RecipeWrapper>
        </Wrapper>
      )}
    </>
  );
};
const NoInstructionsDiv = styled.div``;
const Title = styled.h1`
  text-shadow: 2px -2px 5px white;
  position: relative;
  margin: 0;
  padding-top: 30px;
  padding-bottom: 30px;
  padding-left: 10px;
  border-bottom: 4px solid var(--dark-accent);
  box-shadow: 0 2px 9px 0.1px var(--dark-accent);
`;

const AddCookBookBtn = styled(MainStyledButton)`
  bottom: 5px;
  right: 10px;
`;
const OwnedRecipe = styled.div`
  cursor: default;
  background: var(--btn-bg-color);
  margin-left: 10px;
  font-size: 22px;
  font-weight: bold;
  position: absolute;
  border-radius: 3px;
  padding: 2px 10px;
  box-shadow: 0px 0px 10px 0.1px var(--slight-box-shadow);
  bottom: 0;
  right: 5px;
`;

const RecipeWrapper = styled.div`
  background: rgb(7, 9, 82, 0.2);
  width: 100%;
`;

const Bold = styled.span`
  background: var(--primary-bg-color);
  font-weight: bold;
  padding-left: 5px;
`;
const DetailedInfo = styled.div`
  background: var(--primary-bg-color);
  padding: 2px 50px;
`;
const DetailedInfoWrapper = styled.div`
  position: relative;
  background: var(--primary-bg-color);
  padding: 20px 0 50px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  border-bottom: 5px solid var(--dark-accent);
  box-shadow: 0 5px 30px 0.5px var(--dark-accent);
`;
const SubText = styled.span`
  background: transparent;
  font-style: italic;
  font-weight: normal;
  margin-left: 20px;
  font-size: 16px;
`;
const RecipeInfoWrapper = styled.div`
  position: relative;
  z-index: 1;
  background: transparent;
  border-bottom: 5px solid var(--dark-accent);
  box-shadow: 0 5px 20px 0.1px var(--dark-accent);
`;
const RecipeDescription = styled.div`
  margin: 20px 25px 50px 25px;
  padding: 5px;
  border-radius: 5px;
  border: 2px solid var(--dark-accent);
  box-shadow: 0 0 10px 0.1px var(--slight-box-shadow);
  background: white;
  max-height: 200px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 2px;
  }
`;
const Ingredients = styled.div`
  background: transparent;
  font-weight: bold;
  margin-left: 20px;
`;
const IngredientsItemsList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;
  list-style-type: none;
`;

const StepsWrapper = styled.div`
  font-size: 30px;
  border: 5px solid var(--dark-accent);
  border-top: none;
  margin: 0% 7%;
  padding: 50px 20px;
  font-weight: bold;
`;

const StepNumber = styled.div`
  font-size: 30px;
  position: absolute;
  left: -35px;
  top: -2px;
`;
const StepsItemList = styled.ul`
  list-style-type: none;
`;
const StepBorder = styled.div`
  margin: 10px 0;
  opacity: 0.5;
  border: 2px solid var(--dark-accent);
  border-radius: 5px;
  width: 95%;
`;
const StepItem = styled.li``;
const StepWrapper = styled.div`
  position: relative;

  font-size: 25px;
`;

const Wrapper = styled.div`
  font-size: 22px;
  position: relative;
`;

export default Recipe;
