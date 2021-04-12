import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const DropDown = ({ setIsBookClosed, isBookClosed }) => {
  const closeDropDown = () => {
    setIsBookClosed(!isBookClosed);
  };
  return (
    <Wrapper id="dropDown">
      <DropDownList>
        <ItemLink onClick={closeDropDown} to="/">
          <DropDownItem>Home</DropDownItem>
        </ItemLink>
        <ItemLink onClick={closeDropDown} to="/questions">
          <DropDownItem>Questions</DropDownItem>
        </ItemLink>
        <ItemLink onClick={closeDropDown} to="fridge">
          <DropDownItem>Fridge</DropDownItem>
        </ItemLink>
        <ItemLink onClick={closeDropDown} to="profile">
          <DropDownItem>Profile</DropDownItem>
        </ItemLink>
        <ItemLink onClick={closeDropDown} to="newsFeed">
          <DropDownItem>News Feed</DropDownItem>
        </ItemLink>
        <ItemLink onClick={closeDropDown} to="about">
          <DropDownItem>About</DropDownItem>
        </ItemLink>
      </DropDownList>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-size: 25px;
  font-weight: bold;
  background: rgb(255, 236, 209);
  height: 0px;
  border-bottom-right-radius: 15px;
  overflow-y: hidden;
  transition: 0.3s ease-in-out;
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
    background: rgb(120, 41, 15);
  }
  &:active {
    transform: scale(0.9);
    color: black;
    background: var(--primary-bg-color);
  }
`;
const ItemLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

export default DropDown;
