import React from "react";
import { Box, Button, Typography, useTheme, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { setCredentials } from "./auth";
import { useLoginMutation } from "./auth";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      const userData = await login({
        email: values.email,
        password: values.password
      }).unwrap();
      dispatch(setCredentials({ ...userData, user: values.email }));
      navigate(-1);
    } catch (err) {
      if (!err?.status) {
        setStatus("No Server Response");
      } else if (err.status === 400) {
        setStatus("Missing Username or Password");
      } else if (err.status === 401) {
        setStatus("Unauthorized");
      } else {
        setStatus("Login Failed");
      }
    }
    setSubmitting(false);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required")
  });

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="350px"
      height="350px"
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
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Typography variant="h4" align="center" gutterBottom>
              Login
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
              {isSubmitting ? "Loading" : "Login"}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

