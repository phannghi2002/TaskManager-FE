import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Chip,
  CircularProgress,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../../app/store";
import {
  getTask,
  updateProject,
  updateTask,
  // updateTaskStatus,
} from "../../../actions/project/projectActions";
import ChatRoomPage from "../ChatRoomPage/ChatRoomPage";

interface TaskDTOResponse {
  id: string;
  title: string;
  description: string;
  status: string;
  endDate: string;
}

export default function TaskPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { project } = useSelector((store: any) => store);

  const [loading, setLoading] = useState(true);
  const [editingTaskId, setEditingTaskId] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  console.log("hhh", project);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getTask());
        setLoading(false);
      } catch (error: any) {
        console.error("Error response:", error.response);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleEditClick = (task: TaskDTOResponse) => {
    console.log("in ra task xem nào", task);

    setEditingTaskId(task.id);
    setSelectedStatus(task.status);
  };

  const handleStatusChange = async (projectId: string, newStatus: string) => {
    setSelectedStatus(newStatus);
    console.log("in ra xem naof 2", projectId, editingTaskId, selectedStatus);

    await dispatch(
      updateTask({
        projectId,
        taskId: editingTaskId,
        body: {
          status: newStatus,
        },
      })
    );

    await dispatch(getTask());

    setEditingTaskId("");
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!project.projectMyTasks || project.projectMyTasks.length === 0) {
    return (
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          My Tasks
        </Typography>
        <Typography variant="body1" color="text.secondary">
          You have no tasks in any project.
        </Typography>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        My Tasks
      </Typography>

      {project.projectMyTasks.map((projectItem: any) => (
        <Accordion key={projectItem.id} defaultExpanded={false}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box>
              <Typography variant="h6">{projectItem.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {projectItem.description}
              </Typography>
            </Box>
          </AccordionSummary>

          <AccordionDetails>
            {projectItem.tasks.length > 0 ? (
              <List>
                {projectItem.tasks.map((task: any) => (
                  <ListItem key={task.id} divider>
                    <ListItemText
                      primary={task.title}
                      secondary={
                        <>
                          {task.description}
                          <br />
                          Deadline:{" "}
                          {task.endDate
                            ? format(new Date(task.endDate), "dd/MM/yyyy")
                            : "N/A"}
                        </>
                      }
                    />
                    {editingTaskId === task.id ? (
                      <Select
                        value={selectedStatus}
                        onChange={(e) =>
                          handleStatusChange(projectItem.id, e.target.value)
                        }
                        size="small"
                        sx={{ minWidth: 120, mr: 1 }}
                      >
                        <MenuItem value="TO_DO">TO_DO</MenuItem>
                        <MenuItem value="IN_PROGRESS">IN_PROGRESS</MenuItem>
                        <MenuItem value="DONE">DONE</MenuItem>
                      </Select>
                    ) : (
                      <Chip label={task.status} sx={{ mr: 1 }} />
                    )}

                    {editingTaskId === task.id ? null : (
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleEditClick(task)}
                      >
                        Update
                      </Button>
                    )}
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="text.secondary">
                There are no tasks related to you in this project.
              </Typography>
            )}
          </AccordionDetails>
        </Accordion>
      ))}

      {/* <ChatRoomPage chatRoomId="689e939c968999e0274bd9f6" /> */}
    </Box>
  );
}
