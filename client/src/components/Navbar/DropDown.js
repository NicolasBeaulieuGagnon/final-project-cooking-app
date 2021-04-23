import React, { useContext } from "react";
import styled from "styled-components";

import { LoggedInUserContext } from "../Providers/LoggedInUserProvider";

import fridgeIcon from "../../assets/designIcons/012-fridge.png";
import newsFeedIcon from "../../assets/designIcons/035-voucher.png";
import homeIcon from "../../assets/designIcons/home.png";
import recipeIcon from "../../assets/designIcons/random.png";
import profileIcon from "../../assets/designIcons/chef.png";
import aboutIcon from "../../assets/designIcons/016-menu.png";
import cookbookIcon from "../../assets/designIcons/cookbook.png";

import DropDownItem from "./DropDownItem";

// the sites drop down used in the NavBar.js
const DropDown = ({ openCloseDropDown, setOpenCloseDropDown }) => {
  const closeDropDown = () => {
    setOpenCloseDropDown(!openCloseDropDown);
  };
  // sends each to the DropDownItem.js
  const { loggedInUser } = useContext(LoggedInUserContext);
  return (
    <Wrapper id="dropDown">
      <DropDownList id="dropDownList">
        <DropDownItem
          onClick={closeDropDown}
          title="Home"
          icon={homeIcon}
          link="/"
        />

        <DropDownItem
          onClick={closeDropDown}
          title="Recipe"
          icon={recipeIcon}
          link="/questions"
        />

        <DropDownItem
          onClick={closeDropDown}
          title="Fridge"
          icon={fridgeIcon}
          link="/fridge"
        />

        <DropDownItem
          onClick={closeDropDown}
          title="Profile"
          icon={profileIcon}
          link="/profile/:userId"
          check="profile"
        />

        <DropDownItem
          onClick={closeDropDown}
          title="NewsFeed"
          icon={newsFeedIcon}
          link="/newsFeed"
          check="profile"
        />

        <DropDownItem
          onClick={closeDropDown}
          title="CookBook"
          icon={cookbookIcon}
          link={`/cookbook/${loggedInUser.cookBook}`}
          check="cookbook"
        />

        <DropDownItem
          onClick={closeDropDown}
          title="About"
          icon={aboutIcon}
          link="/about"
        />
      </DropDownList>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 2px solid var(--dark-accent);
  border-top: none;
  font-size: 25px;
  font-weight: bold;
  background: var(--dropDown-bg-color);
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  height: 0;
  overflow-y: hidden;
  transition: 0.2s ease-in-out;
`;
const DropDownList = styled.ul`
  text-align: center;
  list-style: none;
  margin-top: 0;
  padding-left: 0;
`;

export default DropDown;
