import { CREATE_SUB_CATEGORY, GET_SUB_CATEGORY, GET_ERROR } from "../type";
import { useGetData } from "../../hooks/useGetData";
import { useInsertData } from "../../hooks/useInsertData";

//gcreate sub category with pagination
export const createSubCategory = (data) => async (dispatch) => {
  try {
    const response = await useInsertData("/api/v1/subcategories", data);
    dispatch({
      type: CREATE_SUB_CATEGORY,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};

//get sub category depend in cat id
export const getOneCategory = (id, limit) => async (dispatch) => {
  try {
    const response = await useGetData(
      `/api/v1/categories/${id}/subcategories?limit=${limit}`
    );

    dispatch({
      type: GET_SUB_CATEGORY,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};
//get all brands with pagination with pages number
export const getAllSubCategoriesPage =
  (id, page, limit) => async (dispatch) => {
    try {
      const response = await useGetData(
        `/api/v1/categories/${id}/subcategories?limit=${limit}&page=${page}`
      );
      dispatch({
        type: GET_SUB_CATEGORY,
        payload: response,
        loading: true,
      });
    } catch (e) {
      dispatch({
        type: GET_ERROR,
        payload: "Error " + e,
      });
    }
  };
