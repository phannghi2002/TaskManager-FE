import HomePage from "./components/pages/HomePage/HomePage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import { CssBaseline, ThemeProvider } from "@mui/material";
import GlobalResetStyles from "./styles/GlobalResetStyles";
import theme from "./styles/theme";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardLayout from "./components/layout/DashboardLayout";

import TermPage from "./components/pages/TermPage/TermPage";
import LoginPage from "./components/pages/LoginPage/LoginPage";
import RegisterPage from "./components/pages/RegisterPage/RegisterPage";
import FogotPasswordPage from "./components/pages/ForgotPassword/ForgotPasswordPage";
import OverviewPage from "./components/pages/OverviewPage/OverviewPage";
import UserManagerPage from "./components/pages/UserManagerPage/UserManagerPage";
import NotFoundPage from "./components/pages/NotFoundPage/NotFoundPage";
import UnauthorizedPage from "./components/pages/UnauthorizedPage/UnauthorizedPage";
import ProjectPage from "./components/pages/ProjectPage/ProjectPage";

interface PrivateRouteWrapperProps {
  isAuthenticated: boolean;
}

function App() {
  const token = localStorage.getItem("jwt");
  const isAuthenticated = !!token;

  const PrivateRouteWrapper = ({
    isAuthenticated,
  }: PrivateRouteWrapperProps) => {
    return isAuthenticated ? (
      <Outlet />
    ) : (
      <Navigate to="/unauthorized" replace />
    );
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalResetStyles />
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/term" element={<TermPage />} />
            <Route path="/forgot-password" element={<FogotPasswordPage />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />

            <Route
              element={
                <PrivateRouteWrapper isAuthenticated={isAuthenticated} />
              }
            >
              <Route element={<DashboardLayout />}>
                <Route path="/overview" element={<OverviewPage />} />
                <Route path="/users" element={<UserManagerPage />} />
                <Route path="/project" element={<ProjectPage />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>

        <ToastContainer />
      </ThemeProvider>
    </>
  );
}

export default App;
