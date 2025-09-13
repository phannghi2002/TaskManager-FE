import {
  CLEAR_MESSEAGE,
  GET_ALL_PROJECT_FAILURE,
  GET_ALL_PROJECT_REQUEST,
  GET_ALL_PROJECT_SUCCESS,
  GET_NOT_MEMBER_IN_PROJECT_SUCCESS,
  GET_TASK_REQUEST,
  GET_TASK_SUCCESS,
} from "../../actions/project/projectActionTypes";

interface ProjectState {
  loading: boolean;
  projects: [];
  error: string | null;
  projectMyTasks: [];
  memberNotProject: [];
}

const initialState: ProjectState = {
  loading: false,
  projects: [],
  error: null,
  projectMyTasks: [],
  memberNotProject: [],
};

const projectReducer = (state = initialState, action: any): ProjectState => {
  switch (action.type) {
    case GET_ALL_PROJECT_REQUEST:
    case GET_TASK_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_ALL_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: action.payload,
        error: null,
      };

    case GET_NOT_MEMBER_IN_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        memberNotProject: action.payload,
        error: null,
      };
    case GET_TASK_SUCCESS:
      return { ...state, loading: false, projectMyTasks: action.payload };

    case GET_ALL_PROJECT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case CLEAR_MESSEAGE:
      return { ...state, loading: false, error: null };
    default:
      return state;
  }
};

export default projectReducer;
