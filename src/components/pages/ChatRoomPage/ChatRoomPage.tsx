import { useEffect, useRef, useState } from "react";
import { Client, type IMessage } from "@stomp/stompjs";

import SockJS from "sockjs-client";
import { useDispatch } from "react-redux";
import { getAllChat, getAllMessage } from "../../../actions/chat/chatActions";
import { useSelector } from "react-redux";
import type { AppDispatch } from "../../../app/store";
import ChatRoomDisplay from "../ChatRoomDisplay/ChatRoomDisplay";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreateChatDiaglog from "../../dialog/CreateChatDiaglog";
import { removeName } from "../../../utils/removeName";
import { getMyProfile } from "../../../actions/user/userActions";

export interface ChatMessage {
  id: string;
  senderId: string;
  content: string;
  createAt: string;
  updateAt?: string;
  fullName?: string;
  edit?: boolean;
}

export interface ChatRoom {
  id: string;
  name?: string;
  projectId?: string;
  userIds: string;
  createBy: string;
  type: string;
  lastMessage?: string;
  lastMessageTimestamp?: Date;
}

export default function ChatRoomPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { chat, user } = useSelector((store: any) => store);

  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const selectedChatIdRef = useRef<string | null>(selectedChatId);

  useEffect(() => {
    selectedChatIdRef.current = selectedChatId;
  }, [selectedChatId]);

  const [selectedChat, setSelectedChat] = useState<ChatRoom | null>(null);

  useEffect(() => {
    dispatch(getAllChat());
  }, []);

  useEffect(() => {
    if (!user.user || user.user.length === 0) {
      dispatch(getMyProfile());
    }
  }, []);

  useEffect(() => {
    if (chat.chats.length > 0 && !selectedChatId) {
      setSelectedChatId(chat.chats[0].id);
    }

    if (chat.chats.length > 0 && !selectedChat) {
      setSelectedChat(chat.chats[0]);
    }
  }, [selectedChatId, selectedChat, chat.chats]);

  useEffect(() => {
    if (selectedChatId) {
      dispatch(getAllMessage(selectedChatId));
    }
  }, [selectedChatId, dispatch]);

  const stompClient = new Client({
    webSocketFactory: () => new SockJS("http://localhost:8084/chat/ws"),
    reconnectDelay: 5000,
  });

  useEffect(() => {
    if (!stompClient.active) {
      stompClient.activate();
    }

    stompClient.onConnect = () => {
      console.log("WebSocket connected!");

      if (chat.chats.length > 0) {
        chat.chats.forEach((room: ChatRoom) => {
          console.log(`Subscribing to room: ${room.id}`);
          stompClient.subscribe(
            `/topic/chat/${room.id}`,
            (message: IMessage) => {
              try {
                const incomingEvent = JSON.parse(message.body);

                console.log("Received event:", incomingEvent);

                const currentSelectedChatId = selectedChatIdRef.current;

                if (incomingEvent.type === "DELETE") {
                  console.log("1", currentSelectedChatId, room.id);
                  if (
                    currentSelectedChatId &&
                    room.id === currentSelectedChatId
                  ) {
                    console.log("2", currentSelectedChatId, room.id);
                    dispatch({
                      type: "DELETE_MESSAGE_IN_ROOM_SUCCESS",
                      payload: { messageId: incomingEvent.messageId },
                    });
                  }
                } else {
                  const chatMessage: ChatMessage = incomingEvent;

                  console.log("3", selectedChatId, room.id);

                  if (
                    currentSelectedChatId &&
                    room.id === currentSelectedChatId
                  ) {
                    console.log("4", currentSelectedChatId, room.id);
                    dispatch({
                      type: "INCOMING_MESSAGE_FROM_WEBSOCKET",
                      payload: chatMessage,
                    });
                  } else {
                    console.log("5", room.id === currentSelectedChatId);
                  }
                }

                dispatch(getAllChat());
                console.log("Current chat state:", chat);
              } catch (e) {
                console.error(
                  "Failed to parse message:",
                  e,
                  "Raw body:",
                  message.body
                );
              }
            }
          );
        });
      }
    };

    stompClient.onDisconnect = () => {
      console.log("Disconnected from WebSocket");
    };

    return () => {
      if (stompClient.active) {
        stompClient.deactivate();
      }
    };
  }, [chat.chats]);

  const handleChatSelect = (chatId: string, chatRoom: ChatRoom) => {
    setSelectedChatId(chatId);
    setSelectedChat(chatRoom);
  };
  const getConversationName = (room: ChatRoom) => {
    return room.name || room.projectId || room.id;
  };

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

  const [openAdd, setOpenAdd] = useState(false);

  const handleClickAdd = async () => {
    setOpenAdd(true);
  };

  const handleClose = () => {
    setOpenAdd(false);
  };

  return (
    <Box>
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
          // mb: 2,
          ml: 3,
        }}
        onClick={handleClickAdd}
      >
        <AddIcon sx={{ marginLeft: "-7px" }} />
        Create Chat
      </Button>

      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            width: "300px",
            borderRight: "1px solid #ccc",
            overflowY: "auto",
          }}
        >
          <List>
            {chat.chats.length > 0 ? (
              chat.chats.map((room: ChatRoom) => (
                <ListItem
                  key={room.id}
                  disablePadding
                  sx={{
                    bgcolor:
                      selectedChatId === room.id ? "#f0f0f0" : "transparent",
                  }}
                >
                  <ListItemButton
                    onClick={() => handleChatSelect(room.id, room)}
                  >
                    <ListItemText
                      primary={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {/* {getConversationName(room)} */}

                            {room?.projectId
                              ? getConversationName(room)
                              : removeName(
                                  room?.name || "",
                                  user.user.fullName
                                )}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mt: 0.5,
                          }}
                        >
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              maxWidth: "75%",
                            }}
                          >
                            {room.lastMessage || "No messages yet"}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {formatTimestamp(room.lastMessageTimestamp)}{" "}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              ))
            ) : (
              <Box sx={{ p: 2 }}>"You don't have any conversations."</Box>
            )}
          </List>
        </Box>

        <Box sx={{ flexGrow: 1, p: 2, overflowY: "auto" }}>
          {selectedChatId && chat.messages ? (
            <ChatRoomDisplay chat={selectedChat} messages={chat.messages} />
          ) : (
            <Box sx={{ p: 2 }}>Select a conversation to start chatting.</Box>
          )}
        </Box>
      </Box>

      {openAdd && (
        <CreateChatDiaglog open={openAdd} handleClose={handleClose} />
      )}
    </Box>
  );
}
