import React, { useState, useEffect, useContext } from "react";
import styled, { keyframes } from "styled-components";
import { AiOutlineReload } from "react-icons/ai";

import NotStyledButton from "../Button/NoStyledButton";
import Question from "./Question";
import { RecipeContext } from "../Providers/RecipeProvider";

const Questions = () => {
  const [questionsArray, setQuestionsArray] = useState([]);
  const [chosenQuestions, setChosenQuestion] = useState([]);
  const [retry, setRetry] = useState(0);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);
  const { setFilterInformation } = useContext(RecipeContext);

  useEffect(() => {
    sessionStorage.clear();

    fetch("/questions").then((res) => {
      res.json().then((data) => {
        setQuestionsArray(data.data);
      });
    });
    return () => {
      sessionStorage.clear();
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
    sessionStorage.clear();
  };
  return (
    <>
      <Wrapper>
        {isLoadingQuestions ? (
          <LoadingDiv>
            <AiOutlineReload size="50px" />
          </LoadingDiv>
        ) : (
          <Question chosenQuestions={chosenQuestions} />
        )}
        <NewQuestionsButton
          onClick={() => {
            sessionStorage.clear();
            setRetry(retry + 1);
          }}
        >
          new questions
        </NewQuestionsButton>
        <SubmitButton onClick={handleFetchRecipe} id="submitBtn">
          Submit
        </SubmitButton>
      </Wrapper>
    </>
  );
};

const load = keyframes`
0% {transform:rotate(0deg)}
100%{transform:rotate(360deg)}
`;
const LoadingDiv = styled.div`
  position: relative;
  top: 40%;
  left: 42%;
  transform: translate(-50%, -50%);
  background: transparent;
  width: 50px;
  height: 50px;
  animation-name: ${load};
  animation-duration: 0.7s;
`;
const NewQuestionsButton = styled(NotStyledButton)`
  position: absolute;
  bottom: 10px;
`;

const SubmitButton = styled(NotStyledButton)`
  position: absolute;
  bottom: 10px;
  right: 15px;
`;
const Wrapper = styled.div`
  position: relative;
  height: 400px;
  font-size: 15px;
  font-weight: bold;
  background: var(--questions-bg-color);
  padding: 20px 10px;
`;
export default Questions;
