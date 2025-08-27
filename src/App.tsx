import HomePage from "./components/pages/HomePage/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage/LoginPage";
import { CssBaseline, ThemeProvider } from "@mui/material";
import GlobalResetStyles from "./styles/GlobalResetStyles";
import theme from "./styles/theme";
import RegisterPage from "./components/pages/RegisterPage/RegisterPage";
import FogotPasswordPage from "./components/pages/ForgotPassword/ForgotPasswordPage";
import TermPage from "./components/pages/TermPage/TermPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardLayout from "./components/layout/DashboardLayout";

import OverviewPage from "./components/pages/OverviewPage/OverviewPage";
import UserManagerPage from "./components/pages/UserManagerPage/UserManagerPage";

function App() {
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

            <Route element={<DashboardLayout />}>
              <Route path="/overview" element={<OverviewPage />} />
              <Route path="/users" element={<UserManagerPage />} />
            </Route>
          </Routes>
        </Router>

        <ToastContainer />
      </ThemeProvider>
    </>
  );
}

export default App;
