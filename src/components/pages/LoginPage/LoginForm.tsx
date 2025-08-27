import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { login, clearMessage } from "../../../actions/auth/authActions";
import type { AppDispatch } from "../../../app/store";
import { useSelector } from "react-redux";

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const LoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const dispatch = useDispatch<AppDispatch>();
  const { auth } = useSelector((store: any) => store);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = "Email không được để trống";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Mật khẩu không được để trống";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    const formIsValid = validateForm();

    if (formIsValid) {
      try {
        const resultAction = await dispatch(login(formData));

        if (resultAction.code === 1000) {
          navigate("/overview");
        }
      } catch (error) {
        console.error("Login thất bại. Lỗi:", error, formData);
      }
    }
  };

  return (
    <Card sx={{ p: 4, borderRadius: "12px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box>
            <Typography
              variant="h5"
              component="h1"
              fontWeight="bold"
              sx={{ textAlign: "left" }}
            >
              Log in
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{" "}
              <Link
                to="/register"
                style={{ color: "#0099CC", textDecoration: "none" }}
              >
                Register
              </Link>
            </Typography>
          </Box>
          <IconButton aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            fullWidth
            label="Email address"
            variant="outlined"
            placeholder="john.doe@email.com"
            sx={{ mb: 2 }}
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              setErrors({ ...errors, email: undefined });
              dispatch(clearMessage());
            }}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            sx={{ mb: 2 }}
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
              setErrors({ ...errors, password: undefined });
              dispatch(clearMessage());
            }}
            error={!!errors.password}
            helperText={errors.password}
          />

          <Box sx={{ color: "red" }}>{auth.error}</Box>
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
              height: "40px",
              textAlign: "justify",
              borderRadius: "10px",
              fontWeight: "600",
            }}
            onClick={handleLogin}
          >
            Log in
          </Button>
          <Button
            color="primary"
            sx={{ textTransform: "none", color: "#556cd6" }}
            onClick={() => navigate("/forgot-password")}
          >
            Forgot password?
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default LoginForm;
