import axios from "axios";
import {
  FILE_UPLOAD_REQUEST,
  FILE_UPLOAD_SUCCESS,
  FILE_UPLOAD_FAIL,
} from "../constants/file.constants";

export const uploadFile = (file) => async (dispatch, getState) => {
  try {
    dispatch({ type: FILE_UPLOAD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const formData = new FormData();
    formData.append("image", file);
    console.log(formData);

    const { data } = await axios.post("/api/upload", formData, config);

    dispatch({ type: FILE_UPLOAD_SUCCESS, payload: data });
    localStorage.setItem("productImage", data);
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: FILE_UPLOAD_FAIL,
      payload: message,
    });
  }
};
