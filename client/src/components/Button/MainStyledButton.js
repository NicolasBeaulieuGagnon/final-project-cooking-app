import styled from "styled-components";
import NotStyledButton from "./NoStyledButton";

const MainStyledButton = styled(NotStyledButton)`
  background: var(--btn-bg-color);
  margin-left: 10px;
  font-size: 22px;
  font-weight: bold;
  position: absolute;
  border-radius: 2px;
  padding: 2px 10px;
  box-shadow: 1px 1px px 0.1px var(--dark-accent);
  border: 2px solid var(--primary-border-color);
  transition: 0.1s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(0.9);
  }
`;

export default MainStyledButton;
