import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";

import NotStyledButton from "../Button/NoStyledButton";
import MainStyledButton from "../Button/MainStyledButton";
import closeBook from "../../assets/closeBook.png";
import openBook from "../../assets/openBook.png";
import DropDown from "./DropDown";

const NavBar = () => {
  const history = useHistory();
  const [isBookClosed, setIsBookClosed] = useState(true);

  useEffect(() => {
    const dropMenu = document.getElementById("dropDown");
    if (isBookClosed) {
      dropMenu.style.height = "0px";
    } else {
      dropMenu.style.height = "268px";
    }
  }, [isBookClosed]);
  const handleDropDown = () => {
    setIsBookClosed(!isBookClosed);
  };

  return (
    <>
      <NavBarWrapper>
        <Wrapper>
          <BookWrapper>
            <DropDownButton onClick={handleDropDown}>
              {isBookClosed ? (
                <Book src={closeBook} />
              ) : (
                <OpenBook src={openBook} />
              )}
            </DropDownButton>
          </BookWrapper>
        </Wrapper>
        <DropDownWrapper>
          <DropDown
            setIsBookClosed={setIsBookClosed}
            isBookClosed={isBookClosed}
          />
        </DropDownWrapper>
        <LoginButton
          onClick={() => {
            history.push("/login");
          }}
        >
          Login
        </LoginButton>
      </NavBarWrapper>
    </>
  );
};

const NavBarWrapper = styled.div`
  box-shadow: 0 3px 6px 0.2px rgb(120, 41, 15, 0.6);
  position: relative;
  z-index: 200;
`;

const DropDownWrapper = styled.div`
  z-index: 10;
  position: absolute;
  background: var(--primary-bg-color);
  width: 40vw;
`;

const LoginButton = styled(MainStyledButton)`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translate(0%, -50%);
  &:active {
    transform: translate(0%, -50%) scale(0.9);
  }
`;
const DropDownButton = styled(NotStyledButton)`
  transition: 0.1s ease-in-out;
  &:active {
    transform: scale(0.7);
  }
`;

const BookWrapper = styled.div`
  width: 100px;
  background: transparent;
`;

const Book = styled.img`
  padding-left: 10px;
  width: 90%;
`;

const OpenBook = styled(Book)`
  padding-left: 0px;
  width: 115%;
`;

const Wrapper = styled.div`
  z-index: 100;
  display: flex;
  background-color: var(--nav-bg-color);
  height: 80px;
`;

export default NavBar;
