import { Typography, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../app/store";
import { useEffect } from "react";
import { getMyProfile } from "../../../actions/user/userActions";

const OverviewPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getMyProfile());
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>
      <Typography paragraph>
        This is the dashboard page. Welcome back!
      </Typography>
    </Box>
  );
};

export default OverviewPage;
