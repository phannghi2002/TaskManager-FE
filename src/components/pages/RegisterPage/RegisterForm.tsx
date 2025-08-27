import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  IconButton,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { useState } from "react";

import { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../app/store";
import { clearMessage, register } from "../../../actions/auth/authActions";
import { useSelector } from "react-redux";

interface FormData {
  email: string;
  password: string;
  fullName: string;
  dob: Dayjs | null;
  city: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  fullName?: string;
  dob?: string;
  city?: string;
}

const RegisterForm = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    fullName: "",
    dob: null,
    city: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isAgreed, setIsAgreed] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { auth } = useSelector((store: any) => store);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAgreed(event.target.checked);
  };

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

    if (!formData.fullName) {
      newErrors.fullName = "Tên không được để trống";
      isValid = false;
    }

    if (!formData.dob) {
      newErrors.dob = "Ngày sinh không được để trống";
      isValid = false;
    }

    if (!formData.city) {
      newErrors.city = "Thành phố không được để trống";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = async () => {
    const formIsValid = validateForm();

    if (formIsValid) {
      if (!isAgreed) {
        toast.error("Vui lòng đồng ý với Điều khoản và Điều kiện.");
        return;
      }
      try {
        console.log("Dữ liệu đăng ký hợp lệ:", formData);
        const result = await dispatch(register(formData));
        console.log(result);

        if (result.code === 1000) {
          toast.success("Đăng ký thành công");
          setFormData({
            email: "",
            password: "",
            fullName: "",
            dob: null,
            city: "",
          });
          setIsAgreed(false);
        } else {
          toast.error("Đăng ký that bai");
        }
      } catch (error) {
        console.log("Lỗi khi đăng ký:", error);
      }
    } else {
      console.log("Form không hợp lệ. Vui lòng kiểm tra lại các trường.");
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
              Register
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{" "}
              <Link
                to="/login"
                style={{ color: "#0099CC", textDecoration: "none" }}
              >
                Login
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
          <TextField
            fullWidth
            label="Full Name"
            variant="outlined"
            placeholder="Phan"
            sx={{ mb: 2 }}
            value={formData.fullName}
            onChange={(e) => {
              setFormData({ ...formData, fullName: e.target.value });
              setErrors({ ...errors, fullName: undefined });
              dispatch(clearMessage());
            }}
            error={!!errors.fullName}
            helperText={errors.fullName}
          />

          {/* <Box sx={{ width: "100%", paddingBottom: "16px" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateField"]}>
                <DateField
                  label="Date of birth"
                  error={!!errors.dob}
                  helperText={errors.dob}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box> */}
          <Box sx={{ width: "100%", paddingBottom: "16px" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date of birth"
                value={formData.dob}
                onChange={(newValue) => {
                  setFormData({ ...formData, dob: newValue });
                  setErrors({ ...errors, dob: undefined });
                  dispatch(clearMessage());
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.dob,
                    helperText: errors.dob,
                  },
                }}
              />
            </LocalizationProvider>
          </Box>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">City</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formData.city}
              label="City"
              onChange={(e) => {
                setFormData({ ...formData, city: e.target.value });
                setErrors({ ...errors, city: undefined });
                dispatch(clearMessage());
              }}
              error={!!errors.city}
            >
              <MenuItem value="Hà Nội">Hà Nội</MenuItem>
              <MenuItem value="Đà Nẵng">Đà Nẵng</MenuItem>
              <MenuItem value="Hồ Chí Minh">Hồ Chí Minh</MenuItem>
            </Select>

            {errors.city && (
              <FormHelperText error>{errors.city}</FormHelperText>
            )}
          </FormControl>

          <Box sx={{ color: "red" }}>{auth.error}</Box>

          <FormGroup sx={{ mb: 2 }}>
            <FormControlLabel
              control={
                <Checkbox checked={isAgreed} onChange={handleCheckboxChange} />
              }
              label={
                <Typography>
                  I have read the{" "}
                  <Link
                    to="/term"
                    style={{ color: "#0099CC", textDecoration: "none" }}
                  >
                    Terms and Conditions
                  </Link>
                </Typography>
              }
            />
          </FormGroup>

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
            onClick={handleRegister}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default RegisterForm;
