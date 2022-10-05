import {
  CREATE_SUB_CATEGORY,
  GET_SUB_CATEGORY,
  GET_ERROR,
  DELETE_BRAND,
} from "../type";
import { useGetData } from "../../hooks/useGetData";
import { useInsertData } from "../../hooks/useInsertData";
import useDeleteData from "../../hooks/useDeleteData";

//gcreate sub category with pagination
export const createSubCategory = (data) => async (dispatch) => {
  try {
    const response = await useInsertData("/api/v1/subcategories", data);
    dispatch({
      type: CREATE_SUB_CATEGORY,
      payload: response.data.data,
      loading: true,
    });
    return response;
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
//delete subcategory with id
export const deleteSubCategory = (id) => async (dispatch) => {
  try {
    const response = await useDeleteData(`/api/v1/subcategories/${id}`);

    dispatch({
      type: DELETE_BRAND,
      payload: response,
      loading: true,
    });
    return response;
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};
