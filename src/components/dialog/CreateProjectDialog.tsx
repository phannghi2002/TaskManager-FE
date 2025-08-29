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
import type { Dayjs } from "dayjs";
import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { clearMessage } from "../../actions/auth/authActions";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { toast } from "react-toastify";

import { useSelector } from "react-redux";
import {
  createProject,
  getAllProject,
} from "../../actions/project/projectActions";

interface CreateProjectDialogProps {
  open: boolean;
  onClose: () => void; // Sử dụng kiểu hàm chính xác
}

interface FormData {
  name: string;
  description: string;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}

interface FormErrors {
  name?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

export default function CreateProjectDialog({
  open,
  onClose,
}: CreateProjectDialogProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    startDate: null,
    endDate: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const dispatch = useDispatch<AppDispatch>();
  const { project } = useSelector((store: any) => store);
  console.log("project", project);

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: FormErrors = {};

    if (!formData.name) {
      newErrors.name = "Tên dự án không được để trống";
      isValid = false;
    }

    if (!formData.description) {
      newErrors.description = "Mô tả không được để trống";
      isValid = false;
    }

    if (!formData.startDate) {
      newErrors.startDate = "Ngày bắt đầu không được để trống";
      isValid = false;
    }

    if (!formData.endDate) {
      newErrors.endDate = "Ngày kết thúc không được để trống";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleAdd = async () => {
    const formIsValid = validateForm();

    if (formIsValid) {
      try {
        console.log("Dữ liệu đăng ký hợp lệ:", formData);

        // console.log("Dữ liệu sau khi map:", sendBe);

        const result = await dispatch(createProject(formData));
        console.log(result);

        if (result.code === 1000) {
          toast.success("Create project successfully");
          onClose();
          setFormData({
            name: "",
            description: "",
            startDate: null,
            endDate: null,
          });

          dispatch(getAllProject());
        } else {
          toast.error("Create project failed");
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
          Add Project New
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
                label="Name"
                variant="outlined"
                placeholder="PRO001"
                sx={{ mb: 2, mt: 1 }}
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  setErrors({ ...errors, name: undefined });
                  dispatch(clearMessage());
                }}
                error={!!errors.name}
                helperText={errors.name}
              />
              <TextField
                fullWidth
                label="Description"
                placeholder="Project manager "
                variant="outlined"
                sx={{ mb: 2 }}
                value={formData.description}
                onChange={(e) => {
                  setFormData({ ...formData, description: e.target.value });
                  setErrors({ ...errors, description: undefined });
                  dispatch(clearMessage());
                }}
                error={!!errors.description}
                helperText={errors.description}
              />

              <Box sx={{ width: "100%", paddingBottom: "16px" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Start Date"
                    value={formData.startDate}
                    onChange={(newValue) => {
                      setFormData({ ...formData, startDate: newValue });
                      setErrors({ ...errors, startDate: undefined });
                      dispatch(clearMessage());
                    }}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors.startDate,
                        helperText: errors.startDate,
                      },
                    }}
                  />
                </LocalizationProvider>
              </Box>

              <Box sx={{ width: "100%", paddingBottom: "16px" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="End Date"
                    value={formData.endDate}
                    onChange={(newValue) => {
                      setFormData({ ...formData, endDate: newValue });
                      setErrors({ ...errors, endDate: undefined });
                      dispatch(clearMessage());
                    }}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors.endDate,
                        helperText: errors.endDate,
                      },
                    }}
                  />
                </LocalizationProvider>
              </Box>
            </Box>

            <Box sx={{ color: "red", textAlign: "center", pt: 1 }}>
              {project.error}
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
