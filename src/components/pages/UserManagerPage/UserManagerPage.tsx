import { Avatar, Box, IconButton, Menu, MenuItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { deepOrange } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UserManagerTable from "../../table/UserManagerTable";
import React from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../app/store";
import { logout } from "../../../actions/auth/authActions";
import { useNavigate } from "react-router-dom";

interface LogoutData {
  token: string;
  refreshToken: string;
}

const UserManagerPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const token = localStorage.getItem("jwt");
  const refreshToken = localStorage.getItem("refreshToken");
  const navigate = useNavigate();

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    console.log("hhaf", token, refreshToken);

    if (token && refreshToken) {
      console.log("hhh");

      const logoutData: LogoutData = {
        token: token,
        refreshToken: refreshToken,
      };

      await dispatch(logout(logoutData));

      navigate("/login");
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: "12px 20px",
        }}
      >
        <SearchIcon
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        />

        <Box
          sx={{ display: "flex", justifyItems: "center", alignItems: "center" }}
        >
          <Avatar
            sx={{
              bgcolor: deepOrange[500],
              fontSize: "16px",
              width: "30px",
              height: "30px",
              marginLeft: "8px",
            }}
          >
            N
          </Avatar>

          <IconButton onClick={handleClick}>
            <ExpandMoreIcon
              sx={{
                display: "flex",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            />
          </IconButton>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              list: {
                "aria-labelledby": "basic-button",
              },
            }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Box>

      <Box sx={{ margin: "40px 80px" }}>
        <Box sx={{ fontSize: "30px", fontWeight: "600", marginBottom: "16px" }}>
          User management
        </Box>

        <Box>
          <UserManagerTable />
        </Box>
      </Box>
    </Box>
  );
};

export default UserManagerPage;
