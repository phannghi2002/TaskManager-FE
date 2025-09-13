import type { Dispatch } from "redux";
import api, { API_BASE_URL } from "../../configs/api";

import {
  ADD_MESSAGE_IN_ROOM_SUCCESS,
  CLEAR_MESSEAGE,
  CREATE_CHAT_FAILURE,
  CREATE_CHAT_REQUEST,
  CREATE_CHAT_SUCCESS,
  CREATE_MESSAGE_FAILURE,
  CREATE_MESSAGE_REQUEST,
  CREATE_MESSAGE_SUCCESS,
  EDIT_MESSAGE_IN_ROOM_FAILURE,
  EDIT_MESSAGE_IN_ROOM_REQUEST,
  EDIT_MESSAGE_IN_ROOM_SUCCESS,
  GET_ALL_CHAT_FAILURE,
  GET_ALL_CHAT_REQUEST,
  GET_ALL_CHAT_SUCCESS,
  GET_ALL_MESSAGE_FAILURE,
  GET_ALL_MESSAGE_REQUEST,
  GET_ALL_MESSAGE_SUCCESS,
} from "./chatActionTypes";
import type { ChatMessage } from "../../components/pages/ChatRoomPage/ChatRoomPage";

interface CreateData {
  chatRoomId?: string;
  content?: string;
  fullName?: string;
}

export const getAllChat = () => async (dispatch: Dispatch) => {
  dispatch({ type: GET_ALL_CHAT_REQUEST });
  try {
    const response = await api.get(`${API_BASE_URL}/chat/all-chat-room`);
    console.log("in rea res", response);

    dispatch({ type: GET_ALL_CHAT_SUCCESS, payload: response.data.result });

    return response.data;
  } catch (error: any) {
    dispatch({
      type: GET_ALL_CHAT_FAILURE,
      payload: error.response.data.message,
    });

    return error.response.data;
  }
};

export const clearMessage = () => (dispatch: Dispatch) => {
  dispatch({ type: CLEAR_MESSEAGE });
};

export const getAllMessage =
  (chatRoomId: string) => async (dispatch: Dispatch) => {
    dispatch({ type: GET_ALL_MESSAGE_REQUEST });
    try {
      const response = await api.get(
        `${API_BASE_URL}/chat/message/get-all-message/${chatRoomId}`
      );
      console.log("in rea res", response);

      dispatch({
        type: GET_ALL_MESSAGE_SUCCESS,
        payload: response.data.result,
      });

      return response.data;
    } catch (error: any) {
      dispatch({
        type: GET_ALL_MESSAGE_FAILURE,
        payload: error.response.data.message,
      });

      return error.response.data;
    }
  };

export const createMessage =
  (data: CreateData) => async (dispatch: Dispatch) => {
    dispatch({ type: CREATE_MESSAGE_REQUEST });
    try {
      const response = await api.post(
        `${API_BASE_URL}/chat/message/create`,
        data
      );

      dispatch({ type: CREATE_MESSAGE_SUCCESS });

      return response.data;
    } catch (error: any) {
      console.log("err", error, error.response.data.message);

      dispatch({
        type: CREATE_MESSAGE_FAILURE,
        payload: error.response.data.message,
      });

      return error.response.data;
    }
  };

export const addMessageInRoom =
  (data: ChatMessage) => async (dispatch: Dispatch) => {
    dispatch({ type: ADD_MESSAGE_IN_ROOM_SUCCESS, payload: data });
  };

export const editMessage =
  (content: string, messageId: string) => async (dispatch: Dispatch) => {
    dispatch({ type: EDIT_MESSAGE_IN_ROOM_REQUEST });
    try {
      const response = await api.put(
        `${API_BASE_URL}/chat/message/update-message/${messageId}`,
        { content }
      );

      dispatch({
        type: EDIT_MESSAGE_IN_ROOM_SUCCESS,
        payload: response.data.result,
      });

      return response.data;
    } catch (error: any) {
      console.log("err", error, error.response.data.message);

      dispatch({
        type: EDIT_MESSAGE_IN_ROOM_FAILURE,
        payload: error.response.data.message,
      });

      return error.response.data;
    }
  };

export const deleteMessage =
  (messageId: string) => async (dispatch: Dispatch) => {
    dispatch({ type: "DELETE_MESSAGE_IN_ROOM_REQUEST" });
    try {
      await api.delete(`${API_BASE_URL}/chat/message/${messageId}`);
    } catch (error: any) {
      dispatch({
        type: "DELETE_MESSAGE_IN_ROOM_FAILURE",
        payload: error.response.data.message,
      });
    }
  };

export const createChat = (data: any) => async (dispatch: Dispatch) => {
  dispatch({ type: CREATE_CHAT_REQUEST });
  try {
    const response = await api.post(`${API_BASE_URL}/chat/create`, data);

    dispatch({ type: CREATE_CHAT_SUCCESS });

    return response.data;
  } catch (error: any) {
    console.log("err", error, error.response.data.message);

    dispatch({
      type: CREATE_CHAT_FAILURE,
      payload: error.response.data.message,
    });

    return error.response.data;
  }
};
