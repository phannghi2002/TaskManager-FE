// UserDetailsDrawer.tsx

import { Drawer, Box, Typography, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UserTab from "../tab/UserTab";

interface UserDetailsDrawerProps {
  open: boolean;
  onClose: () => void;
  user: any; // Use a more specific type if possible
  edit?: boolean;
}

export default function UserDetailsDrawer({
  open,
  onClose,
  user,
  edit = false,
}: UserDetailsDrawerProps) {
  if (!user) {
    return null;
  }

  console.log("in in ủe", user);

  return (
    <Drawer
      anchor="right" // Sửa thành 'right' để phù hợp với giao diện của bạn
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: "calc((100% - 240px) / 2)",
        },
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "600" }}>
            {user.fullName}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <UserTab user={user} edit={edit} onClose={onClose} />
      </Box>
    </Drawer>
  );
}
