import React from "react";
import { BiCommentDetail } from "react-icons/bi";
import styled from "styled-components";

const CommentButton = () => {
  return (
    <Wrapper>
      <BiCommentDetail size="25" />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default CommentButton;
