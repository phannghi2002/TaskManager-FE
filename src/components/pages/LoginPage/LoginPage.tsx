import { Box, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "90vh",
        }}
      >
        <Box sx={{ width: "90%", maxWidth: "400px" }}>
          <Box sx={{ mb: 4 }}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: "black",
                }}
              >
                <ArrowBackIcon />
                <Typography variant="body1" sx={{ fontWeight: "500" }}>
                  Back
                </Typography>
              </Box>
            </Link>
          </Box>
          <LoginForm />
        </Box>
      </Box>
    </>
  );
}

export default LoginPage;
