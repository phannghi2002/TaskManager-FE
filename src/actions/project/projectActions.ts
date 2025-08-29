import type { Dispatch } from "redux";

import api, { API_BASE_URL } from "../../configs/api";
import {
  ADD_MEMBER_IN_PROJECT_FAILURE,
  ADD_MEMBER_IN_PROJECT_REQUEST,
  ADD_MEMBER_IN_PROJECT_SUCCESS,
  ADD_TASK_FAILURE,
  ADD_TASK_REQUEST,
  ADD_TASK_SUCCESS,
  CLEAR_MESSEAGE,
  CREATE_PROJECT_FAILURE,
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAILURE,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  GET_ALL_PROJECT_FAILURE,
  GET_ALL_PROJECT_REQUEST,
  GET_ALL_PROJECT_SUCCESS,
  REMOVE_MEMBER_IN_PROJECT_FAILURE,
  REMOVE_MEMBER_IN_PROJECT_REQUEST,
  REMOVE_MEMBER_IN_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAILURE,
  UPDATE_PROJECT_REQUEST,
  UPDATE_PROJECT_SUCCESS,
} from "./projectActionTypes";
import type { Dayjs } from "dayjs";

interface CreateData {
  name: string;
  description: string;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}

interface UpdateProject {
  projectId: string;
  body: {
    name?: string;
    description?: string;
    startDate?: Dayjs | null;
    endDate?: Dayjs | null;
    status?: string;
  };
}

interface RemoveMember {
  projectId: string;
  userId: string;
}

interface AddMembers {
  projectId: string;
  userIds: string[];
}

interface AddTask {
  projectId: string;
  body: {
    title: string;
    description: string;
    assigneeId: string;
    startDate: Dayjs | null;
    endDate: Dayjs | null;
  };
}

export const getAllProject = () => async (dispatch: Dispatch) => {
  dispatch({ type: GET_ALL_PROJECT_REQUEST });
  try {
    const response = await api.get(`${API_BASE_URL}/project/get-all-project`);
    console.log("in rea res", response);

    dispatch({ type: GET_ALL_PROJECT_SUCCESS, payload: response.data.result });

    return response.data;
  } catch (error: any) {
    dispatch({
      type: GET_ALL_PROJECT_FAILURE,
      payload: error.response.data.message,
    });

    return error.response.data;
  }
};

export const clearMessage = () => (dispatch: Dispatch) => {
  dispatch({ type: CLEAR_MESSEAGE });
};

export const deleteProject =
  (projectId: string) => async (dispatch: Dispatch) => {
    dispatch({ type: DELETE_PROJECT_REQUEST });
    try {
      const response = await api.delete(
        `${API_BASE_URL}/project/delete/${projectId}`
      );

      console.log("delete ne", response);

      dispatch({ type: DELETE_PROJECT_SUCCESS });

      return response.data;
    } catch (error: any) {
      console.log("err", error, error.response.data.message);

      dispatch({
        type: DELETE_PROJECT_FAILURE,
        payload: error.response.data.message,
      });

      return error.response.data;
    }
  };

export const createProject =
  (data: CreateData) => async (dispatch: Dispatch) => {
    dispatch({ type: CREATE_PROJECT_REQUEST });
    try {
      const response = await api.post(`${API_BASE_URL}/project/create`, data);

      dispatch({ type: CREATE_PROJECT_SUCCESS });

      return response.data;
    } catch (error: any) {
      console.log("err", error, error.response.data.message);

      dispatch({
        type: CREATE_PROJECT_FAILURE,
        payload: error.response.data.message,
      });

      return error.response.data;
    }
  };

export const updateProject =
  (data: UpdateProject) => async (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_PROJECT_REQUEST });
    try {
      const response = await api.put(
        `${API_BASE_URL}/project/update/${data.projectId}`,
        data.body
      );

      console.log("heheh", response);

      dispatch({ type: UPDATE_PROJECT_SUCCESS });

      return response.data;
    } catch (error: any) {
      console.log("err", error, error.response.data.message);

      dispatch({
        type: UPDATE_PROJECT_FAILURE,
        payload: error.response.data.message,
      });

      return error.response.data;
    }
  };

export const removeMember =
  (data: RemoveMember) => async (dispatch: Dispatch) => {
    dispatch({ type: REMOVE_MEMBER_IN_PROJECT_REQUEST });
    try {
      const response = await api.delete(
        `${API_BASE_URL}/project/${data.projectId}/members/${data.userId}`
      );

      console.log("heheh", response);

      dispatch({ type: REMOVE_MEMBER_IN_PROJECT_SUCCESS });

      return response.data;
    } catch (error: any) {
      console.log("err", error, error.response.data.message);

      dispatch({
        type: REMOVE_MEMBER_IN_PROJECT_FAILURE,
        payload: error.response.data.message,
      });

      return error.response.data;
    }
  };

export const addMember = (data: AddMembers) => async (dispatch: Dispatch) => {
  dispatch({ type: ADD_MEMBER_IN_PROJECT_REQUEST });
  try {
    const response = await api.post(
      `${API_BASE_URL}/project/${data.projectId}/members`,
      data.userIds
    );

    console.log("heheh", response);

    dispatch({ type: ADD_MEMBER_IN_PROJECT_SUCCESS });

    return response.data;
  } catch (error: any) {
    console.log("err", error, error.response.data.message);

    dispatch({
      type: ADD_MEMBER_IN_PROJECT_FAILURE,
      payload: error.response.data.message,
    });

    return error.response.data;
  }
};

export const addTask = (data: AddTask) => async (dispatch: Dispatch) => {
  dispatch({ type: ADD_TASK_REQUEST });
  try {
    const response = await api.post(
      `${API_BASE_URL}/project/${data.projectId}/tasks`,
      data.body
    );

    console.log("heheh", response);

    dispatch({ type: ADD_TASK_SUCCESS });

    return response.data;
  } catch (error: any) {
    console.log("err", error, error.response.data.message);

    dispatch({
      type: ADD_TASK_FAILURE,
      payload: error.response.data.message,
    });

    return error.response.data;
  }
};
