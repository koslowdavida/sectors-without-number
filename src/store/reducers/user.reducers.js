import {
  OPEN_LOGIN_MODAL,
  CLOSE_LOGIN_MODAL,
  OPEN_EDIT_MODAL,
  CLOSE_EDIT_MODAL,
  UPDATE_USER_FORM,
  UPDATE_USER,
  LOGGED_IN,
  LOGGED_OUT,
  SET_AUTH_USER,
  USER_FETCH_COMPLETE,
  AUTH_FAILURE,
  TOGGLE_USER_DROPDOWN,
} from 'store/actions/user.actions';

const initialState = {
  isFetchingState: true,
  isDropdownActive: false,
  isLoginModalOpen: false,
  isEditModalOpen: false,
  error: null,
  model: null,
  form: {
    email: '',
    password: '',
    confirm: '',
    displayName: '',
  },
};

export default function sector(state = initialState, action) {
  switch (action.type) {
    case OPEN_LOGIN_MODAL:
      return { ...state, isLoginModalOpen: true };
    case CLOSE_LOGIN_MODAL:
      return { ...state, isLoginModalOpen: false, error: null };
    case OPEN_EDIT_MODAL:
      return { ...state, isEditModalOpen: true, isDropdownActive: false };
    case CLOSE_EDIT_MODAL:
      return { ...state, isEditModalOpen: false, error: null };
    case UPDATE_USER_FORM:
      return {
        ...state,
        error: null,
        form: {
          ...state.form,
          [action.key]: action.value,
        },
      };
    case UPDATE_USER:
      return {
        ...state,
        isEditModalOpen: false,
        model: {
          ...state.model,
          ...action.user,
        },
      };
    case LOGGED_IN:
      return {
        ...state,
        model: action.user,
        isLoginModalOpen: false,
      };
    case LOGGED_OUT:
      return {
        ...state,
        model: null,
        isLoginModalOpen: false,
        isDropdownActive: false,
      };
    case SET_AUTH_USER:
      return {
        ...state,
        model: action.user,
        isLoginModalOpen: false,
        isFetchingState: false,
        form: {
          ...state.form,
          displayName: action.user.displayName,
        },
      };
    case USER_FETCH_COMPLETE:
      return { ...state, isFetchingState: false };
    case TOGGLE_USER_DROPDOWN:
      return { ...state, isDropdownActive: !state.isDropdownActive };
    case AUTH_FAILURE:
      return {
        ...state,
        error: action.error || 'There has been an error. Please try again.',
      };
    default:
      return state;
  }
}
