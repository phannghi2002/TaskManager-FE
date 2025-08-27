import { Box, Typography, TextField, Button, Card } from "@mui/material";

import { Link } from "react-router-dom";

const ForgotPasswordForm = () => {
  return (
    <Card sx={{ maxWidth: 400, p: 4, borderRadius: "12px" }}>
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h5"
          component="h1"
          fontWeight="bold"
          sx={{ textAlign: "left" }}
        >
          Forgot Password?
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1, textAlign: "left" }}
        >
          Enter the email address associated with your account and we'll send
          you a link to reset your password.
        </Typography>
      </Box>

      <TextField
        fullWidth
        label="Email address"
        variant="outlined"
        placeholder="john.doe@email.com"
        sx={{ mb: 2 }}
      />
      <Button
        fullWidth
        variant="contained"
        sx={{
          bgcolor: "#556cd6",
          "&:hover": {
            bgcolor: "#445aa8",
          },
          py: 1.5,
          mb: 2,
        }}
      >
        Send Reset Link
      </Button>
      <Box>
        <Link to="/login" style={{ color: "#556cd6", textDecoration: "none" }}>
          Back to Login
        </Link>
      </Box>
    </Card>
  );
};

export default ForgotPasswordForm;
