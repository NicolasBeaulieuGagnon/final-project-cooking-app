import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { LoggedInUserContext } from "../Providers/LoggedInUserProvider";
import NotStyledButton from "../Button/NoStyledButton";

const DropDownItem = ({ title, icon, link, check, onClick }) => {
  const { loggedInUser } = useContext(LoggedInUserContext);
  return (
    <Wrapper>
      {check === "profile" ? (
        localStorage.getItem("logged in") === "true" ? (
          <ItemWrapper>
            <CloseButton onClick={onClick}>
              <StyledLink to={link}>
                <Icon src={icon} />
                <ListItem>{title}</ListItem>
              </StyledLink>
            </CloseButton>
          </ItemWrapper>
        ) : (
          <DisabledItem>
            <Icon src={icon} />
            <ListItem>{title}</ListItem>
          </DisabledItem>
        )
      ) : (
        <div></div>
      )}

      {check === "cookbook" ? (
        localStorage.getItem("logged in") === "true" &&
        loggedInUser.hasCookBook === true ? (
          <ItemWrapper>
            <CloseButton onClick={onClick}>
              <StyledLink to={link}>
                <Icon src={icon} />
                <ListItem>{title}</ListItem>
              </StyledLink>
            </CloseButton>
          </ItemWrapper>
        ) : (
          <DisabledItem>
            <Icon src={icon} />
            <ListItem>{title}</ListItem>
          </DisabledItem>
        )
      ) : (
        <div></div>
      )}

      {!!check === false && (
        <ItemWrapper>
          <CloseButton onClick={onClick}>
            <StyledLink to={link}>
              <Icon src={icon} />
              <ListItem>{title}</ListItem>
            </StyledLink>
          </CloseButton>
        </ItemWrapper>
      )}
    </Wrapper>
  );
};

const DisabledItem = styled.div`
  background: transparent;
  opacity: 0.4;
`;
const Wrapper = styled.div`
  background: var(--dropDown-bg-color);
  font-size: 18px;
  font-weight: bold;
  padding: 0;
  overflow: hidden;
  ::-webkit-scrollbar {
    width: 0;
  }
`;
const ItemWrapper = styled.div`
  background: transparent;

  transition: 0.1s ease-in-out;
  &:hover {
    transform: rotate(5deg) scale(1.05);
  }
`;

const ListItem = styled.li``;
const StyledLink = styled(Link)`
  font-size: 18px;
  font-weight: bold;
  text-decoration: none;
  color: black;
`;

const CloseButton = styled(NotStyledButton)`
  padding: 1px 10px;
  margin: 0;
`;
const Icon = styled.img`
  width: 40px;
  background: transparent;
`;
export default DropDownItem;
