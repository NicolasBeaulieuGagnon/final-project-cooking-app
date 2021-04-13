import React, { useState, useEffect } from "react";
import styled from "styled-components";

import NotStyledButton from "../Button/NoStyledButton";

const Choice = ({ questionId, index, options }) => {
  const [shortOptions, setShortOptions] = useState([]);

  const randomChoicePicker = async () => {
    const OPTIONS_RETURNED = 4;
    for (let i = 0; i < OPTIONS_RETURNED; i++) {
      const randomNum = Math.round(Math.random() * (options.length - 1));
      setShortOptions((shortOptions) => [...shortOptions, options[randomNum]]);
    }
  };

  useEffect(() => {
    if (options.length > 6) {
      randomChoicePicker();
    } else {
      setShortOptions(options);
    }
  }, []);

  const handleSelect = (ev) => {
    const allChoices = document.getElementsByClassName(`${index}-choices`);
    for (let i = 0; i < allChoices.length; i++) {
      allChoices[i].style.borderBottom = "none";
    }
    const chosen = document.getElementById(ev.target.id);
    chosen.style.borderBottom = "2px solid rgb(255, 160, 71) ";

    sessionStorage.setItem(questionId, ev.target.innerText);
  };

  return (
    <Wrapper>
      {options &&
        options.length > 0 &&
        shortOptions.map((opt) => {
          return (
            <OptionButton
              className={`${index}-choices`}
              onClick={handleSelect}
              id={`${index}-${opt}`}
              key={opt}
            >
              {opt}
            </OptionButton>
          );
        })}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const OptionButton = styled(NotStyledButton)`
  font-size: 18px;
  margin: 7px;
  &:hover {
    opacity: 0.5;
  }
`;
export default Choice;
