import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import type { Project } from "../interface/Project";
import { format } from "date-fns";

import { useState } from "react";
import ProjectDetailsDrawer from "../draw/ProjectDetailsDrawer";
import { Box, Menu, MenuItem } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteProjectDialog from "../dialog/DeleteProjectDialog";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { createChat } from "../../actions/chat/chatActions";
import { toast } from "react-toastify";

export default function ProjectCard({ card }: { card: Project }) {
  const dispatch = useDispatch<AppDispatch>();

  const [open, setOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDrawerEdit, setOpenDrawerEdit] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const handleOpenDrawerEdit = () => {
    setOpenDrawerEdit(true);
  };

  const handleCloseDrawerEdit = () => {
    setOpenDrawerEdit(false);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<string>("");
  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    projectId: string
  ) => {
    console.log("la nhi", projectId);

    setAnchorEl(event.currentTarget);
    setSelectedProject(projectId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCreateGroupChat = async () => {
    console.log("project ne", selectedProject);

    const result = await dispatch(createChat({ projectId: selectedProject }));
    if (result.code === 1000) {
      toast.success("Create group project chat successfully");
    } else {
      toast.error(result.message);
    }
    handleMenuClose();
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
          m: 2,
          "&:hover": {
            cursor: "pointer",
          },
        }}
        // onClick={() => handleOpenDrawer(card)}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              {card.name[0]} {/* lấy chữ cái đầu */}
            </Avatar>
          }
          action={
            <IconButton
              aria-label="settings"
              onClick={(event) => handleMenuClick(event, card.id)}
            >
              <MoreVertIcon />
            </IconButton>
          }
          title={card.name}
          subheader={format(card.startDate, "MMMM dd, yyyy")}
        />
        <CardContent>
          <Typography
            variant="h6"
            sx={{ color: "#0D0606", textAlign: "center" }}
          >
            {card.description}
          </Typography>
        </CardContent>

        <Box sx={{ display: "flex", gap: 1, justifyContent: "center", pb: 2 }}>
          <IconButton size="small" aria-label="view">
            <VisibilityIcon fontSize="small" onClick={handleOpenDrawer} />
          </IconButton>
          <IconButton size="small" aria-label="edit">
            <EditIcon fontSize="small" onClick={handleOpenDrawerEdit} />
          </IconButton>
          <IconButton
            size="small"
            aria-label="delete"
            onClick={handleClickOpen}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </Card>

      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleCreateGroupChat}>Create group chat</MenuItem>
      </Menu>

      {openDrawer && (
        <ProjectDetailsDrawer
          open={openDrawer}
          onClose={handleCloseDrawer}
          projectProp={card}
        />
      )}

      {openDrawerEdit && (
        <ProjectDetailsDrawer
          open={openDrawerEdit}
          onClose={handleCloseDrawerEdit}
          projectProp={card}
          edit={true}
        />
      )}

      {open && (
        <DeleteProjectDialog
          open={open}
          onClose={handleClose}
          projectId={card.id}
        />
      )}
    </>
  );
}
