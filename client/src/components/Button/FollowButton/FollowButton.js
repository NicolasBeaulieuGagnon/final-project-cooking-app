import React from "react";
import styled from "styled-components";
import { GrBook } from "react-icons/gr";
import NotStyledButton from "../NoStyledButton";

const FollowButton = ({ onClick, isFollowed }) => {
  return (
    <Wrapper onClick={onClick} isFollowed={isFollowed}>
      <GrBook size="20" />
    </Wrapper>
  );
};

const Wrapper = styled(NotStyledButton)`
  background: ${(props) => {
    return props.isFollowed === true ? "gray" : "white";
  }};
`;
export default FollowButton;
