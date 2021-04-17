import React from "react";
import styled from "styled-components";

import Choice from "./Choice";

const Question = ({ chosenQuestions }) => {
  return (
    <Wrapper>
      {chosenQuestions.length > 0 &&
        chosenQuestions[0] !== undefined &&
        chosenQuestions.map((question, index) => {
          return (
            <QuestionWrapper key={question._id} id={question._id}>
              {question.question}
              <Choice
                questionId={question._id}
                index={index}
                options={question.options}
              />
            </QuestionWrapper>
          );
        })}
    </Wrapper>
  );
};

const QuestionWrapper = styled.div`
  font-size: 20px;
  margin: 10px;
  padding: 20px;
  border-radius: 2px;
  box-shadow: 0 0.5px 3px 1px var(--primary-border-color);
`;
const Wrapper = styled.div`
  background: var(--primary-bg-color);
  border-radius: 2px;
`;
export default Question;
