import {
  DISPLAY_IMAGE_START,
  DISPLAY_IMAGE_SUCCESS,
  DISPLAY_IMAGE_FAIL,
} from "../constants/albumConstant.js";
export const albumReducer = (state = { images: [] }, action) => {
  switch (action.type) {
    case DISPLAY_IMAGE_START:
      return {
        loading: true,
        images: [],
      };

    case DISPLAY_IMAGE_SUCCESS:
      return {
        loading: false,
        images: action.payload,
        imagesCount: action.payload.imagesCount,
        resPerPage: action.payload.resPerPage,
      };

    case DISPLAY_IMAGE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
