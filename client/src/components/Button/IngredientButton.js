import React, { useState } from "react";
import styled from "styled-components";

export const IngredientButton = ({ name, image, text }) => {
  const [hasItem, setHasItem] = useState(false);
  const handleHasItem = () => {
    setHasItem(!hasItem);
  };
  return (
    <IngredientItemButton hasItem={hasItem} onClick={handleHasItem}>
      {image && (
        <IngredientImage
          src={`https://spoonacular.com/cdn/ingredients_100x100/${image}`}
        />
      )}
      <SubText>{text}</SubText>
    </IngredientItemButton>
  );
};

const IngredientImage = styled.img`
  margin-right: 30px;
  width: 50px;
  height: 50px;
`;
const IngredientItemButton = styled.button`
  font-size: 20px;
  display: flex;
  justify-content: flex-start;
  font-weight: bold;
  opacity: ${(props) => {
    return props.hasItem === true ? "0.5" : "1";
  }};
  background: white;
  cursor: pointer;
  outline: none;
  border: none;
  border-radius: 5px;
  width: 350px;
  margin: 5px 0px;
  transition: 0.1s ease-in-out;
  transform: ${(props) =>
    props.hasItem === true ? `translate(-35%) scale(.9)` : `scale(1)`};
  &:hover {
    opacity: 0.8;
  }
  &:active {
    transform: scale(0.9);
  }
`;
const IngredientItem = styled.li`
  background: transparent;
`;
const SubText = styled.span``;
