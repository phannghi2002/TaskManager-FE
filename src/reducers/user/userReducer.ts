import {
  CLEAR_MESSEAGE,
  CREATE_USER_FAILURE,
  CREATE_USER_REQUEST,
  GET_ALL_USER_FAILURE,
  GET_ALL_USER_REQUEST,
  GET_ALL_USER_SUCCESS,
  GET_PROFILE_MY_SELF_SUCCESS,
  SEARCH_USER_SUCCESS,
} from "../../actions/user/userActionTypes";

interface AuthState {
  loading: boolean;
  users: [];
  error: string | null;
  user: [];
  searchUser: [];
}

const initialState: AuthState = {
  loading: false,
  users: [],
  error: null,
  user: [],
  searchUser: [],
};

const userReducer = (state = initialState, action: any): AuthState => {
  switch (action.type) {
    case GET_ALL_USER_REQUEST:
    case CREATE_USER_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_ALL_USER_SUCCESS:
    case SEARCH_USER_SUCCESS:
      return { ...state, loading: false, users: action.payload, error: null };

    case GET_PROFILE_MY_SELF_SUCCESS:
      return { ...state, loading: false, user: action.payload };

    case GET_ALL_USER_FAILURE:
    case CREATE_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case CLEAR_MESSEAGE:
      return { ...state, loading: false, error: null };
    default:
      return state;
  }
};

export default userReducer;
