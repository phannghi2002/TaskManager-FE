import {
  ADD_MESSAGE_IN_ROOM_REQUEST,
  ADD_MESSAGE_IN_ROOM_SUCCESS,
  DELETE_MESSAGE_IN_ROOM_SUCCESS,
  EDIT_MESSAGE_IN_ROOM_SUCCESS,
  GET_ALL_CHAT_FAILURE,
  GET_ALL_CHAT_REQUEST,
  GET_ALL_CHAT_SUCCESS,
  GET_ALL_MESSAGE_SUCCESS,
} from "../../actions/chat/chatActionTypes";
import {
  ADD_MEMBER_IN_PROJECT_SUCCESS,
  CLEAR_MESSEAGE,
} from "../../actions/project/projectActionTypes";
import type { ChatMessage } from "../../components/pages/ChatRoomPage/ChatRoomPage";

interface ChatState {
  loading: boolean;
  chats: [];
  error: string | null;
  messages: ChatMessage[];
}

const initialState: ChatState = {
  loading: false,
  chats: [],
  error: null,
  messages: [],
};

const chatReducer = (state = initialState, action: any): ChatState => {
  switch (action.type) {
    case GET_ALL_CHAT_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_ALL_CHAT_SUCCESS:
      return { ...state, loading: false, error: null, chats: action.payload };
    case GET_ALL_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        messages: action.payload,
      };
    // case ADD_MESSAGE_IN_ROOM_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: null,
    //     messages: [...state.messages, action.payload],
    //   };

    // case EDIT_MESSAGE_IN_ROOM_SUCCESS:
    //   const updatedMessage = action.payload;
    //   return {
    //     ...state,
    //     loading: false,
    //     error: null,

    //     messages: state.messages.map((msg) =>
    //       msg.id === updatedMessage.id ? updatedMessage : msg
    //     ),
    //   };

    case "INCOMING_MESSAGE_FROM_WEBSOCKET":
      const incomingMessage = action.payload;
      const messageExists = state.messages.some(
        (msg) => msg.id === incomingMessage.id
      );

      if (messageExists) {
        return {
          ...state,
          messages: state.messages.map((msg) =>
            msg.id === incomingMessage.id ? incomingMessage : msg
          ),
        };
      } else {
        return {
          ...state,
          messages: [...state.messages, incomingMessage],
        };
      }

    case DELETE_MESSAGE_IN_ROOM_SUCCESS:
      const messageIdToDelete = action.payload.messageId;
      return {
        ...state,

        messages: state.messages.filter((msg) => msg.id !== messageIdToDelete),
      };

    case GET_ALL_CHAT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case CLEAR_MESSEAGE:
      return { ...state, loading: false, error: null };
    default:
      return state;
  }
};

export default chatReducer;
