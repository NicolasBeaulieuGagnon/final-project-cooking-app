import React, { useState, useEffect } from "react";
import styled from "styled-components";

import MainStyledButton from "./Button/MainStyledButton";
import NotStyledButton from "./Button/NoStyledButton";
import AvatarOptionModal from "./Modals/AvatarOptionModal";

const LoginIn = () => {
  const [userAvatar, setUserAvatar] = useState(null);
  useEffect(() => {
    const content = document.getElementById("LoginAndSignInPage");
    content.style.height = "350px";

    return () => {
      content.style.height = "0px";
      setUserAvatar(null);
    };
  }, []);
  const handleSubmitForm = (ev) => {
    ev.preventDefault();
  };
  const handleModal = (ev) => {
    ev.preventDefault();
    const modal = document.getElementById("avatarModalBg");
    modal.style.visibility = "visible";
    modal.style.opacity = "1";
  };
  console.log(userAvatar);
  return (
    <>
      <Wrapper id="LoginAndSignInPage">
        <AvatarOptionModal
          userAvatar={userAvatar}
          setUserAvatar={setUserAvatar}
        />
        Sign Up Form
        <LoginForm>
          <InputWrapper>
            <StyledLabel>First Name:</StyledLabel>
            <TextInput type="text" />
          </InputWrapper>
          <InputWrapper>
            <StyledLabel>Last Name:</StyledLabel>
            <TextInput type="text" />
          </InputWrapper>
          <InputWrapper>
            <StyledLabel>User Name:</StyledLabel>
            <TextInput type="text" />
          </InputWrapper>
          <InputWrapper>
            <StyledLabel>Password:</StyledLabel>
            <TextInput type="password" />
          </InputWrapper>
          <InputWrapper>
            <StyledLabel>Confirm Password:</StyledLabel>
            <TextInput type="password" />
          </InputWrapper>
          <InputWrapper>
            <StyledLabel>email:</StyledLabel>
            <TextInput type="email" />
          </InputWrapper>
          <InputWrapper>
            <StyledLabel>User Avatar:</StyledLabel>
            <AvatarModalButton onClick={handleModal}>+</AvatarModalButton>
            <ImageInput type="file" />
          </InputWrapper>
          <InputWrapper>
            <StyledLabel>Tell us about yourself:</StyledLabel>
            <TextInput type="text" />
          </InputWrapper>
          <SubmitButton onClick={handleSubmitForm}>Submit</SubmitButton>
        </LoginForm>
      </Wrapper>
    </>
  );
};

const AvatarModalButton = styled(NotStyledButton)``;
const SubmitButton = styled(MainStyledButton)``;
const InputWrapper = styled.div``;
const FormWrapper = styled.div``;
const LoginForm = styled.form``;
const StyledLabel = styled.label``;
const TextInput = styled.input``;
const ImageInput = styled.input``;
const Wrapper = styled.div`
  height: 0px;
  overflow-y: hidden;
  transition: 0.4s ease-in-out;
`;
export default LoginIn;
