import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSubCategoriesPage,
  getOneCategory,
} from "../../redux/actions/subcategoryAction";

const ViewSubCategoryAdminHook = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOneCategory(id, 12));
  }, []);

  const onPress = async (page) => {
    await dispatch(getAllSubCategoriesPage(id, page, 12));
  };
  let items = [];
  let pagination = [];
  const subCategory = useSelector((state) => state.subCategory.subcategory);
  console.log(subCategory);
  try {
    if (subCategory.data) items = subCategory.data;
    else items = [];
    if (subCategory.paginationResult)
      pagination = subCategory.paginationResult.numberOfPages;
    else pagination = [];
  } catch (e) {}
  return [items, pagination, onPress];
};

export default ViewSubCategoryAdminHook;
