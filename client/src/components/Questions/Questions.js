import React, { useState, useEffect, useContext } from "react";
import styled, { keyframes } from "styled-components";
import { AiOutlineReload } from "react-icons/ai";

import NotStyledButton from "../Button/NoStyledButton";
import Question from "./Question";
import { RecipeContext } from "../Providers/RecipeProvider";
import QuestionRecipeResult from "../Recipe/QuestionRecipeResult";
import { MdKeyboardArrowUp } from "react-icons/md";

const Questions = () => {
  const [questionsArray, setQuestionsArray] = useState([]);
  const [chosenQuestions, setChosenQuestion] = useState([]);
  const [retry, setRetry] = useState(0);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(0);
  const {
    setFilterInformation,
    isGettingRecipe,
    setIsGettingRecipe,
  } = useContext(RecipeContext);

  useEffect(() => {
    sessionStorage.clear();

    const qstWrapper = document.getElementById("questionWrapper");
    qstWrapper.style.height = "380px";

    fetch("/questions").then((res) => {
      res.json().then((data) => {
        setQuestionsArray(data.data);
      });
    });
    return () => {
      sessionStorage.clear();
      if (isCollapsed === 1) {
        handleCollapse();
      }
    };
  }, []);
  useEffect(() => {
    setIsLoadingQuestions(true);
    setTimeout(() => {
      setIsLoadingQuestions(false);
    }, 700);
    setChosenQuestion([]);
    const firstRandomNum = Math.round(
      Math.random() * (questionsArray.length - 1)
    );
    const secondRandomNum = Math.round(
      Math.random() * (questionsArray.length - 1)
    );

    if (firstRandomNum === secondRandomNum) {
      setRetry(retry + 1);
    }
    setChosenQuestion([
      questionsArray[firstRandomNum],
      questionsArray[secondRandomNum],
    ]);
  }, [retry, questionsArray]);

  const handleFetchRecipe = () => {
    if (sessionStorage.length > 0) {
      const qstWrapper = document.getElementById("questionWrapper");
      qstWrapper.style.height = "0px";
      let filterOne = {};
      let filterTwo = {};
      filterOne[sessionStorage.key(0)] = sessionStorage.getItem(
        sessionStorage.key(0)
      );
      filterTwo[sessionStorage.key(1)] = sessionStorage.getItem(
        sessionStorage.key(1)
      );
      setFilterInformation([
        sessionStorage.key(0),
        sessionStorage.getItem(sessionStorage.key(0)),

        sessionStorage.key(1),
        sessionStorage.getItem(sessionStorage.key(1)),
      ]);
      setIsGettingRecipe(!isGettingRecipe);
      sessionStorage.clear();
      setTimeout(() => {
        if (isCollapsed === 0) {
          handleCollapse();
        }
      }, 800);
    }
  };

  const handleNewQuestions = () => {
    if (isCollapsed === 1) {
      handleCollapse();
    }

    sessionStorage.clear();
    setRetry(retry + 1);
    const qstWrapper = document.getElementById("questionWrapper");
    qstWrapper.style.height = "380px";
  };

  const handleCollapse = () => {
    const choicesDisplay = document.getElementById("choicesWrapper");
    const recipeDisplayHeight = document.getElementById("choicesRecipeWrapper");
    if (recipeDisplayHeight) {
      if (isCollapsed === 0) {
        choicesDisplay.style.height = `${
          recipeDisplayHeight.offsetHeight + 30
        }px`;
        setIsCollapsed(1);
      } else if (isCollapsed === 1) {
        setIsCollapsed(2);
        choicesDisplay.style.height = "0px";
        setTimeout(() => {
          setIsCollapsed(0);
        }, 400);
      }
    }
  };
  return (
    <>
      <Wrapper>
        <QuestionWrapper id="questionWrapper">
          {isLoadingQuestions ? (
            <LoadingDiv>
              <AiOutlineReload size="50px" />
            </LoadingDiv>
          ) : (
            <Question chosenQuestions={chosenQuestions} />
          )}
        </QuestionWrapper>
        <NewQuestionsButton onClick={handleNewQuestions}>
          Questions
        </NewQuestionsButton>
        {isCollapsed === 0 ? (
          <ArrowButton onClick={handleCollapse}>
            <Spin>
              <MdKeyboardArrowUp size="20" />
            </Spin>
          </ArrowButton>
        ) : isCollapsed === 1 ? (
          <ArrowButton onClick={handleCollapse}>
            <OpenedSpin>
              <MdKeyboardArrowUp size="20" />
            </OpenedSpin>
          </ArrowButton>
        ) : (
          <ArrowButton onClick={handleCollapse}>
            <ClosedSpin>
              <MdKeyboardArrowUp size="20" />
            </ClosedSpin>
          </ArrowButton>
        )}

        <SubmitButton onClick={handleFetchRecipe} id="submitBtn">
          Submit
        </SubmitButton>
      </Wrapper>
      <QuestionRecipeResult />
    </>
  );
};

const load = keyframes`
0% {transform:rotate(0deg)}
100%{transform:rotate(360deg)}
`;
const halfSpin = keyframes`
0%{transform:rotate(0deg)}
100%{transform:rotate(180deg)}
`;
const otherHalfSpin = keyframes`
0%{transform:rotate(180deg)}
100%{transform:rotate(360deg)}
}
`;

const LoadingDiv = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: transparent;
  width: 50px;
  height: 50px;
  animation-name: ${load};
  animation-duration: 0.7s;
`;

const QuestionWrapper = styled.div`
  overflow: hidden;
  height: 0px;
  background: transparent;
  transition: 0.3s ease-in-out;
`;
const NewQuestionsButton = styled(NotStyledButton)`
  background: var(--btn-bg-color);
  margin-left: 10px;
  font-size: 22px;
  font-weight: bold;
  position: absolute;
  bottom: 2px;
  border-radius: 3px;
  padding: 2px 10px;
  box-shadow: 1px 1px 6px 0.1px rgb(120, 41, 15, 0.6);
  border: 2px solid rgb(120, 41, 15);
  transition: 0.1s ease-in-out;
  &:hover {
    background: rgb(255, 160, 71, 0.5);
  }
  &:active {
    transform: scale(0.9);
  }
`;

const Spin = styled.div`
  background: transparent;
  width: 20px;
  height: 20px;
`;
const ClosedSpin = styled(Spin)`
  animation-name: ${otherHalfSpin};
  animation-duration: 0.3s;
  animation-fill-mode: forwards;
`;
const OpenedSpin = styled(Spin)`
  animation-name: ${halfSpin};
  animation-duration: 0.3s;
  animation-fill-mode: forwards;
`;
const ArrowButton = styled(NewQuestionsButton)`
  margin: 0;
  padding: 0 10px;
  padding-top: 5px;
  bottom: -20px;
  left: 50%;
  transform: translate(-50%);
  &:hover {
    background: rgb(255, 217, 175);
  }
  &:active {
    transform: scale(1);
    transform: translate(-50%);
  }
`;

const SubmitButton = styled(NewQuestionsButton)`
  right: 20px;
`;
const Wrapper = styled.div`
  position: relative;
  font-size: 15px;
  font-weight: bold;
  background: var(--questions-bg-color);
  padding: 20px 10px;
`;
export default Questions;
