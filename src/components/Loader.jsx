import React from "react";
import styled, { keyframes } from "styled-components";

// Define the keyframes for the spinning animation
const spin = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

// Styled component for the loader
const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: rgba(169, 169, 169, 0.5); /* Semi-transparent gray */
`;

const LoaderCircle = styled.div`
  border: 8px solid transparent;
  border-top-color: #f00; /* Red color */
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: ${spin} 1s infinite linear; /* Applying the spinning animation */
`;

const Loader = () => {
  return (
    <LoaderContainer>
      <LoaderCircle />
    </LoaderContainer>
  );
};

export default Loader;
