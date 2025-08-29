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
  Typography,
} from "@mui/material";
import type { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { clearMessage } from "../../actions/auth/authActions";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { useSelector } from "react-redux";

import type { Task } from "../interface/Task";
import dayjs from "dayjs";
import { capitalizeStatus } from "../../utils/convertToStatus";
import type { TaskStatus } from "../../styles/TaskStatusStyle";
import StatusChip from "../../styles/TaskStatusStyle";
import type { Member } from "../interface/Member";
import {
  getAllProject,
  updateTask,
} from "../../actions/project/projectActions";
import { toast } from "react-toastify";

interface EditTaskDialogProps {
  open: boolean;
  onClose: () => void; // Sử dụng kiểu hàm chính xác
  task: Task;
  members: Member[];
  projectId: string;
}

interface FormData {
  title: string;
  description: string;
  assigneeId: string;
  deadline: Dayjs | null;
  status: string;
}

interface FormErrors {
  title?: string;
  description?: string;
  deadline?: string;
  assigneeId?: string;
  status?: string;
}

interface TaskUpdateData {
  projectId: string;
  taskId: string;
  body: {
    title?: string;
    description?: string;
    endDate?: Dayjs | null;
    assigneeId?: string;
    status?: string;
  };
}

const STATUS_OPTIONS: TaskStatus[] = ["To_do", "In_progress", "Done"];

export default function EditTaskDialog({
  open,
  onClose,
  task,
  members,
  projectId,
}: EditTaskDialogProps) {
  const [formData, setFormData] = useState<FormData>({
    title: task.title,
    description: task.description,
    assigneeId: task.assigneeId,
    deadline: task.deadline ? dayjs(task.deadline) : null,
    status: task.status,
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        assigneeId: task.assigneeId,
        deadline: task.deadline ? dayjs(task.deadline) : null,
        status: task.status,
      });
    }
  }, [task]);

  const [errors, setErrors] = useState<FormErrors>({});
  const dispatch = useDispatch<AppDispatch>();
  const { project } = useSelector((store: any) => store);
  console.log("project", project);

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: FormErrors = {};

    if (!formData.title) {
      newErrors.title = "Tên dự án không được để trống";
      isValid = false;
    }

    if (!formData.description) {
      newErrors.description = "Mô tả không được để trống";
      isValid = false;
    }

    if (!formData.assigneeId) {
      newErrors.assigneeId = "Mô tả không được để trống";
      isValid = false;
    }

    if (!formData.deadline) {
      newErrors.deadline = "Ngày kết thúc không được để trống";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleAdd = async () => {
    const formIsValid = validateForm();
    console.log("taskId", task.id);

    if (formIsValid) {
      const changedFields: {
        title?: string;
        description?: string;
        endDate?: Dayjs | null;
        assigneeId?: string;
        status?: string;
      } = {};

      if (formData.title !== task.title) {
        changedFields.title = formData.title;
      }
      if (formData.description !== task.description) {
        changedFields.description = formData.description;
      }
      if (!dayjs(formData.deadline).isSame(dayjs(task.deadline))) {
        changedFields.endDate = formData.deadline
          ? dayjs(formData.deadline)
          : null;
      }
      if (formData.status !== task.status) {
        changedFields.status = formData.status.toLocaleUpperCase();
      }
      if (formData.assigneeId !== task.assigneeId) {
        changedFields.assigneeId = formData.assigneeId;
      }

      const requestData: TaskUpdateData = {
        projectId: projectId, // Assuming you have access to the user's ID
        taskId: task.id,
        body: changedFields,
      };

      try {
        console.log("Dữ liệu đăng ký hợp lệ:", formData);
        console.log("Dữ liệu sau khi tahy dodior:", requestData);

        const result = await dispatch(updateTask(requestData));
        console.log(result);

        if (result.code === 1000) {
          toast.success("Edit task successfully");
          onClose();

          dispatch(getAllProject());
        } else {
          toast.error("Edit task failed");
        }
      } catch (error) {
        console.log("Lỗi khi đăng ký:", error);
      }
    }
  };

  const renderStatusField = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "8px",
          alignItems: "center",
          mb: 2,
          height: "40px",
        }}
      >
        <TextField
          select
          label="Status"
          value={capitalizeStatus(formData.status)}
          onChange={(e) =>
            setFormData({
              ...formData,
              status: e.target.value as TaskStatus,
            })
          }
          variant="outlined"
          sx={{ width: "100%", mt: 2 }}
          InputProps={{
            sx: {
              backgroundColor: "#fff",
              height: "100%",
            },
          }}
        >
          {STATUS_OPTIONS.map((status) => (
            <MenuItem key={status} value={status}>
              <StatusChip status={status} />
            </MenuItem>
          ))}
        </TextField>
      </Box>
    );
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
          Update Task
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
                placeholder="PRO001"
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
                placeholder="Build UI task"
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
                    label="Deadline"
                    value={formData.deadline}
                    onChange={(newValue) => {
                      setFormData({ ...formData, deadline: newValue });
                      setErrors({ ...errors, deadline: undefined });
                      dispatch(clearMessage());
                    }}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors.deadline,
                        helperText: errors.deadline,
                      },
                    }}
                  />
                </LocalizationProvider>
              </Box>
            </Box>
            {renderStatusField()}

            <FormControl fullWidth sx={{ mt: "16px" }}>
              <InputLabel id="demo-simple-select-label">AssigneeId</InputLabel>
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
                {members?.map((member) => (
                  <MenuItem value={member.id}>{member.id}</MenuItem>
                ))}
              </Select>

              {errors.assigneeId && (
                <FormHelperText error>{errors.assigneeId}</FormHelperText>
              )}
            </FormControl>
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
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
