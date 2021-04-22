import React from "react";
import styled, { keyframes } from "styled-components";

const Loading = ({ size, children }) => {
  return <Wrapper size={size}>{children}</Wrapper>;
};

const spin = keyframes`
0%{transform: rotate(0deg)};
100%{transform: rotate(360deg)}
`;

const Wrapper = styled.div`
  height: ${(props) => {
    return props.size;
  }};
  width: ${(props) => {
    return props.size;
  }};
  animation-name: ${spin};
  animation-duration: 1s;
  animation-iteration-count: infinite;
`;

export default Loading;
