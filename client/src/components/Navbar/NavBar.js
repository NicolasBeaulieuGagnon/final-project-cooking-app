import React, { useState, useEffect } from "react";
import styled from "styled-components";
import closeBook from "../../assets/closeBook.png";
import openBook from "../../assets/openBook.png";
import DropDown from "./DropDown";

import NotStyledButton from "../Button/NoStyledButton";
const NavBar = () => {
  const [isBookClosed, setIsBookClosed] = useState(true);

  useEffect(() => {
    const dropMenu = document.getElementById("dropDown");
    if (isBookClosed) {
      dropMenu.style.height = "0px";
    } else {
      dropMenu.style.height = "250px";
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
      </NavBarWrapper>
    </>
  );
};

const NavBarWrapper = styled.div`
  position: relative;
`;

const DropDownWrapper = styled.div`
  z-index: 10;
  position: absolute;
  background: var(--primary-bg-color);
  width: 40vw;
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
  box-shadow: 0 3px 6px 0.2px rgb(120, 41, 15, 0.6);
  display: flex;
  background-color: var(--nav-bg-color);
  width: 100vw;
  height: 80px;
`;

export default NavBar;
