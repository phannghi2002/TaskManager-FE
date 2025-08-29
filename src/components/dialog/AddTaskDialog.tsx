import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  DialogContentText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import {
  addTask,
  clearMessage,
  getAllProject,
} from "../../actions/project/projectActions";
import type { Dayjs } from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useSelector } from "react-redux";
import type { Member } from "../interface/Member";
import { toast } from "react-toastify";

// Định nghĩa kiểu dữ liệu cho một User
// export interface User {
//   userId: string;
//   fullName: string;
//   email: string;
//   role: string;
// }

interface FormData {
  title: string;
  description: string;
  assigneeId: string;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  // users: User[]
}

interface FormErrors {
  title?: string;
  description?: string;
  assigneeId?: string;
  startDate?: string;
  endDate?: string;
}

interface AddTaskDialogProps {
  open: boolean;
  onClose: () => void;
  members: Member[];
  projectId: string;
}

export default function AddTaskDialog({
  open,
  onClose,
  members,
  projectId,
}: AddTaskDialogProps) {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    assigneeId: "",
    startDate: null,
    endDate: null,
  });

  console.log("Member", members);

  const [errors, setErrors] = useState<FormErrors>({});
  const dispatch = useDispatch<AppDispatch>();
  const { project } = useSelector((store: any) => store);

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: FormErrors = {};

    if (!formData.title) {
      newErrors.title = "title không được để trống";
      isValid = false;
    }

    if (!formData.description) {
      newErrors.description = "Mật khẩu không được để trống";
      isValid = false;
    }

    if (!formData.assigneeId) {
      newErrors.assigneeId = "Tên không được để trống";
      isValid = false;
    }

    if (!formData.startDate) {
      newErrors.startDate = "Ngày sinh không được để trống";
      isValid = false;
    }

    if (!formData.endDate) {
      newErrors.endDate = "Thành phố không được để trống";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  let sendBe;

  const handleAdd = async () => {
    const formIsValid = validateForm();

    if (formIsValid) {
      try {
        console.log("Dữ liệu đăng ký hợp lệ:", formData);
        sendBe = {
          projectId: projectId,
          body: formData,
        };

        const result = await dispatch(addTask(sendBe));
        console.log(result);

        if (result.code === 1000) {
          toast.success("Create task successfully");
          onClose();
          setFormData({
            title: "",
            description: "",
            startDate: null,
            endDate: null,
            assigneeId: "",
          });

          dispatch(getAllProject());
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
          Add Task New
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
                label="Title"
                variant="outlined"
                placeholder="Fix002"
                sx={{ mb: 2, mt: 1 }}
                value={formData.title}
                onChange={(e) => {
                  setFormData({ ...formData, title: e.target.value });
                  setErrors({ ...errors, title: undefined });
                  dispatch(clearMessage());
                }}
                error={!!errors.title}
                helperText={errors.title}
              />
              <TextField
                fullWidth
                label="Description"
                type="description"
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

              <FormControl fullWidth sx={{ paddingBottom: "16px" }}>
                <InputLabel id="demo-simple-select-label">
                  AssigneeId
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData.assigneeId}
                  label="AssigneeId"
                  onChange={(e) => {
                    setFormData({ ...formData, assigneeId: e.target.value });
                    setErrors({ ...errors, assigneeId: undefined });
                    dispatch(clearMessage());
                  }}
                  error={!!errors.assigneeId}
                >
                  {members.map((member) => (
                    <MenuItem value={member.id}>{member.id}</MenuItem>
                  ))}
                </Select>

                {errors.assigneeId && (
                  <FormHelperText error>{errors.assigneeId}</FormHelperText>
                )}
              </FormControl>
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
