import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { changePassword, clearMessage } from "../../actions/auth/authActions";

import { toast } from "react-toastify";

import { useSelector } from "react-redux";

interface ChangePasswordDialogProps {
  open: boolean;
  onClose: () => void; // Sử dụng kiểu hàm chính xác
}

interface FormData {
  oldPassword: string;
  newPassword: string;
  repeatNewPassword: string;
}

interface FormErrors {
  oldPassword?: string;
  newPassword?: string;
  repeatNewPassword?: string;
}

export default function ChangePasswordDialog({
  open,
  onClose,
}: ChangePasswordDialogProps) {
  const [formData, setFormData] = useState<FormData>({
    oldPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const dispatch = useDispatch<AppDispatch>();
  const { auth } = useSelector((store: any) => store);

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: FormErrors = {};

    if (!formData.oldPassword) {
      newErrors.oldPassword = "Password is mandatory";
      isValid = false;
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is mandatory";
      isValid = false;
    }

    if (!formData.repeatNewPassword) {
      newErrors.repeatNewPassword = "Repeat new password is mandatory";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleUpdate = async () => {
    const formIsValid = validateForm();

    if (formIsValid) {
      try {
        console.log("Dữ liệu đăng ký hợp lệ:", formData, auth);

        // console.log("Dữ liệu sau khi map:", sendBe);

        const result = await dispatch(changePassword(formData));
        console.log(result);

        if (result.code === 1000) {
          toast.success("Change password successfully");
          onClose();
          setFormData({
            oldPassword: "",
            newPassword: "",
            repeatNewPassword: "",
          });
        } else {
          toast.error(result.message);
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
          Change Password
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
                label="Old Password"
                type="password"
                variant="outlined"
                sx={{ mb: 2, mt: 1 }}
                value={formData.oldPassword}
                onChange={(e) => {
                  setFormData({ ...formData, oldPassword: e.target.value });
                  setErrors({ ...errors, oldPassword: undefined });
                  dispatch(clearMessage());
                }}
                error={!!errors.oldPassword}
                helperText={errors.oldPassword}
              />
              <TextField
                fullWidth
                label="New Pasword"
                type="password"
                variant="outlined"
                sx={{ mb: 2 }}
                value={formData.newPassword}
                onChange={(e) => {
                  setFormData({ ...formData, newPassword: e.target.value });
                  setErrors({ ...errors, newPassword: undefined });
                  dispatch(clearMessage());
                }}
                error={!!errors.newPassword}
                helperText={errors.newPassword}
              />

              <TextField
                fullWidth
                label="Repeat New Pasword"
                type="password"
                variant="outlined"
                sx={{ mb: 2 }}
                value={formData.repeatNewPassword}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    repeatNewPassword: e.target.value,
                  });
                  setErrors({ ...errors, repeatNewPassword: undefined });
                  dispatch(clearMessage());
                }}
                error={!!errors.repeatNewPassword}
                helperText={errors.repeatNewPassword}
              />
            </Box>

            <Box sx={{ color: "red", textAlign: "center", pt: 1 }}>
              {auth.error}
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
            onClick={handleUpdate}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
