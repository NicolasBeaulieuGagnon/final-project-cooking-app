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
  margin: 10px;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 0 10px 1px rgb(255, 160, 71, 0.2);
`;
const Wrapper = styled.div`
  background: var(--questions-bg-color);
`;
export default Question;
