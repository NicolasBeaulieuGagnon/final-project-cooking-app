import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import { LoggedInUserContext } from "../Providers/LoggedInUserProvider";
import NotStyledButton from "../Button/NoStyledButton";
import MainStyledButton from "../Button/MainStyledButton";
import chefHatLogo from "../../assets/designIcons/whiteLogo.png";
import DropDown from "./DropDown";

const NavBar = () => {
  const history = useHistory();
  const [openCloseDropDown, setOpenCloseDropDown] = useState(false);

  const { loggedInUser, setLoggedInUser } = useContext(LoggedInUserContext);

  const handleLogOut = () => {
    localStorage.setItem("logged in", "false");
    setLoggedInUser([]);
    history.push("/");
  };

  useEffect(() => {
    const dropDown = document.getElementById("dropDown");

    if (openCloseDropDown) {
      dropDown.style.height = "510px";
    } else {
      dropDown.style.height = "0px";
    }
  }, [openCloseDropDown]);

  const handleDropDown = () => {
    setOpenCloseDropDown(!openCloseDropDown);
  };

  return (
    <>
      <NavBarWrapper>
        <Wrapper>
          <BookWrapper>
            <DropDownButton onClick={handleDropDown}>
              <Logo src={chefHatLogo} />
            </DropDownButton>
          </BookWrapper>
        </Wrapper>
        <DropDownWrapper>
          <DropDown
            openCloseDropDown={openCloseDropDown}
            setOpenCloseDropDown={setOpenCloseDropDown}
          />
        </DropDownWrapper>
        {localStorage.getItem("logged in") === "true" ? (
          <>
            <LoggedInUserName>
              Hello,{" "}
              <StyledLink to={`/profile/:userId`}>
                {loggedInUser.userName}
              </StyledLink>
            </LoggedInUserName>
            <LogoutButton onClick={handleLogOut}>Log Out</LogoutButton>
          </>
        ) : (
          <LoginButton
            onClick={() => {
              history.push("/login");
            }}
          >
            Login
          </LoginButton>
        )}
      </NavBarWrapper>
    </>
  );
};

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;
const NavBarWrapper = styled.div`
  border-bottom: 2px solid var(--dark-accent);
  box-shadow: 0 3px 6px 0.2px var(--primary-border-color);
  position: relative;
  z-index: 200;
`;

const DropDownWrapper = styled.div`
  padding-left: 10px;
  z-index: 10;
  position: absolute;
  background: transparent;
`;

const LoginButton = styled(MainStyledButton)`
  border: none;
  position: absolute;
  background: white;
  top: 50%;
  right: 10px;

  &:active {
    transform: scale(0.9);
  }
`;
const LoggedInUserName = styled.span`
  font-weight: bold;
  color: white;
  font-size: 20px;

  text-shadow: 0 0 10px black;
  background: transparent;
  position: absolute;
  left: 50%;
  top: 20px;
  transform: translate(-50%);
`;
const LogoutButton = styled(LoginButton)``;

const DropDownButton = styled(NotStyledButton)`
  transition: 0.2s ease-in-out;
  &:active {
    transform: scale(0.7);
  }
`;

const BookWrapper = styled.div`
  width: 100px;
  background: transparent;
`;

const Logo = styled.img`
  padding-left: 10px;
  padding-top: 5px;
  width: 90%;
`;

const Wrapper = styled.div`
  z-index: 100;
  display: flex;
  background-color: var(--nav-bg-color);
  height: 80px;
`;

export default NavBar;
