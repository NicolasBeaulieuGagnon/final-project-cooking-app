import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { LoggedInUserContext } from "../Providers/LoggedInUserProvider";

const DropDown = ({ setIsBookClosed, isBookClosed }) => {
  const closeDropDown = () => {
    setIsBookClosed(!isBookClosed);
  };

  const { loggedInUser } = useContext(LoggedInUserContext);
  return (
    <Wrapper id="dropDown">
      <DropDownList>
        <ItemLink onClick={closeDropDown} to="/">
          <DropDownItem>
            Home
            <Bar />
          </DropDownItem>
        </ItemLink>
        <ItemLink onClick={closeDropDown} to="/questions">
          <DropDownItem>
            Questions
            <Bar />
          </DropDownItem>
        </ItemLink>
        <ItemLink onClick={closeDropDown} to="/fridge">
          <DropDownItem>
            Fridge
            <Bar />
          </DropDownItem>
        </ItemLink>
        {localStorage.getItem("logged in") === "true" ? (
          <ItemLink onClick={closeDropDown} to="/profile/:userId">
            <DropDownItem>
              Profile
              <Bar />
            </DropDownItem>
          </ItemLink>
        ) : (
          <DisabledItem>
            Profile
            <Bar />
          </DisabledItem>
        )}

        <ItemLink onClick={closeDropDown} to="/newsFeed">
          <DropDownItem>
            News Feed
            <Bar />
          </DropDownItem>
        </ItemLink>
        <ItemLink onClick={closeDropDown} to="/about">
          <DropDownItem>
            About
            <Bar />
          </DropDownItem>
        </ItemLink>
      </DropDownList>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-size: 25px;
  font-weight: bold;
  background: var(--dropDown-bg-color);
  height: 0px;
  border-bottom-right-radius: 15px;
  overflow-y: hidden;
  transition: 0.2s ease-in-out;
`;

const Bar = styled.div`
  margin-left: 5%;
  width: 90%;
  height: 2px;
  border-radius: 50px;
  background: rgb(192, 177, 157);
`;
const DropDownList = styled.ul`
  text-align: center;
  list-style: none;
  margin-top: 0;
  padding-left: 0;
`;
const DropDownItem = styled.li`
  padding: 5px;
  transition: 0.1s ease-in-out;
  &:hover {
    color: var(--primary-bg-color);
    background: var(--dark-accent);
  }
  &:active {
    transform: scale(0.9);
    color: black;
    background: var(--primary-bg-color);
  }
`;

const DisabledItem = styled.li`
  cursor: default;
  padding: 5px;
  opacity: 0.3;
`;

const ItemLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

export default DropDown;
