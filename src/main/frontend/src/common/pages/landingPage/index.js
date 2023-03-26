import React from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "features/auth/auth";
import { selectCurrentUser } from "features/auth/auth";

const Hero = styled.div`
  background-image: linear-gradient(120deg, #5e9e95 0%, #2187cd 100%);
  background-size: cover;
  background-position: center;
  padding: 4rem 10rem 4rem 10rem;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  text-align: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); ;
`;

const Message = styled.p`
  color: white;
  font-size: 1.5rem;
`;

const Title = styled.h1`
  color: white;
  font-size: 3rem; ;
`;

const Description = styled.p`
  color: white;
  font-size: 1.5rem; ;
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
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const authenticated = useSelector(selectCurrentToken);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleContinueAsGuest = () => {
    navigate("/dashboard");
  };
  const handleContinueToDashboard = () => {
    navigate("/dashboard");
  };

  if (authenticated) {
    return (
      <div>
        <Hero>
          <Title>Character Builder - The Ultimate Tool for D&D Players</Title>
          <Description>
            Enjoy the benefits of an interactive character sheet while unlocking
            all the popular class variants that are typically locked behind a
            paywall. Our application takes data from 5e.tools and presents it in
            a D&D Beyond-like interface, giving you the best of both worlds. Start
            playing your favorite class variants without limitations today!
          </Description>
          <Message>Welcome, {user}!</Message>
          <ButtonContainer>
            <Button onClick={handleContinueToDashboard}>Continue to Dashboard</Button>
          </ButtonContainer>
        </Hero>
      </div>
    );
  }

  return (
    <div>
      <Hero>
        <Title>Character Builder - The Ultimate Tool for D&D Players</Title>
        <Description>
          Enjoy the benefits of an interactive character sheet while unlocking
          all the popular class variants that are typically locked behind a
          paywall. Our application takes data from 5e.tools and presents it in a
          D&D Beyond-like interface, giving you the best of both worlds. Start
          playing your favorite class variants without limitations today!
        </Description>
        <ButtonContainer>
          <Button onClick={handleLogin}>Login</Button>
          <Button onClick={handleRegister}>Register</Button>
          <Button onClick={handleContinueAsGuest}>Continue as Guest</Button>
        </ButtonContainer>
      </Hero>
    </div>
  );
};

export default LandingPage;
