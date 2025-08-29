import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Box,
  ListItemButton,
} from "@mui/material";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { addMember, getAllProject } from "../../actions/project/projectActions";

// Định nghĩa kiểu dữ liệu cho một User
export interface User {
  userId: string;
  fullName: string;
  email: string;
  role: string;
}

interface AddMemberDialogProps {
  open: boolean;
  handleClose: () => void;
  users: User[];
  projectId: string;
  handleAddMembers: (members: User[]) => void;
}

const AddMemberDialog: React.FC<AddMemberDialogProps> = ({
  open,
  handleClose,
  users,
  projectId,
  handleAddMembers,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

  const filteredUsers = users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggle = (userId: string) => {
    const currentIndex = selectedUserIds.indexOf(userId);
    const newSelectedUserIds = [...selectedUserIds];

    if (currentIndex === -1) {
      newSelectedUserIds.push(userId);
    } else {
      newSelectedUserIds.splice(currentIndex, 1);
    }

    setSelectedUserIds(newSelectedUserIds);
  };

  const handleAdd = async () => {
    const selectedMembers = users.filter((user) =>
      selectedUserIds.includes(user.userId)
    );
    handleAddMembers(selectedMembers);

    console.log("in ra users", selectedUserIds);

    setSelectedUserIds([]);
    setSearchTerm("");

    await dispatch(addMember({ projectId, userIds: selectedUserIds }));
    await dispatch(getAllProject());
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add member</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Search by name or email"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>
        <List sx={{ maxHeight: 300, overflow: "auto" }}>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <ListItemButton
                key={user.userId}
                onClick={() => handleToggle(user.userId)}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={selectedUserIds.indexOf(user.userId) !== -1}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText primary={user.fullName} secondary={user.email} />
              </ListItemButton>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="No user found" />
            </ListItem>
          )}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={handleAdd}
          variant="contained"
          disabled={selectedUserIds.length === 0}
          sx={{
            bgcolor: "#0F8EEF",
            color: "#000",
            fontWeight: "600",
            "&:hover": { bgcolor: "#0C80D8" },
          }}
        >
          Add ({selectedUserIds.length})
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMemberDialog;
