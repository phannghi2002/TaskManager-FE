import {
  Avatar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import TaskIcon from "@mui/icons-material/Task";
import AssistantIcon from "@mui/icons-material/Assistant";
import {
  Outlet,
  Link as RouterLink,
  useLocation,
  useNavigate,
} from "react-router-dom"; // Import useLocation hook
import logo from "../../assets/images/starack_logo.jpg"; // Change this to your logo path

import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";
import { deepOrange } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { logout } from "../../actions/auth/authActions";
import React, { useState } from "react";
import ChangePasswordDialog from "../dialog/ChangePasswordDialog";

interface LogoutData {
  token: string;
  refreshToken: string;
}

const drawerWidth = 240;

const DashboardLayout: React.FC = () => {
  const role: string | null = localStorage.getItem("role");
  const location = useLocation(); // Get current path

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

  const [openChangePassword, setOpenChangePassword] = useState(false);

  const closeChangePassword = () => {
    setOpenChangePassword(false);
  };
  const handleChangePassword = () => {
    setOpenChangePassword(true);
    handleClose();
  };
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#121621", // Sidebar background color
            color: "#fff", // Sidebar text color
          },
        }}
      >
        <Box
          sx={{
            height: "auto",
            display: "flex",
            alignItems: "center",
            marginTop: "20px",
            marginLeft: "15px",
            marginBottom: "15px",
          }}
        >
          <img
            src={logo}
            alt="Description of image"
            style={{
              width: "20%",
              height: "auto",
              borderRadius: "8px",
              border: "1px solid white",
            }}
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "10px",
            }}
          >
            <Box
              sx={{ fontSize: "20px", fontWeight: "600", marginLeft: "10px" }}
            >
              STARACK
            </Box>

            <Box
              sx={{
                fontSize: "12px",
                fontWeight: "400",
                marginLeft: "10px",
                color: "#C6B3B3",
              }}
            >
              Version V1.2
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            height: "100%", // Fill container height
            color: "#C6B3B3",
          }}
        >
          <List sx={{ margin: "0 12px" }}>
            <ListItem disablePadding>
              <ListItemButton
                component={RouterLink}
                to="/overview"
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "#0F8EEF",
                    borderRadius: "12px",
                    color: "#fff",
                    height: "36px",
                    "&:hover": { backgroundColor: "#0C80D8" },

                    // Icon color inherited here
                    "& .MuiListItemIcon-root": {
                      color: "inherit",
                    },
                  },
                }}
                selected={location.pathname === "/overview"}
              >
                <ListItemIcon
                  sx={{
                    color: "#C6B3B3",
                    marginRight: "-24px",
                    marginLeft: "-4px",
                  }}
                >
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: "14px",
                    },
                  }}
                  primary="Overview"
                />
              </ListItemButton>
            </ListItem>

            {role === "MANAGER" && (
              <ListItem disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to="/users"
                  sx={{
                    "&.Mui-selected": {
                      backgroundColor: "#0F8EEF",
                      borderRadius: "12px",
                      color: "#fff",
                      height: "36px",
                      "&:hover": { backgroundColor: "#0C80D8" },

                      // Icon color inherited here
                      "& .MuiListItemIcon-root": {
                        color: "inherit",
                      },
                    },
                  }}
                  selected={location.pathname === "/users"}
                >
                  <ListItemIcon
                    sx={{
                      color: "#C6B3B3",
                      marginRight: "-24px",
                      marginLeft: "-4px",
                    }}
                  >
                    <GroupAddIcon />
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: "14px",
                      },
                    }}
                    primary="User management"
                  />
                </ListItemButton>
              </ListItem>
            )}

            {role !== "EMPLOYEE" && (
              <ListItem disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to="/project"
                  sx={{
                    "&.Mui-selected": {
                      backgroundColor: "#0F8EEF",
                      borderRadius: "12px",
                      color: "#fff",
                      height: "36px",
                      "&:hover": { backgroundColor: "#0C80D8" },

                      // Icon color inherited here
                      "& .MuiListItemIcon-root": {
                        color: "inherit",
                      },
                    },
                  }}
                  selected={location.pathname === "/project"}
                >
                  <ListItemIcon
                    sx={{
                      color: "#C6B3B3",
                      marginRight: "-24px",
                      marginLeft: "-4px",
                    }}
                  >
                    <AssistantIcon />
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: "14px",
                      },
                    }}
                    primary="Project"
                  />
                </ListItemButton>
              </ListItem>
            )}

            <ListItem disablePadding>
              <ListItemButton
                component={RouterLink}
                to="/task"
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "#0F8EEF",
                    borderRadius: "12px",
                    color: "#fff",
                    height: "36px",
                    "&:hover": { backgroundColor: "#0C80D8" },

                    // Icon color inherited here
                    "& .MuiListItemIcon-root": {
                      color: "inherit",
                    },
                  },
                }}
                selected={location.pathname === "/task"}
              >
                <ListItemIcon
                  sx={{
                    color: "#C6B3B3",
                    marginRight: "-24px",
                    marginLeft: "-4px",
                  }}
                >
                  <TaskIcon />
                </ListItemIcon>
                <ListItemText
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: "14px",
                    },
                  }}
                  primary="Task"
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                component={RouterLink}
                to="/chat"
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "#0F8EEF",
                    borderRadius: "12px",
                    color: "#fff",
                    height: "36px",
                    "&:hover": { backgroundColor: "#0C80D8" },

                    // Icon color inherited here
                    "& .MuiListItemIcon-root": {
                      color: "inherit",
                    },
                  },
                }}
                selected={location.pathname === "/chat"}
              >
                <ListItemIcon
                  sx={{
                    color: "#C6B3B3",
                    marginRight: "-24px",
                    marginLeft: "-4px",
                  }}
                >
                  <ChatIcon />
                </ListItemIcon>
                <ListItemText
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: "14px",
                    },
                  }}
                  primary="Chat"
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: "#DAE7F2",
          boxSizing: "border-box",
          overflow: "auto",
        }}
      >
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
            sx={{
              display: "flex",
              justifyItems: "center",
              alignItems: "center",
            }}
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
              <MenuItem onClick={handleChangePassword}>
                Change Password
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        {openChangePassword && (
          <ChangePasswordDialog
            open={openChangePassword}
            onClose={closeChangePassword}
          />
        )}
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
