import React, { useState } from "react";
import { useNavigate } from "react-router-dom/dist";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/reducers/auth";
import axios from "../../api/axios";
import { Box } from "@mui/material";

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

  const getGreeting = async () => {
    const jwt = token;
    const res = await axios.get("/api/v1/greetings", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    setGreeting(res.data);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <Box m={3} p={3}>
      <div>Dashboard Home Page</div>
      {authenticated ? (
        <>
          <Button onClick={handleLogout}>Logout</Button>
          <Button onClick={getGreeting}>Display Greeting:</Button>
        </>
      ) : (
        <Button onClick={handleLogin}>Login</Button>
      )}
      {greeting !== "" && <h1>{greeting}</h1>}
    </Box>
  );
}
