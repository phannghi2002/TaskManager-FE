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
import { Box } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteProjectDialog from "../dialog/DeleteProjectDialog";

export default function ProjectCard({ card }: { card: Project }) {
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
      <ProjectDetailsDrawer
        open={openDrawer}
        onClose={handleCloseDrawer}
        project={card}
      />

      <ProjectDetailsDrawer
        open={openDrawerEdit}
        onClose={handleCloseDrawerEdit}
        project={card}
        edit={true}
      />

      <DeleteProjectDialog
        open={open}
        onClose={handleClose}
        projectId={card.id}
      />
    </>
  );
}
