import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { LoggedInUserContext } from "./Providers/LoggedInUserProvider";
import MainStyledButton from "./Button/MainStyledButton";
import NotStyledButton from "./Button/NoStyledButton";
import AvatarOptionModal from "./Modals/AvatarOptionModal";
import checkForm from "./checkForm";

const LoginIn = () => {
  const history = useHistory();
  const [userAvatar, setUserAvatar] = useState(null);
  const [results, setResults] = useState("");
  const [errors, setErrors] = useState([]);
  const [userForm, setUserForm] = useState({});
  const [secretUrl, setSecretUrl] = useState("");

  const { setLoggedInUser } = useContext(LoggedInUserContext);
  const handleLogin = () => {
    const loginEmail = document
      .getElementById("loginEmailId")
      .value.toLowerCase();
    const loginPassword = document.getElementById("loginPasswordId").value;

    fetch(`/users/login?email=${loginEmail}&password=${loginPassword}`).then(
      (res) => {
        res.json().then((data) => {
          if (data.status === 200) {
            localStorage.setItem("logged in", "true");
            localStorage.setItem("userId", data.data._id);
            setLoggedInUser(data.data);
            history.push("/");
          }
        });
      }
    );
  };
  useEffect(() => {
    setErrors([]);
    const content = document.getElementById("LoginAndSignInPage");
    content.style.height = "800px";

    return () => {
      content.style.height = "0px";
      setUserAvatar(null);
    };
  }, []);

  useEffect(() => {
    if (errors === false) {
      const newUser = {
        name: userForm.firstName,
        lastName: userForm.lastName,
        userName: userForm.userName,
        avatarSrc: userAvatar,
        password: userForm.password,
        email: userForm.email,
        bio: userForm.bio,
        bannerSrc: "",
      };
      fetch("/users/user", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newUser }),
      }).then((res) => {
        res.json().then((data) => {
          if (data.status === 201) {
            localStorage.setItem("logged in", "true");
            localStorage.setItem("userId", data.data._id);
            setLoggedInUser(data.data);
            history.push(`/profile/:userId`);
          } else {
            setErrors({
              error:
                "please retry submitting, if the problem persists please contact support",
            });
          }
        });
      });
    }
  }, [errors]);

  useEffect(() => {
    if (results.length > 0) {
      const err = results.filter((result) => {
        return result !== true;
      });
      if (userAvatar !== null || userForm.userImage.length === 1) {
      } else {
        err.push({
          error: "please pick a profile avatar or take your own picture!",
        });
      }
      if (err.length === 0) {
        if (userForm.userImage.length === 1) {
          uploadChosenPicture();
        } else {
          setErrors(false);
        }
      } else {
        setErrors(err);
      }
    }
    return () => {};
  }, [results]);

  useEffect(() => {
    if (secretUrl) {
      const file = userForm.userImage[0];
      fetch(secretUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: file,
      }).then(() => {
        setUserAvatar(secretUrl.split("?")[0]);
        setErrors(false);
      });
    }
  }, [secretUrl]);

  const uploadChosenPicture = () => {
    fetch("/s3Url").then((res) => {
      res.json().then((data) => {
        setSecretUrl(data.url);
      });
    });
  };

  const handleSubmitForm = (ev) => {
    const form = document.getElementById("signUpForm");
    let fullForm = {};

    for (let i = 0; i < form.elements.length; i++) {
      const key = form.elements[i].name;
      const value = form.elements[i].value;
      const file = form.elements[i].files;

      let obj = {};

      if (file) {
        obj[key] = file;
      } else {
        obj[key] = value;
      }

      fullForm = Object.assign(obj, fullForm);
    }
    checkForm(fullForm, setResults);
    setUserForm(fullForm);
    ev.preventDefault();
  };

  const handleModal = (ev) => {
    ev.preventDefault();
    const modal = document.getElementById("avatarModalBg");
    modal.style.visibility = "visible";
    modal.style.opacity = "1";
  };

  const makeUserAvatarNothing = () => {
    setUserAvatar(null);
  };
  return (
    <>
      <Wrapper id="LoginAndSignInPage">
        <AvatarOptionModal
          userAvatar={userAvatar}
          setUserAvatar={setUserAvatar}
        />
        <LoginSectionWrapper>
          <LoginWrapper>Already own an account?</LoginWrapper>
          <LoginCredentials>
            <InputWrapper>
              <StyledLabel htmlFor="loginEmail">email:</StyledLabel>
              <TextInput type="text" name="loginEmail" id="loginEmailId" />
            </InputWrapper>
            <InputWrapper>
              <StyledLabel htmlFor="loginPassword">password:</StyledLabel>
              <TextInput
                type="password"
                name="loginPassword"
                id="loginPasswordId"
              />
            </InputWrapper>
          </LoginCredentials>

          <LoginButton onClick={handleLogin}>Log In</LoginButton>
        </LoginSectionWrapper>
        <FormWrapper>
          <FormTitle>Create an Account</FormTitle>
          <SignupForm id="signUpForm">
            <InputWrapper>
              <StyledLabel htmlFor="firstName">First Name:</StyledLabel>
              <TextInput type="text" name="firstName" required />
            </InputWrapper>
            <InputWrapper>
              <StyledLabel htmlFor="lastName">Last Name:</StyledLabel>
              <TextInput type="text" name="lastName" required />
            </InputWrapper>
            <InputWrapper>
              <StyledLabel htmlFor="userName">User Name:</StyledLabel>
              <TextInput type="text" name="userName" required />
            </InputWrapper>
            <InputWrapper>
              <StyledLabel htmlFor="password">Password:</StyledLabel>
              <TextInput type="password" name="password" required />
            </InputWrapper>
            <InputWrapper>
              <StyledLabel htmlFor="confirmPassword">
                Confirm Password:
              </StyledLabel>
              <TextInput type="password" name="confirmPassword" required />
            </InputWrapper>
            <InputWrapper>
              <StyledLabel htmlFor="email">email:</StyledLabel>
              <TextInput type="email" name="email" required />
            </InputWrapper>

            <InputWrapper>
              <StyledLabel htmlFor="bio">Tell us about yourself:</StyledLabel>
              <TextInput type="text" name="bio" />
            </InputWrapper>
            <InputWrapper>
              <StyledLabel htmlFor="userImage">User Avatar:</StyledLabel>
              <AvatarChoiceWrapper>
                <AvatarModalButton onClick={handleModal}>
                  Pick from Our Avatars
                </AvatarModalButton>
                or
                <ImageInput
                  onClick={makeUserAvatarNothing}
                  id="userUploadImage"
                  type="file"
                  name="userImage"
                  accept="image/png, image/jpeg"
                />
              </AvatarChoiceWrapper>
            </InputWrapper>
            <SubmitButton onClick={handleSubmitForm}>Submit</SubmitButton>
          </SignupForm>
          {errors.length > 0 && (
            <ErrorWrapper>
              {errors.map((error, index) => {
                return (
                  <ErrorMessage key={`error-${index}`}>
                    {error.error}
                  </ErrorMessage>
                );
              })}
            </ErrorWrapper>
          )}
        </FormWrapper>
      </Wrapper>
    </>
  );
};

const LoginSectionWrapper = styled.div`
  position: relative;
  border-bottom: 4px solid var(--dark-accent);
  background: var(--primary-bg-color);
`;
const LoginCredentials = styled.div`
  width: 270px;
  margin-left: 25px;
  margin-bottom: 40px;
`;

const FormTitle = styled.div`
  background: transparent;
  font-weight: bold;
  font-size: 24px;
  text-decoration: underline;
`;

const LoginWrapper = styled.div`
  margin-top: 20px;
  margin-left: 30px;
  font-weight: bold;
  font-size: 22px;
  text-decoration: underline;
  background: var(--primary-bg-color);
`;

const ErrorMessage = styled.div`
  background: var(--primary-bg-color);
`;

const ErrorWrapper = styled.div`
  background: var(--primary-bg-color);
`;

const AvatarModalButton = styled(NotStyledButton)`
  margin-top: 2px;
  width: 140px;
  padding: 5px 0px;
  background: var(--btn-bg-color);
  font-size: 15px;
  font-weight: bold;
  border-radius: 3px;
  transition: 0.1s ease-in-out;
  &:hover {
    background: rgb(255, 160, 71, 0.5);
  }
  &:active {
    transform: scale(0.9);
  }

  background: var(--primary-bg-color);
`;

const AvatarChoiceWrapper = styled.div`
  background: var(--primary-bg-color);

  display: flex;
  flex-direction: column;
`;
const LoginButton = styled(MainStyledButton)`
  background: var(--primary-bg-color);
  bottom: 43px;
  left: 300px;
`;
const SubmitButton = styled(MainStyledButton)`
  bottom: 20px;
  background: var(--primary-bg-color);
`;

const InputWrapper = styled.div`
  padding: 5px 0px;
  display: flex;
  justify-content: space-between;
  background: var(--primary-bg-color);
`;

const FormWrapper = styled.div`
  font-size: 19px;
  left: 50%;
  margin-top: -4px;
  padding: 20px 10px;
  transform: translate(-50%);
  position: absolute;
  width: 400px;
  height: 550px;
  border: 4px solid var(--dark-accent);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  background: var(--primary-bg-color);
`;

const SignupForm = styled.form`
  background: var(--primary-bg-color);
`;

const StyledLabel = styled.label`
  font-size: 18px;
  font-weight: bold;
  margin-top: px;
  padding: 2px 5px;
  background: var(--primary-bg-color);
`;

const TextInput = styled.input`
  font-size: 18px;
  margin-top: 5px;
  width: 190px;
  box-shadow: 0.5px 0.5px 4px 0.1px var(--btn-bg-color);
  border-radius: 5px;
  border: none;
  outline: none;
  padding: 4px 9px;
`;

const ImageInput = styled.input`
  margin-top: 7px;
  font-weight: bold;
  background: var(--primary-bg-color);
`;
const Wrapper = styled.div`
  position: relative;
  background: var(--primary-bg-color);
  height: 0px;
  overflow: hidden;
  transition: 0.2s ease-in-out;
`;
export default LoginIn;
