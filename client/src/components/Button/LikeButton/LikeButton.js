import React from "react";
import { HiOutlineThumbUp } from "react-icons/hi";
import styled from "styled-components";
import NotStyledButton from "../NoStyledButton";

const LikeButton = ({ onClick, isLiked }) => {
  return (
    <Wrapper onClick={onClick} isLiked={isLiked}>
      <HiOutlineThumbUp size="25" />
    </Wrapper>
  );
};

const Wrapper = styled(NotStyledButton)`
  background: ${(props) => {
    return props.isLiked === true ? "gray" : "white";
  }};
`;

export default LikeButton;
