import React from "react";
import styled from "styled-components";
import NotStyledButton from "../Button/NoStyledButton";

const ErrorModal = ({ errors, setErrors, error, index }) => {
  const handleClose = () => {
    let minusError = errors.filter((err) => {
      return err.error !== error;
    });
    setErrors(minusError);
  };

  return (
    <Modal key={index} height={`${index * 65}px`} id={`error-${error}`}>
      <CloseModal onClick={handleClose}>x</CloseModal>
      <ErrorMessage>{error}</ErrorMessage>
    </Modal>
  );
};

const Modal = styled.div`
  box-shadow: 0 0 20px 1px var(--slight-box-shadow);
  font-weight: bold;
  font-size: 20px;
  height: 130px;
  width: 230px;
  border-radius: 2px;
  padding: 5px 15px;
  border: 2px solid red;
  position: absolute;
  top: ${(props) => {
    return props.height;
  }};
  transition: 0.2s ease-in-out;
`;
const ErrorMessage = styled.div``;
const CloseModal = styled(NotStyledButton)`
  font-weight: bold;
  font-size: 25px;
  position: absolute;
  right: 2px;
  top: -5px;
`;
export default ErrorModal;
