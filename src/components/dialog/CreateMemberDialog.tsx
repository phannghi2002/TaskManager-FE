import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import type { Dayjs } from "dayjs";
import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { clearMessage } from "../../actions/auth/authActions";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import RoleChip from "../../styles/RoleStyle";
import { toast } from "react-toastify";
import { createUser, getAllUser } from "../../actions/user/userActions";
import { useSelector } from "react-redux";

interface CreateMemberDialogProps {
  open: boolean;
  onClose: () => void; // Sử dụng kiểu hàm chính xác
}

interface FormData {
  email: string;
  password: string;
  fullName: string;
  dob: Dayjs | null;
  city: string;
  role: UserRole;
}

interface FormErrors {
  email?: string;
  password?: string;
  fullName?: string;
  dob?: string;
  city?: string;
}

export type UserRole = "Manager" | "Leader" | "Employee";

const ROLE_OPTIONS: UserRole[] = ["Manager", "Leader", "Employee"];

export default function CreateMemberDialog({
  open,
  onClose,
}: CreateMemberDialogProps) {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    fullName: "",
    dob: null,
    city: "",
    role: ROLE_OPTIONS[2],
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((store: any) => store);
  console.log("user", user);

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

  const roleToBackend = (role: string): string => {
    return role.toUpperCase();
  };

  let sendBe;
  const handleAdd = async () => {
    const formIsValid = validateForm();

    if (formIsValid) {
      try {
        console.log("Dữ liệu đăng ký hợp lệ:", formData);

        sendBe = { ...formData, role: [roleToBackend(formData.role)] };

        console.log("Dữ liệu sau khi map:", sendBe);

        const result = await dispatch(createUser(sendBe));
        console.log(result);

        if (result.code === 1000) {
          toast.success("Đăng ký thành công");
          onClose();
          setFormData({
            email: "",
            password: "",
            fullName: "",
            dob: null,
            city: "",
            role: ROLE_OPTIONS[2],
          });

          dispatch(getAllUser());
        } else {
          toast.error("Đăng ký that bai");
        }
      } catch (error) {
        console.log("Lỗi khi đăng ký:", error);
      }
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: {
            borderRadius: "20px",
            width: "35%",
            margin: "12px 20px",
          },
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            fontWeight: "600",
            mb: 1,
          }}
        >
          Add Member New
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
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
                sx={{ mb: 2, mt: 1 }}
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
                placeholder="Phan Nghi"
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

              <FormControl fullWidth sx={{ paddingBottom: "16px" }}>
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

              <TextField
                select
                label="Role"
                fullWidth
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value as UserRole })
                }
                variant="outlined"
                sx={{ height: "100%" }}
                InputProps={{
                  sx: {
                    borderRadius: "4px",
                    backgroundColor: "#fff",
                    height: "100%",
                  },
                }}
              >
                {ROLE_OPTIONS.map((role) => (
                  <MenuItem key={role} value={role}>
                    <RoleChip role={role} />
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            <Box sx={{ color: "red", textAlign: "center", pt: 1 }}>
              {user.error}
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{ marginLeft: 2, marginRight: 2, mb: 2, gap: "4px" }}
        >
          <Button
            onClick={onClose}
            sx={{
              textTransform: "none",
              color: "#000",
              borderRadius: "12px",
              fontWeight: "600",
              "&:hover": {
                bgcolor: "#E1E6E9",
              },
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            sx={{
              bgcolor: "#0F8EEF",
              borderRadius: "12px",
              color: "#fff",
              fontWeight: "600",
              textTransform: "none",
              width: "10%",
              height: "36.5px",
              "&:hover": {
                bgcolor: "#0C80D8",
              },
            }}
            onClick={handleAdd}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
