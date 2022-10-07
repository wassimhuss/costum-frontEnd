import React, { useState, useEffect } from "react";
import { getOneCategory } from "../../redux/actions/subcategoryAction";
import {
  createProduct,
  createProductCombos,
  createProductVariant,
  deleteProductVariant,
} from "../../redux/actions/productsAction";
import notify from "./../../hook/useNotifaction";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategory } from "../../redux/actions/categoryAction";
import { getAllBrand } from "./../../redux/actions/brandAction";
import * as yup from "yup";
import { useFormik, Form } from "formik";
const AdminAddProductsHook = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategory());
    dispatch(getAllBrand());
  }, []);
  const schema = yup.object().shape({
    productName: yup.string().min(3).required(),
    description: yup.string().min(20).required(),
    price: yup.number().positive("Must be more than 0").required(),
    discountPrice: yup.number().positive("Must be more than 0"),
    category: yup.string().required(),
    subCategory: yup.string(),
    brand: yup.string().required(),
  });
  //get last catgeory state from redux
  const category = useSelector((state) => state.allCategory.category);
  //get last brand state from redux
  const brand = useSelector((state) => state.allBrand.brand);
  //get create meesage
  const product = useSelector((state) => state.allproducts.products);
  //get create meesage
  const productVariant = useSelector(
    (state) => state.allproducts.productVariants
  );
  //get last sub cat state from redux
  const subCat = useSelector((state) => state.subCategory.subcategory);
  const [seletedColors, setseletedColors] = useState([]);
  const [seletedsizes, setseletedsizes] = useState([]);
  // console.log(seletedColors);
  const onSelect = (selectedList) => {
    setSeletedSubID(selectedList);
  };
  const onRemove = (selectedList) => {
    setSeletedSubID(selectedList);
  };
  //for colors
  const onSelectColor = (colors) => {
    setseletedColors(colors);
  };
  const onRemoveColor = (colors) => {
    setseletedColors(colors);
  };
  //for sizes
  const onSelectSize = (sizes) => {
    setseletedsizes(sizes);
  };
  const onRemoveSize = (sizes) => {
    setseletedsizes(sizes);
  };
  const [options, setOptions] = useState([]);
  const [colorOPtions, setColorOPtionsOptions] = useState([
    { name: "red", id: 1 },
    { name: "green", id: 2 },
    { name: "blue", id: 3 },
    { name: "yellow", id: 4 },
    { name: "black", id: 5 },
    { name: "white", id: 6 },
  ]);
  const [sizeOPtions, setSizeOPtionsOptions] = useState([
    { name: "xs", id: 1 },
    { name: "s", id: 2 },
    { name: "m", id: 3 },
    { name: "L", id: 4 },
    { name: "XL", id: 5 },
    { name: "XXL", id: 6 },
  ]);
  //values images products
  const [images, setImages] = useState([]);
  //values state
  const [isDisabledAccordion, setIsDisabledAccordion] = useState(true);
  const [data, setData] = useState({});
  const [prodName, setProdName] = useState("");
  const [prodDescription, setProdDescription] = useState("");
  const [priceBefore, setPriceBefore] = useState("");
  const [priceAftr, setPriceAftr] = useState("");
  const [qty, setQty] = useState("");
  const [CatID, setCatID] = useState("");
  const [BrandID, SetBrandID] = useState("");
  const [subCatID, setSubCatID] = useState([]);
  const [seletedSubID, setSeletedSubID] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Productloading, setProductLoading] = useState(false);
  const [ProductVariantloading, setProductVariantLoading] = useState(false);
  const [VariantLoading, setVariantLoading] = useState(true);

  // console.log(data);
  //to change name state
  const onChangeProdName = (value) => {
    // event.persist();
    setProdName(value);
  };

  //to change name state
  const onChangeDesName = (value) => {
    // event.persist();
    setProdDescription(value);
  };
  //to change name state
  const onChangePriceBefor = (value) => {
    // event.persist();
    setPriceBefore(value);
  };
  //to change name state
  const onChangePriceAfter = (value) => {
    // event.persist();
    setPriceAftr(value);
  }; //to change name state
  const onChangeQty = (value) => {
    // event.persist();
    setQty(value);
  };
  const onChangeColor = (event) => {
    event.persist();
    setShowColor(!showColor);
  };
  const [combsArraysApi, setCombsArraysApi] = useState([]);
  //to show hide color picker
  const [showColor, setShowColor] = useState(false);
  //to store all pick color
  const [colors, setColors] = useState([]);
  //when choose new color
  const handelChangeComplete = (color) => {
    setColors([...colors, color.hex]);
    setShowColor(!showColor);
  };
  const removeColor = (color) => {
    const newColor = colors.filter((e) => e !== color);
    setColors(newColor);
  };

  //when selet category store id
  const onSeletCategory = async (value) => {
    setCatID(value);
  };

  //when selet brand store id
  const onSeletBrand = (value) => {
    SetBrandID(value);
  };

  //to convert base 64 to file
  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }
  const generateProductCombo = async (e) => {
    if (combsArraysApi.length <= 0) {
      notify("please insert at least", "warn");
      return;
    }
    const formData = new FormData();

    formData.append("data", JSON.stringify(combsArraysApi));

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    dispatch(createProductCombos(product.data.data.id, formData));
    // }
  };
  const generateVariants = async (e) => {
    setProductVariantLoading(true);
    setVariantLoading(true);
    let newSelectedcolors = [];
    let newSelectedsizes = [];
    seletedColors.forEach((element) => {
      newSelectedcolors.push(element.name);
    });
    seletedsizes.forEach((element) => {
      newSelectedsizes.push(element.name);
    });
    if (newSelectedcolors.length == 0 && newSelectedsizes.length == 0) {
      return (
        notify("please select at least one variant ", "error") +
        setProductVariantLoading(false) +
        setVariantLoading(false)
      );
    }
    await dispatch(
      createProductVariant(product.data.data.id, {
        colors: newSelectedcolors,
        sizes: newSelectedsizes,
      })
    ).then((res) =>
      res
        ? notify("generated", "success")
        : notify("oh no ! there is a problem ", "error")
    );
    setProductVariantLoading(false);
    setVariantLoading(false);
  };
  const deleteVariants = async (e) => {
    await dispatch(
      deleteProductVariant(productVariant._id, {
        productID: product.data.data.id,
      })
    ).then((res) =>
      res
        ? notify("variants deleted", "success") +
          setseletedColors([]) +
          setseletedsizes([]) +
          setCombsArraysApi([])
        : notify("oh no ! there is a problem ", "error")
    );
    setProductVariantLoading(false);
    setVariantLoading(false);
  };
  //to save data
  const handelSubmit = async (e) => {
    console.log("seletedSubID " + JSON.stringify(seletedSubID));
    setProductLoading(true);
    setLoading(true);
    e.preventDefault();
    if (!data.productName) {
      notify("please fill all fields", "warn");
      return;
    }

    //convert base 64 image to file
    const imgCover = dataURLtoFile(images[0], Math.random() + ".png");
    //convert array of base 64 image to file
    const itemImages = Array.from(Array(Object.keys(images).length).keys()).map(
      (item, index) => {
        return dataURLtoFile(images[index], Math.random() + ".png");
      }
    );

    const formData = new FormData();
    formData.append("title", data.productName);
    formData.append("description", data.description);
    formData.append("quantity", 1);
    formData.append("price", data.price);
    if (data.discountPrice != "") {
      formData.append("priceAfterDiscount", data.discountPrice);
    }
    formData.append("category", data.category);
    formData.append("brand", data.brand);

    formData.append("imageCover", imgCover);
    itemImages.map((item) => formData.append("images", item));
    seletedSubID.map((item) => formData.append("subcategories", item._id));
    await dispatch(createProduct(formData)).then((response) =>
      response
        ? setIsDisabledAccordion(false) +
          notify("product added succefully", "success")
        : notify("oh no ! there is a problem ", "error")
    );
    setLoading(false);
    setProductLoading(false);
  };

  useEffect(() => {
    if (loading === false) {
      // setCatID(0)
      setColors([]);
      setImages([]);
      setProdName("");
      setProdDescription("");
      setPriceBefore("");
      setPriceAftr("");
      setQty("");
      SetBrandID(0);
      setSeletedSubID([]);
      setTimeout(() => setLoading(true), 1500);
    }
  }, [loading]);
  return [
    onChangeDesName,
    onChangeQty,
    onChangeColor,
    onChangePriceAfter,
    onChangePriceBefor,
    onChangeProdName,
    showColor,
    category,
    brand,
    priceAftr,
    images,
    setImages,
    onSelect,
    onRemove,
    options,
    handelChangeComplete,
    removeColor,
    onSeletCategory,
    handelSubmit,
    onSeletBrand,
    colors,
    priceBefore,
    qty,
    prodDescription,
    prodName,
    setOptions,
    schema,
    setData,
    setIsDisabledAccordion,
    isDisabledAccordion,
    sizeOPtions,
    colorOPtions,
    onSelectColor,
    onRemoveColor,
    onSelectSize,
    onRemoveSize,
    generateVariants,
    seletedColors,
    seletedsizes,
    loading,
    setProductLoading,
    Productloading,
    setProductVariantLoading,
    ProductVariantloading,
    deleteVariants,
    combsArraysApi,
    setCombsArraysApi,
    generateProductCombo,
  ];
};

export default AdminAddProductsHook;
