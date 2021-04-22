import React from "react";
import styled from "styled-components";
import { GrBook } from "react-icons/gr";

import PoppingCircle from "../../Animations/PoppingCirlce";
import Spin from "../../Animations/Spin";
import NotStyledButton from "../NoStyledButton";

const FollowButton = ({ onClick, isFollowed }) => {
  return isFollowed ? (
    <Wrapper onClick={onClick} isFollowed={isFollowed}>
      <PoppingCircle size="25" color="blue" />
      <Spin>
        <GrBook size="25" />
      </Spin>
    </Wrapper>
  ) : (
    <Wrapper onClick={onClick} isFollowed={isFollowed}>
      <GrBook size="25" />
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
    return props.isFollowed === true ? "rgb(165, 176, 240)" : "transparent";
  }};
  opacity: ${(props) => {
    return props.isFollowed === true ? "0.7" : "1";
  }};
`;

export default FollowButton;
