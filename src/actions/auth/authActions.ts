import type { Dispatch } from "redux";
import {
  CLEAR_MESSEAGE,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./authActionTypes";
import axios from "axios";
import api, { API_BASE_URL } from "../../configs/api";
import type { Dayjs } from "dayjs";

interface LoginData {
  email: string;
  password: string;
}

interface LogoutData {
  token: string;
  refreshToken: string;
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
    const refreshtoken = response.data.result.refreshToken;

    dispatch({ type: LOGIN_SUCCESS, payload: jwt });
    localStorage.setItem("jwt", jwt);
    localStorage.setItem("refreshToken", refreshtoken);
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

export const logout = (data: LogoutData) => async (dispatch: Dispatch) => {
  dispatch({ type: LOGOUT_REQUEST });
  try {
    await api.post(`${API_BASE_URL}/auth/logoutt`, data);

    dispatch({ type: LOGOUT_SUCCESS });
    localStorage.clear();
  } catch (error: any) {
    dispatch({ type: LOGIN_FAILURE, payload: error.response.data.message });
  }
};
