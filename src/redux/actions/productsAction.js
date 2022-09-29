import {
  useInsertDataWithImage,
  useInsertData,
} from "../../hooks/useInsertData";
import {
  DELETE_PRODUCTS,
  GET_ALL_PRODUCTS_CATEGORY,
  GET_ALL_PRODUCTS_BRAND,
  UPDATE_PRODUCTS,
  CREATE_PRODUCTS,
  GET_PRODUCT_LIKE,
  GET_ALL_PRODUCTS,
  GET_PRODUCT_DETALIS,
  GET_ERROR,
  CREATE_PRODUCTS_VARIANT,
  DELETE_PRODUCTS_VARIANT,
  CREATE_PRODUCTS_COMBOS,
} from "../type";
import { useGetData } from "./../../hooks/useGetData";
import useDeleteData from "./../../hooks/useDeleteData";
import { useInUpdateDataWithImage } from "../../hooks/useUpdateData";

//create product combo
export const createProductCombos =
  (productID, formatData) => async (dispatch) => {
    // console.log(
    //   "product :" + JSON.stringify(productID) + "  " + JSON.stringify(data)
    // );
    try {
      const res = await useInsertDataWithImage(
        `/api/v1/productCombo/${productID}`,
        formatData
      );
      dispatch({
        type: CREATE_PRODUCTS_COMBOS,
        payload: res,
        loading: true,
      });
      return res.data.data;
    } catch (e) {
      dispatch({
        type: GET_ERROR,
        payload: "Error  " + e,
      });
    }
  };
//create product variant
export const createProductVariant = (productID, data) => async (dispatch) => {
  // console.log(
  //   "product :" + JSON.stringify(productID) + "  " + JSON.stringify(data)
  // );
  try {
    const res = await useInsertData(
      `/api/v1/selectedVariants/${productID}`,
      data
    );
    dispatch({
      type: CREATE_PRODUCTS_VARIANT,
      payload: res,
      loading: true,
    });
    return res.data.data;
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error  " + e,
    });
  }
};
//delete product variant
export const deleteProductVariant =
  (variantID, productID) => async (dispatch) => {
    console.log(
      "product :" + JSON.stringify(productID) + "  " + JSON.stringify(variantID)
    );
    try {
      const res = await useInsertData(
        `/api/v1/selectedVariants/delete/${variantID}`,
        productID
      );
      dispatch({
        type: DELETE_PRODUCTS_VARIANT,
        payload: res,
        loading: true,
      });
      return res;
    } catch (e) {
      dispatch({
        type: GET_ERROR,
        payload: "Error  " + e,
      });
    }
  };
//create products with pagination
export const createProduct = (formatData) => async (dispatch) => {
  try {
    const response = await useInsertDataWithImage(
      "/api/v1/products",
      formatData
    );
    dispatch({
      type: CREATE_PRODUCTS,
      payload: response,
      loading: true,
    });
    return response.data.data;
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error  " + e,
    });
  }
};

//get all products with pagination
export const getAllProducts = (limit) => async (dispatch) => {
  try {
    const response = await useGetData(`/api/v1/products?limit=${limit}`);
    dispatch({
      type: GET_ALL_PRODUCTS,
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

//get all products by category
export const getAllProductsByCategory =
  (page, limit, categoryID) => async (dispatch) => {
    try {
      const response = await useGetData(
        `/api/v1/products?limit=${limit}&category=${categoryID}&page=${page}`
      );
      dispatch({
        type: GET_ALL_PRODUCTS_CATEGORY,
        payload: response,
        loading: true,
      });
    } catch (e) {
      dispatch({
        type: GET_ALL_PRODUCTS_CATEGORY,
        payload: e.response,
      });
    }
  };

//get all products by brand
export const getAllProductsByBrand =
  (page, limit, brandID) => async (dispatch) => {
    try {
      const response = await useGetData(
        `/api/v1/products?limit=${limit}&brand=${brandID}&page=${page}`
      );
      dispatch({
        type: GET_ALL_PRODUCTS_BRAND,
        payload: response,
        loading: true,
      });
    } catch (e) {
      dispatch({
        type: GET_ALL_PRODUCTS_BRAND,
        payload: e.response,
      });
    }
  };

//get all products with pagination with pages number
export const getAllProductsPage = (page, limit) => async (dispatch) => {
  try {
    const response = await useGetData(
      `/api/v1/products?page=${page}&limit=${limit}`
    );
    dispatch({
      type: GET_ALL_PRODUCTS,
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

//get all products with query string
export const getAllProductsSearch = (queryString) => async (dispatch) => {
  try {
    const response = await useGetData(`/api/v1/products?${queryString}`);
    dispatch({
      type: GET_ALL_PRODUCTS,
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

//get one product with id
export const getOneProduct = (id) => async (dispatch) => {
  try {
    const response = await useGetData(`/api/v1/products/${id}`);
    dispatch({
      type: GET_PRODUCT_DETALIS,
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

//get one product with id
export const getProductLike = (id) => async (dispatch) => {
  try {
    const response = await useGetData(`/api/v1/products?category=${id}`);
    dispatch({
      type: GET_PRODUCT_LIKE,
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

//delete prooduct with id
export const deleteProducts = (id) => async (dispatch) => {
  try {
    const response = await useDeleteData(`/api/v1/products/${id}`);

    dispatch({
      type: DELETE_PRODUCTS,
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

//update prooduct with id
export const updateProducts = (id, data) => async (dispatch) => {
  try {
    const response = await useInUpdateDataWithImage(
      `/api/v1/products/${id}`,
      data
    );
    dispatch({
      type: UPDATE_PRODUCTS,
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
