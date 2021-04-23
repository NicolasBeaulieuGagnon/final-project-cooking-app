import React from "react";
import styled from "styled-components";
import NotStyledButton from "../Button/NoStyledButton";

// invisible button calling the onclick event of each
// like/dislike follow/unfollow/ open/close comment section.
const Action = ({ onClick }) => {
  return <ActionButton onClick={onClick} />;
};

const ActionButton = styled(NotStyledButton)``;
export default Action;
