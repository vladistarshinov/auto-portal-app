import {
  FILE_UPLOAD_REQUEST,
  FILE_UPLOAD_SUCCESS,
  FILE_UPLOAD_FAIL,
} from "../constants/file.constants";

export const fileReducer = (state = { image: [] }, action) => {
  switch (action.type) {
    case FILE_UPLOAD_REQUEST:
      return { loading: true };
    case FILE_UPLOAD_SUCCESS:
      return { loading: false, image: action.payload };
    case FILE_UPLOAD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
