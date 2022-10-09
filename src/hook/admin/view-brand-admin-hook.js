import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrandsPage, getAllBrand } from "../../redux/actions/brandAction";

const Viewbrandadminhook = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBrand(12));
  }, []);

  const onPress = async (page) => {
    await dispatch(getAllBrandsPage(page, 12));
  };
  let items = [];
  let pagination = [];
  const brands = useSelector((state) => state.allBrand.brand);
  console.log(brands);
  try {
    if (brands.data) items = brands.data;
    else items = [];

    if (brands.paginationResult)
      pagination = brands.paginationResult.numberOfPages;
    else pagination = [];
  } catch (e) {}
  return [items, pagination, onPress];
};

export default Viewbrandadminhook;
