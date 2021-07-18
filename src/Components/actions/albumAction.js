import axios from "axios";
import {
  DISPLAY_IMAGE_START,
  DISPLAY_IMAGE_SUCCESS,
  DISPLAY_IMAGE_FAIL,
} from "../constants/albumConstant.js";

export const getAllAlbumImages = (id) => async (dispatch) => {
  try {
    dispatch({ type: DISPLAY_IMAGE_START });
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/albums/${id}/photos`
    );
    console.log(data);
    dispatch({
      type: DISPLAY_IMAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DISPLAY_IMAGE_FAIL,
      payload: "Some thing went wrong,please enter another Id",
    });
  }
};
