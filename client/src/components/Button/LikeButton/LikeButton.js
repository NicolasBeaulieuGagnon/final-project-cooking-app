import React from "react";
import { HiOutlineThumbUp } from "react-icons/hi";
import styled from "styled-components";
import NotStyledButton from "../NoStyledButton";

import ScaleIn from "../../Animations/ScaleIn";
import PoppingCircle from "../../Animations/PoppingCirlce";

const LikeButton = ({ onClick, isLiked }) => {
  return isLiked ? (
    <>
      <Wrapper onClick={onClick} isLiked={isLiked}>
        <PoppingCircle size="25" color="green" />
        <ScaleIn>
          <HiOutlineThumbUp
            fill={isLiked === true ? `rgb(4, 186, 34)` : "white"}
            size="25"
          />
        </ScaleIn>
      </Wrapper>
    </>
  ) : (
    <Wrapper onClick={onClick} isLiked={isLiked}>
      <HiOutlineThumbUp
        fill={isLiked === true ? `rgb(4, 186, 34)` : "white"}
        size="25"
      />
    </Wrapper>
  );
};

const Wrapper = styled(NotStyledButton)`
  background: ${(props) => {
    return props.isLiked === true ? "rgb(49, 189, 74,0.5)" : "transparent";
  }};
  padding-top: 3px;
  padding-bottom: 3px;
  padding-left: 5px;
  padding-right: 5px;
  margin: 5px;
  border-radius: 50px;
  color: ${(props) => {
    return props.isLiked === true ? "rgb(4, 43, 11)" : "black";
  }};
`;

export default LikeButton;
