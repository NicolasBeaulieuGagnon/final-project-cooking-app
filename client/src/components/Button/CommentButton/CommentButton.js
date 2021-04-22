import React from "react";
import { BiCommentDetail } from "react-icons/bi";
import styled from "styled-components";

import PoppingCircle from "../../Animations/PoppingCirlce";
import LiftUp from "../../Animations/LiftUp";
import NotStyledButton from "../NoStyledButton";

const CommentButton = ({ postId, animate, openCommentSection, onClick }) => {
  return animate ? (
    <Wrapper open={openCommentSection} onClick={onClick}>
      <PoppingCircle size="25" color="rgb(0, 183, 255)" />
      <LiftUp>
        <BiCommentDetail size="25" />
      </LiftUp>
    </Wrapper>
  ) : (
    <Wrapper open={openCommentSection} onClick={onClick}>
      <BiCommentDetail size="25" />
    </Wrapper>
  );
};

const Wrapper = styled(NotStyledButton)`
  padding-top: 5px;
  padding-bottom: 1px;
  padding-left: 5px;
  padding-right: 5px;
  margin: 5px;
  border-radius: 50px;
  background: ${(props) => {
    return props.open === true ? "rgb(0, 183, 255)" : "transparent";
  }};
  color: ${(props) => {
    return props.open === true ? "white" : "black";
  }};
`;

export default CommentButton;
