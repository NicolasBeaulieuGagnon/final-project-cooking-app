import React from "react";
import styled, { keyframes } from "styled-components";

const PoppingCircle = ({ size, color }) => {
  return (
    <>
      <Wrapper size={size} color={color}></Wrapper>
    </>
  );
};

const fill = keyframes`
0% {transform:scale(0)};
100%{transform:scale(1)}
`;
const fade = keyframes`
0%{opacity:1};
100%{opacity:0};


`;
const Wrapper = styled.div`
  z-index: 1;
  border-radius: 50%;
  position: absolute;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background-color: ${(props) => props.color};
  animation: ${fill} 500ms forwards, ${fade} 700ms forwards;
`;

export default PoppingCircle;
