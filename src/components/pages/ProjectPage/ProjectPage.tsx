import { Box, Button } from "@mui/material";
import ProjectCard from "../../card/ProjectCard";
import { useEffect, useState } from "react";
import { getAllProject } from "../../../actions/project/projectActions";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../app/store";
import { useSelector } from "react-redux";
import type { Project } from "../../interface/Project";
import AddIcon from "@mui/icons-material/Add";
import CreateMemberDialog from "../../dialog/CreateMemberDialog";
import CreateProjectDialog from "../../dialog/CreateProjectDialog";

function ProjectPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { project } = useSelector((store: any) => store);

  const [openAdd, setOpenAdd] = useState(false);
  const handleClickAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  console.log("project", project);

  useEffect(() => {
    dispatch(getAllProject());
  }, []);

  return (
    <>
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
          onClick={handleClickAdd}
        >
          <AddIcon sx={{ marginLeft: "-7px" }} />
          Add new project
        </Button>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 2,
        }}
      >
        {project?.projects?.map((project: Project) => (
          <ProjectCard key={project.id} card={project} />
        ))}
      </Box>

      <CreateProjectDialog open={openAdd} onClose={handleCloseAdd} />
    </>
  );
}

export default ProjectPage;
