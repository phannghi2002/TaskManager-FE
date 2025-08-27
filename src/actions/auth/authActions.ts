import type { Dispatch } from "redux";
import {
  CLEAR_MESSEAGE,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./authActionTypes";
import axios from "axios";
import { API_BASE_URL } from "../../configs/api";
import type { Dayjs } from "dayjs";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  fullName: string;
  dob: Dayjs | null;
  city: string;
}

export const login = (data: LoginData) => async (dispatch: Dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, data);
    const jwt = response.data.result.token;

    dispatch({ type: LOGIN_SUCCESS, payload: jwt });
    localStorage.setItem("jwt", jwt);
    return response.data;
  } catch (error: any) {
    dispatch({ type: LOGIN_FAILURE, payload: error.response.data.message });

    return error.response.data;
  }
};

export const clearMessage = () => (dispatch: Dispatch) => {
  dispatch({ type: CLEAR_MESSEAGE });
};

export const register = (data: RegisterData) => async (dispatch: Dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/users/registration`,
      data
    );

    dispatch({ type: REGISTER_SUCCESS });

    return response.data;
  } catch (error: any) {
    dispatch({ type: LOGIN_FAILURE, payload: error.response.data.message });

    return error.response.data;
  }
};
