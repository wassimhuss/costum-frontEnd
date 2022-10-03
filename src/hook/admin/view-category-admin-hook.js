import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategory,
  getAllCategoriesPage,
} from "../../redux/actions/categoryAction";

const ViewCategoryAdminHook = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategory(12));
  }, []);

  const onPress = async (page) => {
    await dispatch(getAllCategoriesPage(page, 12));
  };
  let items = [];
  let pagination = [];
  const categories = useSelector((state) => state.allCategory.category);
  console.log(categories);
  try {
    if (categories.data) items = categories.data;
    else items = [];

    if (categories.paginationResult)
      pagination = categories.paginationResult.numberOfPages;
    else pagination = [];
  } catch (e) {}
  return [items, pagination, onPress];
};

export default ViewCategoryAdminHook;
