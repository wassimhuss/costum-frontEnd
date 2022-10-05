import {
  GET_ALL_BRAND,
  GET_ONE_BRAND,
  GET_ERROR,
  CREATE_BRAND,
  GET_ALL_BRANDS,
  DELETE_BRAND,
} from "../type";
import { useGetData } from "../../hooks/useGetData";
import { useInsertDataWithImage } from "../../hooks/useInsertData";
import useDeleteData from "../../hooks/useDeleteData";

//get all Brand
export const getAllBrand = (limit) => async (dispatch) => {
  try {
    const response = await useGetData(`/api/v1/brands?limit=${limit}`);

    dispatch({
      type: GET_ALL_BRAND,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};

//get one Brand
export const getOneBrand = (id) => async (dispatch) => {
  try {
    const response = await useGetData(`/api/v1/brands/${id}`);

    dispatch({
      type: GET_ONE_BRAND,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};

//get all Brand with pagination
export const getAllBrandPage = (page) => async (dispatch) => {
  try {
    const response = await useGetData(`/api/v1/brands?limit=4&page=${page}`);
    dispatch({
      type: GET_ALL_BRAND,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};

//get all brands with pagination with pages number
export const getAllBrandsPage = (page, limit) => async (dispatch) => {
  try {
    const response = await useGetData(
      `/api/v1/brands?page=${page}&limit=${limit}`
    );
    dispatch({
      type: GET_ALL_BRAND,
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
//insert brand with pagination
export const createBrand = (formData) => async (dispatch) => {
  try {
    const response = await useInsertDataWithImage(`/api/v1/brands`, formData);
    dispatch({
      type: CREATE_BRAND,
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

//delete brand with id
export const deleteBrand = (id) => async (dispatch) => {
  try {
    const response = await useDeleteData(`/api/v1/brands/${id}`);

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
