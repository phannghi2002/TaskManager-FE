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

interface TaskTableProps {
  tasks: Task[];
  projectId: string;
}

export const TaskTable = ({ tasks, projectId }: TaskTableProps) => {
  const [open, setOpen] = useState(false);
  const [selectTask, setSelectTask] = useState("");

  const handleDelete = (id: string) => {
    setOpen(true);
    console.log("id", id);
    setSelectTask(id);
  };

  const handleClose = () => {
    setOpen(false);
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
                  <TableCell>
                    {format(new Date(task.deadline), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{ display: "flex", gap: 1, justifyContent: "center" }}
                    >
                      <IconButton size="small" aria-label="edit">
                        <EditIcon
                          fontSize="small"
                          // onClick={() => handleEdit(task)}
                        />
                      </IconButton>
                      <IconButton
                        size="small"
                        aria-label="delete"
                        onClick={() => handleDelete(task.id)}
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
        taskId={selectTask}
        projectId={projectId}
      />
    </>
  );
};
