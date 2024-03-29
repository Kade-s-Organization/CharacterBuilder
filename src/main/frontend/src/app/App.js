import { useState } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { ProtectRoutes } from "../common/components/ProtectedRoutes";
import Dashboard from "../features/dashboard";
import Login from "../features/auth/LoginPage";
import NotFound from "../common/pages/notFound";
import { Box, dividerClasses, Typography } from "@mui/material";
import Topbar from "../common/components/navigation/Topbar";
import Sidebar from "../common/components/navigation/Sidebar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../theme";
import img from "../common/assets/loginBackground.png";
import { useSelector } from "react-redux";
import LandingPage from "../common/pages/landingPage";
import Register from "features/auth/RegisterPage";
import CharacterHome from "features/character";

export default function App() {
  const authenticated = useSelector((state) => state.auth.token);
  const [theme, colorMode] = useMode();
  const location = useLocation();
  const backgroundImage =
    location.pathname === "/login" || location.pathname === "/" || location.pathname === "/register"
      ? `url(${img})`
      : "";

  return (
    // todo get the email in this class and pass to header as prop, and convert to typescript
    // TODO use redux rather than contexts for the color mode. test
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div
          className="app"
          style={{
            backgroundImage: backgroundImage,
            backgroundSize: "660px 660px",
            backgroundRepeat: "repeat",
          }}
        >
          {location.pathname === "/login" || location.pathname === "/" || location.pathname === "/register" ? (
            <></>
          ) : (
            <Sidebar />
          )}
          <main className="content">
            <Topbar />
            <Routes>
              <Route
                path="/login"
                element={
                  authenticated ? <Navigate to="/dashboard" /> : <Login />
                }
              />
              <Route
                path="/register"
                element={
                  authenticated ? <Navigate to="/dashboard" /> : <Register />
                }
              />
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/character" element={<CharacterHome />} />
              <Route element={<ProtectRoutes />}>
                {/* Where things like account and character list go */}
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
