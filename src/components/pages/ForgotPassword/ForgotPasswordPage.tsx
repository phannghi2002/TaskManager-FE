import { Box, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Link } from "react-router-dom";
import RegisterForm from "./ForgotPasswordForm";

function FogotPasswordPage() {
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
          <RegisterForm />
        </Box>
      </Box>
    </>
  );
}

export default FogotPasswordPage;
