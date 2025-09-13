import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CircularProgress,
} from "@mui/material";

import { Link } from "react-router-dom";

import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../app/store";
import { resetPassword, sendOtp } from "../../../actions/auth/authActions";
import { toast } from "react-toastify";

const ForgotPasswordForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [error, setError] = useState("");
  const [setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Nhập email, 2: Nhập OTP và mật khẩu

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSendOtp = async () => {
    setError("");

    if (!validateEmail(email)) {
      setError("Vui lòng nhập địa chỉ email hợp lệ.");
      return;
    }

    setIsLoading(true);
    try {
      // Thay thế bằng API gửi OTP của bạn
      // await axios.post("YOUR_BACKEND_API_URL/forgot-password", { email });
      const result = await dispatch(sendOtp(email));

      if (result.code === 1000) {
        setStep(2); // Chuyển sang bước 2
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      setError("Đã có lỗi xảy ra khi gửi OTP. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setError("");

    setIsLoading(true);
    try {
      const result = await dispatch(resetPassword({ email, otp, newPassword }));

      if (result.code === 1000) {
        setStep(3); // Chuyển sang bước 2
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      setError("Mã OTP không hợp lệ hoặc đã hết hạn.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h5"
                component="h1"
                fontWeight="bold"
                sx={{ textAlign: "center" }}
              >
                Forgot password?
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1, textAlign: "center" }}
              >
                Enter the email address associated with your account.
              </Typography>
            </Box>
            <TextField
              fullWidth
              label="
              Address email"
              variant="outlined"
              placeholder="john.doe@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
              error={!!error}
              helperText={error}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ py: 1.5, mb: 2 }}
              onClick={handleSendOtp}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : "Send OTP code"}
            </Button>
          </>
        );
      case 2:
        return (
          <>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h5"
                component="h1"
                fontWeight="bold"
                sx={{ textAlign: "center" }}
              >
                Enter OTP code and new password
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1, textAlign: "center" }}
              >
                OTP code has been sent to: <b>{email}</b>.
              </Typography>
            </Box>
            <TextField
              fullWidth
              label="OTP code"
              variant="outlined"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              sx={{ mb: 2 }}
              error={!!error}
              helperText={error}
            />
            <TextField
              fullWidth
              label="New password"
              variant="outlined"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              sx={{ mb: 2 }}
              error={!!error}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ py: 1.5, mb: 2 }}
              onClick={handleResetPassword}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : "Reset password"}
            </Button>
          </>
        );
      default:
        return (
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h5"
              component="h1"
              fontWeight="bold"
              color="success.main"
            >
              Successfully!
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Your password has been changed.
            </Typography>
            <Link
              to="/login"
              style={{
                color: "#556cd6",
                textDecoration: "none",
                marginTop: "16px",
              }}
            >
              Back to Login page
            </Link>
          </Box>
        );
    }
  };

  return (
    <Card sx={{ maxWidth: 400, p: 4, borderRadius: "12px", mx: "auto", my: 5 }}>
      {renderForm()}
    </Card>
  );
};

export default ForgotPasswordForm;
