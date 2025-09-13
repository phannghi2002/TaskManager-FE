import React, { useEffect, useState } from "react";
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

import { useSelector } from "react-redux";
import { getAllUser } from "../../actions/user/userActions";
import { createChat, getAllChat } from "../../actions/chat/chatActions";
import { toast } from "react-toastify";

export interface User {
  userId: string;
  fullName: string;
  email: string;
  role: string;
}

interface SelectedUser {
  userId: string;
  fullName: string;
}

interface CreateChatDiaglogProps {
  open: boolean;
  handleClose: () => void;
  // users: User[];
  // projectId: string;
  // handleAddMembers: (members: User[]) => void;
}

const CreateChatDiaglog: React.FC<CreateChatDiaglogProps> = ({
  open,
  handleClose,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [searchTerm, setSearchTerm] = useState<string>("");

  const { user } = useSelector((store: any) => store);

  const [searchUsers, setSearchUsers] = useState<User[]>([]);

  useEffect(() => {
    if (!user.users || user.users.length === 0) {
      dispatch(getAllUser());
    }
  }, [dispatch, user.users]);

  useEffect(() => {
    if (user.users.length > 0) {
      const currentUserId = user.user.userId;

      const filteredUsers = user.users.filter(
        (u: User) => u.userId !== currentUserId
      );

      setSearchUsers(filteredUsers);
    }
  }, [user.users]);

  const filteredUsers = searchUsers.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const handleToggle = (userId: string) => {
  //   const currentIndex = selectedUserIds.indexOf(userId);
  //   const newSelectedUserIds = [...selectedUserIds];

  //   if (currentIndex === -1) {
  //     newSelectedUserIds.push(userId);
  //   } else {
  //     newSelectedUserIds.splice(currentIndex, 1);
  //   }

  //   setSelectedUserIds(newSelectedUserIds);
  // };

  // const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  // const [selectedFullName, setSelectedFullName] = useState<String[]>([]);

  const [selectedUsers, setSelectedUsers] = useState<SelectedUser[]>([]);

  const handleToggle = (user: User) => {
    const existingUserIndex = selectedUsers.findIndex(
      (selected) => selected.userId === user.userId
    );

    if (existingUserIndex === -1) {
      // Thêm người dùng mới với chỉ userId và fullName
      setSelectedUsers([
        ...selectedUsers,
        { userId: user.userId, fullName: user.fullName },
      ]);
    } else {
      // Xóa người dùng đã tồn tại
      const newSelectedUsers = [...selectedUsers];
      newSelectedUsers.splice(existingUserIndex, 1);
      setSelectedUsers(newSelectedUsers);
    }
  };

  const handleAdd = async () => {
    console.log("in ra users", selectedUsers);

    const userIds = selectedUsers.map((user) => user.userId);
    const name =
      selectedUsers.map((user) => user.fullName).join(", ") +
      ", " +
      user.user.fullName;

    console.log("in ne", userIds, name);

    const result = await dispatch(createChat({ userIds, name }));
    if (result.code === 1000) {
      toast.success("Create chat successfully");
      await dispatch(getAllChat());

      setSelectedUsers([]);
      setSearchTerm("");
      handleClose();
    } else {
      toast.error(result.message);
    }
  };

  return (
    // <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
    //   <DialogTitle>Create Chat</DialogTitle>
    //   <DialogContent>
    //     <Box sx={{ mb: 2 }}>
    //       <TextField
    //         fullWidth
    //         label="Search by name or email"
    //         variant="outlined"
    //         value={searchTerm}
    //         onChange={(e) => setSearchTerm(e.target.value)}
    //       />
    //     </Box>
    //     <List sx={{ maxHeight: 300, overflow: "auto" }}>
    //       {filteredUsers.length > 0 ? (
    //         filteredUsers.map((user) => (
    //           <ListItemButton
    //             key={user.userId}
    //             // onClick={() => handleToggle(user.userId)}
    //             onClick={() => handleToggle(user)}
    //           >
    //             <ListItemIcon>
    //               <Checkbox
    //                 edge="start"
    //                 checked={selectedUserIds.indexOf(user.userId) !== -1}
    //                 tabIndex={-1}
    //                 disableRipple
    //               />
    //             </ListItemIcon>
    //             <ListItemText primary={user.fullName} secondary={user.email} />
    //           </ListItemButton>
    //         ))
    //       ) : (
    //         <ListItem>
    //           <ListItemText primary="No user found" />
    //         </ListItem>
    //       )}
    //     </List>
    //   </DialogContent>
    //   <DialogActions>
    //     <Button onClick={handleClose}>Cancel</Button>
    //     <Button
    //       onClick={handleAdd}
    //       variant="contained"
    //       disabled={selectedUserIds.length === 0}
    //       sx={{
    //         bgcolor: "#0F8EEF",
    //         color: "#000",
    //         fontWeight: "600",
    //         "&:hover": { bgcolor: "#0C80D8" },
    //       }}
    //     >
    //       Create chat with ({selectedUserIds.length}) people
    //     </Button>
    //   </DialogActions>
    // </Dialog>

    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create Chat</DialogTitle>
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
                onClick={() => handleToggle(user)} // Truyền cả đối tượng user
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    // Kiểm tra xem user có tồn tại trong selectedUsers không
                    checked={selectedUsers.some(
                      (selected) => selected.userId === user.userId
                    )}
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
          disabled={selectedUsers.length === 0}
          sx={{
            bgcolor: "#0F8EEF",
            color: "#000",
            fontWeight: "600",
            "&:hover": { bgcolor: "#0C80D8" },
          }}
        >
          Create chat with ({selectedUsers.length}) people
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateChatDiaglog;
