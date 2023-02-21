import React from "react";
import styled from "@emotion/styled";

const Hero = styled.div`
  background-image: url("banner.png");
  background-size: cover;
  background-position: center;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); ;
`;
const Title = styled.h1`
  color: white;
  font-size: 4rem; ;
`;

const Description = styled.p`
  color: white;
  font-size: 2rem; ;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem; ;
`;

const Button = styled.button`
  margin: 0 1rem;
  padding: 1rem 2rem;
  font-size: 1.5rem;
  background-color: #0091ea;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: none;
  }
`;

const LandingPage = () => {
  return (
    <div>
      <Hero>
        <Title>Character Builder</Title>
        <Description>Lorem Ipsom Blah Blah Blah</Description>
        <ButtonContainer>
          <Button>Login</Button>
          <Button>Create Account</Button>
          <Button>Create Character as Guest</Button>
        </ButtonContainer>
      </Hero>
    </div>
  );
};

export default LandingPage;
