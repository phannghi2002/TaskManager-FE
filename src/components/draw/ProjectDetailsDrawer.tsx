// UserDetailsDrawer.tsx

import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import type { Project } from "../interface/Project";
import UserDetailRow from "../row/UserDetailRowProps";
import StatusChip from "../../styles/StatusStyle";
import React, { useEffect, useState } from "react";

import { MemberTable } from "../table/MemberTable";
import { TaskTable } from "../table/TaskTable";
import { capitalizeStatus } from "../../utils/convertToStatus";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import AddIcon from "@mui/icons-material/Add";
import {
  getAllProject,
  updateProject,
} from "../../actions/project/projectActions";
import { useSelector } from "react-redux";
import AddMemberDialog from "../dialog/AddMemberDialog";
import { getAllUser } from "../../actions/user/userActions";
import AddTaskDialog from "../dialog/AddTaskDialog";

export type ProjectStatus =
  | "Planning"
  | "In_progress"
  | "Completed"
  | "Cancelled";

const STATUS_OPTIONS: ProjectStatus[] = [
  "Planning",
  "Cancelled",
  "Completed",
  "In_progress",
];

interface ProjectDetailsDrawerProps {
  open: boolean;
  onClose: () => void;
  project: Project; // Use a more specific type if possible
  edit?: boolean;
}

interface ProjectFormValue {
  description: string;
  name: string;
  endDate: Dayjs | null;
  startDate: Dayjs | null;
  status: string;
}
export interface User {
  userId: string;
  fullName: string;
  email: string;
  role: string;
}

export default function ProjectDetailsDrawer({
  open,
  onClose,
  project,
  edit = false,
}: ProjectDetailsDrawerProps) {
  if (!project) {
    return null;
  }

  const { user } = useSelector((store: any) => store);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (user.users.length === 0) {
      dispatch(getAllUser());
    }
  }, []);

  const allUsers: User[] = user.users;

  const handleAddMembers = (selectedMembers: User[]) => {
    console.log("Các thành viên đã được chọn:", selectedMembers);
    handleClose();
  };

  const [openAdd, setOpenAdd] = useState(false);

  const handleClickAdd = () => {
    setOpenAdd(true);
  };

  const handleClose = () => {
    setOpenAdd(false);
  };

  const [openAddTask, setOpenAddTask] = useState(false);

  const handleClickAddTask = () => {
    setOpenAddTask(true);
  };

  const handleCloseTask = () => {
    setOpenAddTask(false);
  };

  const [formValue, setFormValue] = React.useState<ProjectFormValue>({
    description: project.description,
    endDate: project.endDate ? dayjs(project.endDate) : null,
    startDate: project.startDate ? dayjs(project.startDate) : null,
    status: project.status,
    name: project.name,
  });

  const handleUpdate = async () => {
    const changedFields: {
      description?: string;
      name?: string;
      endDate?: Dayjs | null;
      startDate?: Dayjs | null;
      status?: string;
    } = {};

    if (formValue.description !== project.description) {
      changedFields.description = formValue.description;
    }
    if (formValue.name !== project.name) {
      changedFields.name = formValue.name;
    }

    if (!dayjs(formValue.endDate).isSame(dayjs(project.endDate))) {
      changedFields.endDate = formValue.endDate
        ? dayjs(formValue.endDate)
        : null;
    }

    if (!dayjs(formValue.startDate).isSame(dayjs(project.startDate))) {
      changedFields.startDate = formValue.startDate
        ? dayjs(formValue.startDate)
        : null;
    }

    if (formValue.status !== project.status) {
      changedFields.status = formValue.status.toUpperCase();
    }

    const requestData = {
      projectId: project.id,
      body: changedFields,
    };

    console.log("Data to send to API:", requestData);

    await dispatch(updateProject(requestData));

    onClose();
    await dispatch(getAllProject());
  };

  const renderStatusField = () => {
    if (edit) {
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
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: "bold", color: "#555", width: "20%" }}
          >
            Status
          </Typography>

          <TextField
            select
            label=""
            value={capitalizeStatus(formValue.status)}
            onChange={(e) =>
              setFormValue({
                ...formValue,
                status: e.target.value as ProjectStatus,
              })
            }
            variant="outlined"
            size="small"
            sx={{ width: "80%" }}
            InputProps={{
              sx: {
                borderRadius: "12px",
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
    }

    return (
      <UserDetailRow
        label="Status"
        value={<StatusChip status={project.status as ProjectStatus} />}
        isComponent={true}
      />
    );
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          // width: "calc((100% - 240px) / 2)",
          width: "60%",
        },
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "600" }}>
            {project.name}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ p: 2 }}>
          <UserDetailRow label="Project ID" value={project.id} />
          <UserDetailRow
            label="Name"
            value={formValue.name}
            edit={edit}
            onChange={(e) => {
              console.log("New name:", e.target.value);
              setFormValue({
                ...formValue,
                name: e.target.value,
              });
            }}
          />
          <UserDetailRow
            label="Description"
            value={formValue.description}
            edit={edit}
            onChange={(e) => {
              console.log("New description:", e.target.value);
              setFormValue({
                ...formValue,
                description: e.target.value,
              });
            }}
          />

          {edit ? (
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
              {/* Label giống UserDetailRow */}
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: "bold",
                  color: "#555",
                  width: "20%",
                  lineHeight: "30px",
                  flexShrink: 0,
                }}
              >
                Start Date
              </Typography>

              <Box sx={{ width: "80%" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={dayjs(formValue.startDate)}
                    onChange={(newValue) =>
                      setFormValue({
                        ...formValue,
                        startDate: newValue,
                      })
                    }
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        size: "small",
                        sx: {
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px !important",
                            backgroundColor: "#fff",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#4A90E2", // border
                          },
                          "& .MuiOutlinedInput-input": {
                            paddingTop: "4px",
                            paddingBottom: "4px",
                          },
                        },
                      },
                    }}
                  />
                </LocalizationProvider>
              </Box>
            </Box>
          ) : (
            <UserDetailRow
              label="Start Date"
              value={
                formValue.startDate
                  ? formValue.startDate.format("YYYY-MM-DD")
                  : ""
              }
            />
          )}

          {edit ? (
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
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: "bold",
                  color: "#555",
                  width: "20%",
                  lineHeight: "30px",
                  flexShrink: 0,
                }}
              >
                End Date
              </Typography>

              <Box sx={{ width: "80%" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={dayjs(formValue.endDate)}
                    onChange={(newValue) =>
                      setFormValue({
                        ...formValue,
                        endDate: newValue,
                      })
                    }
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        size: "small",
                        sx: {
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px !important",
                            backgroundColor: "#fff",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#4A90E2", // border
                          },
                          "& .MuiOutlinedInput-input": {
                            paddingTop: "4px",
                            paddingBottom: "4px",
                          },
                        },
                      },
                    }}
                  />
                </LocalizationProvider>
              </Box>
            </Box>
          ) : (
            <UserDetailRow
              label="End Date"
              value={
                formValue.endDate ? formValue.endDate.format("YYYY-MM-DD") : ""
              }
            />
          )}

          <UserDetailRow label="Create By" value={project.createBy} />

          {renderStatusField()}

          <Typography variant="h6" sx={{ mt: 3, mb: 1, fontWeight: "600" }}>
            Members
          </Typography>

          {edit && (
            <Button
              variant="contained"
              sx={{
                bgcolor: "#0F8EEF",
                borderRadius: "12px",
                color: "#000",
                fontWeight: "600",
                textTransform: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                "&:hover": {
                  bgcolor: "#0C80D8",
                },
                mb: 2,
              }}
              onClick={handleClickAdd}
            >
              <AddIcon sx={{ marginLeft: "-7px" }} />
              Add member
            </Button>
          )}

          <MemberTable members={project.members} projectId={project.id} />

          <Typography variant="h6" sx={{ mt: 3, mb: 1, fontWeight: "600" }}>
            Tasks
          </Typography>

          {edit && (
            <Button
              variant="contained"
              sx={{
                bgcolor: "#0F8EEF",
                borderRadius: "12px",
                color: "#000",
                fontWeight: "600",
                textTransform: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                "&:hover": {
                  bgcolor: "#0C80D8",
                },
                mb: 2,
              }}
              onClick={handleClickAdd}
            >
              <AddIcon sx={{ marginLeft: "-7px" }} />
              Add task
            </Button>
          )}
          <TaskTable tasks={project.tasks} />

          {edit && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                paddingTop: "24px",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#0F8EEF",
                  borderRadius: "12px",
                  color: "#000",
                  fontWeight: "600",
                  textTransform: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  "&:hover": {
                    bgcolor: "#0C80D8",
                  },
                }}
                onClick={handleUpdate}
              >
                Update
              </Button>

              <Button
                variant="contained"
                sx={{
                  bgcolor: "#D0BABA",
                  borderRadius: "12px",
                  color: "#000",
                  fontWeight: "600",
                  textTransform: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  "&:hover": {
                    bgcolor: "#CAAEAE",
                  },
                }}
                onClick={onClose}
              >
                Cancel
              </Button>
            </Box>
          )}

          <AddMemberDialog
            open={openAdd}
            handleClose={handleClose}
            users={allUsers}
            projectId={project.id}
            handleAddMembers={handleAddMembers}
          />

          <AddTaskDialog
            open={openAddTask}
            handleClose={handleCloseTask}
            users={allUsers}
            projectId={project.id}
          />
        </Box>
      </Box>
    </Drawer>
  );
}
