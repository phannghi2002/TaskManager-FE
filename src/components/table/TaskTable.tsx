import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { format } from "date-fns";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import type { Task } from "../interface/Task";
import StatusChip from "../../styles/StatusStyle";
import RemoveTaskDialog from "../dialog/RemoveTaskDialog";
import { useState } from "react";
import EditTaskDialog from "../dialog/EditTaskDialog";
import type { Member } from "../interface/Member";

interface TaskTableProps {
  tasks: Task[];
  projectId: string;
  members: Member[];
}

export const TaskTable = ({ tasks, projectId, members }: TaskTableProps) => {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [selectTask, setSelectTask] = useState<Task>({
    id: "",
    title: "",
    description: "",
    status: "",
    assigneeId: "",
    deadline: "",
  });

  // console.log("members", members);

  const handleDelete = (task: Task) => {
    setOpen(true);
    console.log("task", task);
    setSelectTask(task);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = (task: Task) => {
    setUpdate(true);
    setSelectTask(task);
  };

  const handleCloseUpdate = () => {
    setUpdate(false);
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#E1E6E9" }}>
              <TableCell sx={{ width: "10%" }}>Title</TableCell>
              <TableCell sx={{ width: "30%" }}>Description</TableCell>
              <TableCell sx={{ width: "10%" }}>Status</TableCell>
              <TableCell sx={{ width: "20%" }}>AssigneeId</TableCell>
              <TableCell sx={{ width: "20%" }}>Deadline</TableCell>
              <TableCell sx={{ width: "20%" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>
                    <StatusChip status={task.status as any} />
                  </TableCell>
                  <TableCell>{task.assigneeId}</TableCell>
                  <TableCell>{format(task.deadline, "dd/MM/yyyy")}</TableCell>
                  <TableCell>
                    <Box
                      sx={{ display: "flex", gap: 1, justifyContent: "center" }}
                    >
                      <IconButton size="small" aria-label="edit">
                        <EditIcon
                          fontSize="small"
                          onClick={() => handleUpdate(task)}
                        />
                      </IconButton>
                      <IconButton
                        size="small"
                        aria-label="delete"
                        onClick={() => handleDelete(task)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Chưa có nhiệm vụ nào được giao
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <RemoveTaskDialog
        open={open}
        onClose={handleClose}
        taskId={selectTask?.id}
        projectId={projectId}
      />

      <EditTaskDialog
        open={update}
        onClose={handleCloseUpdate}
        task={selectTask}
        members={members}
        projectId={projectId}
      />
    </>
  );
};
