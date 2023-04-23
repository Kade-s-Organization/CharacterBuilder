import React, { useState } from "react";
import { useNavigate } from "react-router-dom/dist";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../auth/auth";
import { Box } from "@mui/material";
import { useGetGreetingsQuery } from "./greetings";

const Button = styled.button`
  margin-top: 1rem;
  margin-right: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
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

export default function Home() {
  const [greeting, setGreeting] = useState("");
  const authenticated = useSelector((state) => state.auth.token);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: greetings, isLoading, isError, refetch } = useGetGreetingsQuery(undefined);



  const handleGetGreeting = async () => {
    try {
      const result = await refetch();

      setGreeting("Greeting: " + result.data.message);
    } catch (error) {
      console.error("Error fetching greeting:", error);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    setGreeting("");
  };
  const handleLogin = () => {
    navigate("/login");
    setGreeting("");
  };
  const handleRegister = () => {
    navigate("/register");
    setGreeting("");
  };

  return (
    <Box m={3} p={3}>
      <div>Dashboard Home Page</div>
      {authenticated ? (
        <>
          <Button onClick={handleLogout}>Logout</Button>
          <Button onClick={handleGetGreeting}>Display Greeting:</Button>
        </>
      ) : (
        <>
          <Button onClick={handleLogin}>Login</Button>
          <Button onClick={handleRegister}>Register</Button>
        </>
      )}
      {greeting !== "" && <h1>{greeting}</h1>}
    </Box>
  );
}
