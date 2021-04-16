import styled from "styled-components";
import NotStyledButton from "./NoStyledButton";

const MainStyledButton = styled(NotStyledButton)`
  background: var(--btn-bg-color);
  margin-left: 10px;
  font-size: 22px;
  font-weight: bold;
  position: absolute;
  border-radius: 3px;
  padding: 2px 10px;
  box-shadow: 1px 1px 6px 0.1px rgb(120, 41, 15, 0.6);
  border: 2px solid rgb(120, 41, 15);
  transition: 0.1s ease-in-out;
  &:hover {
    background: rgb(255, 160, 71, 0.5);
  }
  &:active {
    transform: scale(0.9);
  }
`;

export default MainStyledButton;
