import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import MainStyledButton from "../Button/MainStyledButton";

import closeBook from "../../assets/designIcons/cookbook.png";
import { LoggedInUserContext } from "../Providers/LoggedInUserProvider";
import NotStyledButton from "../Button/NoStyledButton";
import { useHistory } from "react-router";

const CreateCookBook = () => {
  const { loggedInUser, updatingUser, setUpdatingUser } = useContext(
    LoggedInUserContext
  );
  const [newBookObj, setNewBookObj] = useState({});
  const [creating, setCreating] = useState(false);
  const [createdCookBook, setCreatedCookBook] = useState(null);
  const history = useHistory();

  // checks that we received the created book and if so, shows it to the user.
  useEffect(() => {
    if (createdCookBook) {
      const createdTitle = document.getElementById("TitleOnCookBook");
      createdTitle.innerText = createdCookBook.cookBookName;
    }
  }, [createdCookBook]);

  // checks to see if the cookbook is done being created and sends it to the back end.
  // updates the user's data so no page refresh is necesarry.
  // once we know the book is created we show it to the FE.
  useEffect(() => {
    if (creating) {
      setCreating(false);
      fetch("/cookbook", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newBookObj }),
      }).then((res) => {
        res.json().then((data) => {
          setTimeout(() => {
            setUpdatingUser(!updatingUser);
            setCreatedCookBook(data.data.newCookBook);
            const creationComplete = document.getElementById(
              "creationComplete"
            );
            creationComplete.style.height = "550px";
          }, 500);
        });
      });
    }
  }, [creating]);

  // once the create button is pressed this function will change it's text and disable it.
  // it will then check if the user inputed a book name, if not than it'll get that user's handle
  // and set the books name to that than set creating to true to show the finished cookbook.
  const handleCreateCookBook = (ev) => {
    ev.target.innerText = "Loading...";
    ev.target.disabled = true;
    const userChosenName = document.getElementById("BookName");

    if (userChosenName.value === "") {
      setNewBookObj({
        cookBookName: `${loggedInUser.userName}'s Cookbook`,
        userId: loggedInUser._id,
        handle: loggedInUser.userName,
      });
    } else {
      setNewBookObj({
        cookBookName: userChosenName.value,
        userId: loggedInUser._id,
        handle: loggedInUser.userName,
      });
    }

    setCreating(true);
  };

  //button that is the user's cookbook when clicked on pushes to that newly created cookbook's page.
  const handleComplete = () => {
    history.push(`/cookbook/${createdCookBook._id}`);
  };
  return (
    <>
      <CreationCompleteDiv id="creationComplete">
        <CreationMessage>
          Complete!
          <CreatedBookWrapper>
            <CreationImage src={closeBook} />
            <CreatedBookTitle id="TitleOnCookBook">
              {createdCookBook?.cookBookName}
            </CreatedBookTitle>
            <Button onClick={handleComplete}></Button>
          </CreatedBookWrapper>
        </CreationMessage>
      </CreationCompleteDiv>

      {localStorage.getItem("logged in") === "true" ? (
        loggedInUser.hasCookBook === false ? (
          <Wrapper>
            All you need is to give your Cookbook a name!
            <SubText>optional</SubText>
            <BookName
              id="BookName"
              type="text"
              placeholder={`${loggedInUser.userName}'s Cookbook`}
              required
            />
            <SubmitButton onClick={handleCreateCookBook}>Submit</SubmitButton>
            <SubText>
              Will default to :
              <ExampleTitle>{loggedInUser.userName}'s Cookbook</ExampleTitle>
            </SubText>
          </Wrapper>
        ) : (
          <Wrapper> Users can only have 1 cookbook at a time</Wrapper>
        )
      ) : (
        <Wrapper>please Login to create a cookbook</Wrapper>
      )}
    </>
  );
};

const CreationImage = styled.img`
  margin-top: 50px;
  margin-left: 38px;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  width: 300px;
  background: transparent;
`;
const CreationMessage = styled.div`
  background: transparent;
`;
const CreatedBookWrapper = styled.div`
  position: relative;
  background: transparent;
`;
const Button = styled(NotStyledButton)`
  top: 60px;
  left: 50%;
  width: 200px;
  height: 240px;
  transform: translate(-50%);
  position: absolute;
  transition: 0.2s ease-in-out;
`;

const CreatedBookTitle = styled.div`
  top: 90px;
  left: 50%;
  width: 180px;
  height: 200px;
  transform: translate(-50%);
  position: absolute;
  color: black;
`;
const CreationCompleteDiv = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 40px;
  z-index: 1;
  position: absolute;
  width: 100%;
  height: 0px;
  transition: 0.3s ease-in-out;
  background: var(--primary-bg-color);
  border-bottom: 5px solid var(--dark-accent);
  overflow: hidden;
`;

const ExampleTitle = styled.div`
  background: transparent;
  font-weight: bold;
`;

const SubText = styled.div`
  padding-top: 10px;
  background: transparent;
  font-size: 20px;
`;

const BookName = styled.input`
  outline: none;
  border: none;
  border-radius: 5px;
  box-shadow: 0 0 10px 0.5px var(--dark-accent);
  height: 40px;
  width: 200px;
`;

const Wrapper = styled.div`
  padding: 20px;
  background: transparent;
  font-size: 30px;
  position: relative;
`;
const SubmitButton = styled(MainStyledButton)`
  top: 250px;
  left: 0;
`;
export default CreateCookBook;
