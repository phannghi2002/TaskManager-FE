import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  CLEAR_MESSEAGE,
  REGISTER_REQUEST,
  REGISTER_FAILURE,
  CHANGE_PASSWORD_FAILURE,
} from "../../actions/auth/authActionTypes";

interface AuthState {
  loading: boolean;
  token: string | null;
  error: string | null;
}

const initialState: AuthState = {
  loading: false,
  token: null,
  error: null,
};

const authReducer = (state = initialState, action: any): AuthState => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
      return { ...state, loading: true, error: null };

    case LOGIN_SUCCESS:
      return { ...state, loading: false, token: action.payload, error: null };
    // case REGISTER_SUCCESS:
    //   return {...state, loading: false, error: null}

    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case CHANGE_PASSWORD_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case CLEAR_MESSEAGE:
      return { ...state, loading: false, error: null };
    default:
      return state;
  }
};

export default authReducer;
