import React, { useState } from "react";
import { useNavigate } from "react-router-dom/dist";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../auth/auth";
import { Box } from "@mui/material";
import { useGetGreetingsQuery, getGreetings } from "./greetings";

//chatgpt made this i used it on the landing page
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
  const { data: greetings, isLoading, isError, refetch } = useGetGreetingsQuery(undefined, { skip: true });
  // { data: greetings, isLoading, isError, refetch }  is the same as:
  // const greetings = useGetGreetingsQuery(undefined, { skip: true }).data;
  // const isLoading = useGetGreetingsQuery(undefined, { skip: true }).isLoading;
  // const isError = useGetGreetingsQuery(undefined, { skip: true }).isError;
  // const refetch = useGetGreetingsQuery(undefined, { skip: true }).refetch;

  // this is known as destructuring, which is a way to extract values from an object and assign them to variables.

  // useGetGreetingsQuery is a hook from RTK Query that returns an object with the following properties:
  // data: the data returned from the API
  // isLoading: a boolean that is true if the request is in progress
  // isError: a boolean that is true if the request failed
  // refetch: a function that can be called to refetch the data

  // refetch is a function that can be called to refetch the data. It returns a promise that resolves to the new data. It can be called with an optional object argument that can contain the following properties:
  // forceRefetch: a boolean that, if true, will force the query to refetch even if the query is already in the cache
  // skipCache: a boolean that, if true, will skip the cache and refetch the data from the server
  // subscribe: a boolean that, if true, will subscribe to the query and update the data if the query changes



  const handleGetGreeting = async () => {
    // force the query to refetch even if the query is already in the cache
    try {
      const result = await dispatch(getGreetings());
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
