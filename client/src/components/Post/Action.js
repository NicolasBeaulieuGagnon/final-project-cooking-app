import React from "react";
import styled from "styled-components";
import NotStyledButton from "../Button/NoStyledButton";

const Action = ({ onClick }) => {
  return <ActionButton onClick={onClick} />;
};

const ActionButton = styled(NotStyledButton)``;
export default Action;
