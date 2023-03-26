import React from "react";
import { Box, Button, Typography, useTheme, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { setCredentials } from "./auth";
import { useRegisterMutation } from "./auth";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await register({
        username: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        matchingPassword: values.matchingPassword,
        role: "USER"
      });
      navigate("/dashboard");
    } catch (err) {
        console.log(JSON.stringify(err));
        if (!err?.status) {
          setErrors({ general: "No Server Response" });
        } else if (err.status === 400) {
          setErrors({ general: "Missing Username or Password" });
        } else if (err.status === 401) {
          setErrors({ general: "Unauthorized" });
        } else if (err.status === 404) {
          setErrors({ general: "Resource not found" });
        } else if (err.status === 409) {
          setErrors({ general: "User already exists" });
        } else {
          setErrors({ general: "Registration Failed" });
        }
    }
    setSubmitting(false);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
    matchingPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="350px"
      height="550px"
      margin="auto"
      marginTop={20}
      padding={5}
      borderRadius={5}
      boxShadow={10}
      border={`1px solid ${theme.palette.primary.light}`}
      backgroundColor={theme.palette.background.lightPaper}
      sx={{
        "& .MuiInputBase-root": {
          backgroundColor: `${theme.palette.background.darkPaper} !important`,
        },
      }}
    >
      <Formik
        initialValues={{
          email: "",
          password: "",
          matchingPassword: "",
          firstName: "",
          lastName: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Typography variant="h4" align="center" gutterBottom>
              Register
            </Typography>
            <Box mb={2}>
              <Field
                as={TextField}
                fullWidth
                variant="outlined"
                type="text"
                label="Email"
                name="email"
              />
              <ErrorMessage name="email" component="div" className="errmsg" />
            </Box>
            <Box mb={2}>
              <Field
                as={TextField}
                fullWidth
                variant="outlined"
                type="password"
                label="Password"
                name="password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="errmsg"
              />
            </Box>
            <Box mb={2}>
              <Field
                as={TextField}
                fullWidth
                variant="outlined"
                type="password"
                label="Confirm Password"
                name="matchingPassword"
              />
              <ErrorMessage
                name="matchingPassword"
                component="div"
className="errmsg"
/>
</Box>
<Box mb={2}>
<Field
             as={TextField}
             fullWidth
             variant="outlined"
             type="text"
             label="First Name"
             name="firstName"
           />
<ErrorMessage
             name="firstName"
             component="div"
             className="errmsg"
           />
</Box>
<Box mb={2}>
<Field
             as={TextField}
             fullWidth
             variant="outlined"
             type="text"
             label="Last Name"
             name="lastName"
           />
<ErrorMessage
             name="lastName"
             component="div"
             className="errmsg"
           />
</Box>
<ErrorMessage
           name="general"
           component="p"
           className="errmsg"
           aria-live="assertive"
         />
<Button
variant="contained"
color="primary"
type="submit"
disabled={isSubmitting || isLoading}
style={{ backgroundColor: theme.palette.primary.dark }}
>
{isSubmitting ? "Loading" : "Register"}
</Button>
</Form>
)}
</Formik>
</Box>
);
}