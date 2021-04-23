import React from "react";
import styled from "styled-components";
import NotStyledButton from "../Button/NoStyledButton";

// each ingredient in the IngredientsArray from the InFridge.js
const Ingredient = ({ onClick, item }) => {
  return (
    <Item key={item}>
      <Wrapper>
        <RemoveItem id={item} onClick={onClick}>
          x
        </RemoveItem>
        {item}
      </Wrapper>
    </Item>
  );
};

const Item = styled.li``;
const Wrapper = styled.div``;

const RemoveItem = styled(NotStyledButton)``;

export default Ingredient;
