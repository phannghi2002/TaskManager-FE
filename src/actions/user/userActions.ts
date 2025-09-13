import type { Dispatch } from "redux";
import {
  CLEAR_MESSEAGE,
  CREATE_USER_FAILURE,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  GET_ALL_USER_FAILURE,
  GET_ALL_USER_REQUEST,
  GET_ALL_USER_SUCCESS,
  GET_PROFILE_MY_SELF_FAILURE,
  GET_PROFILE_MY_SELF_REQUEST,
  GET_PROFILE_MY_SELF_SUCCESS,
  SEARCH_USER_FAILURE,
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
} from "./userActionTypes";

import api, { API_BASE_URL } from "../../configs/api";
import type { Dayjs } from "dayjs";

interface CreateData {
  email: string;
  password: string;
  fullName: string;
  dob: Dayjs | null;
  city: string;
  role: string[];
}

interface UpdateUser {
  userId: string;
  body: {
    email?: string;
    fullName?: string;
    dob?: Dayjs | null;
    city?: string;
    role?: string;
  };
}

export const getAllUser = () => async (dispatch: Dispatch) => {
  dispatch({ type: GET_ALL_USER_REQUEST });
  try {
    const response = await api.get(`${API_BASE_URL}/user/get-all-profile`);
    console.log("in rea res", response);

    dispatch({ type: GET_ALL_USER_SUCCESS, payload: response.data.result });

    return response.data;
  } catch (error: any) {
    dispatch({
      type: GET_ALL_USER_FAILURE,
      payload: error.response.data.message,
    });

    return error.response.data;
  }
};

export const clearMessage = () => (dispatch: Dispatch) => {
  dispatch({ type: CLEAR_MESSEAGE });
};

export const createUser = (data: CreateData) => async (dispatch: Dispatch) => {
  dispatch({ type: CREATE_USER_REQUEST });
  try {
    const response = await api.post(
      `${API_BASE_URL}/auth/users/registration`,
      data
    );

    dispatch({ type: CREATE_USER_SUCCESS });

    return response.data;
  } catch (error: any) {
    console.log("err", error, error.response.data.message);

    dispatch({
      type: CREATE_USER_FAILURE,
      payload: error.response.data.message,
    });

    return error.response.data;
  }
};

export const updateUser = (data: UpdateUser) => async (dispatch: Dispatch) => {
  dispatch({ type: UPDATE_USER_REQUEST });
  try {
    const response = await api.patch(
      `${API_BASE_URL}/user/update/${data.userId}`,
      data.body
    );

    console.log("heheh", response);

    dispatch({ type: UPDATE_USER_SUCCESS });

    return response.data;
  } catch (error: any) {
    console.log("err", error, error.response.data.message);

    dispatch({
      type: UPDATE_USER_FAILURE,
      payload: error.response.data.message,
    });

    return error.response.data;
  }
};

export const deleteUser = (userId: string) => async (dispatch: Dispatch) => {
  dispatch({ type: DELETE_USER_REQUEST });
  try {
    const response = await api.delete(`${API_BASE_URL}/user/delete/${userId}`);

    console.log("delete ne", response);

    dispatch({ type: DELETE_USER_SUCCESS });

    return response.data;
  } catch (error: any) {
    console.log("err", error, error.response.data.message);

    dispatch({
      type: DELETE_USER_FAILURE,
      payload: error.response.data.message,
    });

    return error.response.data;
  }
};

export const searchUser = (keyword: string) => async (dispatch: Dispatch) => {
  dispatch({ type: SEARCH_USER_REQUEST });
  try {
    const response = await api.get(
      `${API_BASE_URL}/user/searchUser?keyword=${keyword}`
    );

    console.log("tim ne", response);

    dispatch({ type: SEARCH_USER_SUCCESS, payload: response.data.result });

    return response.data;
  } catch (error: any) {
    console.log("err", error, error.response.data.message);

    dispatch({
      type: SEARCH_USER_FAILURE,
      payload: error.response.data.message,
    });

    return error.response.data;
  }
};

export const getMyProfile = () => async (dispatch: Dispatch) => {
  dispatch({ type: GET_PROFILE_MY_SELF_REQUEST });
  try {
    const response = await api.get(`${API_BASE_URL}/user/get-profile-my-self`);
    console.log("in rea res", response);

    dispatch({
      type: GET_PROFILE_MY_SELF_SUCCESS,
      payload: response.data.result,
    });

    return response.data;
  } catch (error: any) {
    dispatch({
      type: GET_PROFILE_MY_SELF_FAILURE,
      payload: error.response.data.message,
    });

    return error.response.data;
  }
};
