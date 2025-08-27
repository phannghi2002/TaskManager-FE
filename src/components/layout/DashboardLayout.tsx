import * as React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import TaskIcon from "@mui/icons-material/Task";
import { Outlet, Link as RouterLink, useLocation } from "react-router-dom"; // Import useLocation hook
import logo from "../../assets/images/starack_logo.jpg"; // Change this to your logo path

const drawerWidth = 240;

const DashboardLayout: React.FC = () => {
  const location = useLocation(); // Get current path

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
                  <TaskIcon />
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
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
