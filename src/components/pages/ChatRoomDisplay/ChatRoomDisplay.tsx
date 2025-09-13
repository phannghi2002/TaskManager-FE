import type { ChatMessage, ChatRoom } from "../ChatRoomPage/ChatRoomPage";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";

import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../app/store";
import {
  createMessage,
  deleteMessage,
  editMessage,
} from "../../../actions/chat/chatActions";
import { useSelector } from "react-redux";
import { getMyProfile } from "../../../actions/user/userActions";
import { removeName } from "../../../utils/removeName";

// export interface ChatMessageV2 {
//   senderId: string;
//   content: string;
//   timestamp: string;
// }

interface ChatRoomDisplayProps {
  chat: ChatRoom | null;
  messages: ChatMessage[];
}

export default function ChatRoomDisplay({
  chat,
  messages,
}: ChatRoomDisplayProps) {
  const { user } = useSelector((store: any) => store);
  console.log("user", messages);

  useEffect(() => {
    if (!user.user || user.user.length === 0) {
      dispatch(getMyProfile());
    }
  }, []);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const [inputMessage, setInputMessage] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const currentUserId: string = user.user?.userId;

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      console.log("mesage", inputMessage);

      await dispatch(
        createMessage({
          chatRoomId: chat?.id,
          content: inputMessage,
          fullName: user.user?.fullName,
        })
      );
      setInputMessage("");
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === "Enter") {
      if (isEditing) {
        handleUpdateMessage();
      } else {
        handleSendMessage();
      }
    }
  };

  const conversationName = chat?.name || chat?.projectId || chat?.id;

  type TimestampStringOrDate = string | Date | null | undefined;

  const formatTimestamp = (timestamp: TimestampStringOrDate): string => {
    if (!timestamp) {
      return "";
    }

    let date: Date;

    if (timestamp instanceof Date) {
      date = timestamp;
    } else {
      date = new Date(timestamp);
    }

    if (isNaN(date.getTime())) {
      console.error("Invalid timestamp:", timestamp);
      return "";
    }

    const datePart = date.toLocaleDateString();
    const timePart = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${datePart} ${timePart}`;
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedMessage, setSelectedMessage] = useState<ChatMessage | null>(
    null
  );
  const open = Boolean(anchorEl);

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    msg: ChatMessage
  ) => {
    console.log("la nhi", msg);

    setAnchorEl(event.currentTarget);
    setSelectedMessage(msg);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleRecallMessage = async () => {
    if (selectedMessage) {
      console.log("Thu hồi tin nhắn với ID:", selectedMessage.id);
      await dispatch(deleteMessage(selectedMessage.id));
    }
    handleMenuClose();
  };

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleEditMessage = () => {
    if (selectedMessage) {
      console.log("Chỉnh sửa tin nhắn với ID:", selectedMessage.id);
      setInputMessage(selectedMessage.content);
      setIsEditing(true);
    }
    handleMenuClose();
  };

  const handleUpdateMessage = async () => {
    if (isEditing && selectedMessage && inputMessage.trim()) {
      await dispatch(editMessage(inputMessage, selectedMessage.id));
      setInputMessage("");
      setIsEditing(false);
      setSelectedMessage(null);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box
        sx={{ p: 2, borderBottom: "1px solid #e0e0e0", textAlign: "center" }}
      >
        <Typography variant="h6" fontWeight="bold">
          {chat?.projectId
            ? conversationName
            : removeName(chat?.name || "", user.user.fullName)}
        </Typography>
      </Box>

      <Box sx={{ flexGrow: 1, p: 2, overflowY: "auto" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {messages.map((msg, index) => {
            const isMyMessage = msg.senderId === currentUserId;
            return (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: isMyMessage ? "flex-end" : "flex-start",
                }}
              >
                <Paper
                  sx={{
                    p: 1.5,
                    bgcolor: isMyMessage ? "#e3f2fd" : "#f5f5f5",
                    borderRadius: "20px",
                    maxWidth: "70%",
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {msg.fullName || msg.senderId}
                  </Typography>
                  <Typography variant="body1">{msg.content}</Typography>
                  <Typography
                    variant="caption"
                    sx={{ display: "block", textAlign: "right", mt: 0.5 }}
                  >
                    {formatTimestamp(msg.createAt)}
                  </Typography>

                  {msg.edit && (
                    <Typography
                      variant="caption"
                      sx={{
                        display: "block",
                        textAlign: "right",
                        mt: 0.5,
                        color: "#5F91D2",
                      }}
                    >
                      The message has been edited.
                    </Typography>
                  )}
                </Paper>

                {isMyMessage && (
                  <IconButton
                    aria-label="settings"
                    onClick={(event) => handleMenuClick(event, msg)}
                    sx={{
                      order: isMyMessage ? 2 : 1,
                      height: "40px",
                      marginTop: "auto",
                      marginBottom: "auto",
                    }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                )}
              </Box>
            );
          })}

          <Box ref={messagesEndRef} />
        </Box>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
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
        <MenuItem onClick={handleEditMessage}>Edit</MenuItem>
        <MenuItem onClick={handleRecallMessage}>Remove</MenuItem>
      </Menu>

      <Box sx={{ p: 2, borderTop: "1px solid #e0e0e0" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          {isEditing ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateMessage}
              disabled={!inputMessage.trim()}
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              startIcon={<SendIcon />}
            >
              Send
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}
