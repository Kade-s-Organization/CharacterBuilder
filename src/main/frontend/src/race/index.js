// this page is a Material UI form validated with Yup and formik to create the race section of the charactter sheet
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom/dist";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../auth/auth";
import { useGetGreetingsQuery, getGreetings } from "./greetings";

const Button = styled(Button)`
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

export default function Race() {





}