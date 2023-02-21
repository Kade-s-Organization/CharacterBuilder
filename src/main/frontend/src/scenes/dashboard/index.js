import React, { useState } from "react";
import { useNavigate } from "react-router-dom/dist";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/reducers/auth";
import axios from "../../api/axios";
import { Box } from "@mui/material";

export default function Home() {
  const [greeting, setGreeting] = useState("");
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
    navigate("/login");
  };

  return (
    <Box m={3}>
      <div>Dashboard Home Page</div>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={getGreeting}>Display Greeting:</button>
      {greeting !== "" && <h1>{greeting}</h1>}
    </Box>
  );
}
