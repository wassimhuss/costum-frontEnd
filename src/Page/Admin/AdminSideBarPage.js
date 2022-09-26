import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import AdminSideBar from "../../Components/Admin/AdminSideBar";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AdminAddProductsHook from "../../hook/products/add-products-hook";
import Multiselect from "multiselect-react-dropdown";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { useLovelySwitchStyles } from "@mui-treasury/styles/switch/lovely";
import MultiImageInput from "react-multiple-image-input";
import Button from "react-bootstrap/Button";
import { getOneCategory } from "../../redux/actions/subcategoryAction";
import { ToastContainer } from "react-toastify";
import * as yup from "yup";
import { useFormik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { CompactPicker } from "react-color";
import add from "../../images/add.png";
import avatar from "../../images/avatar.png";
import {
  Avatar,
  Box,
  // Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Switch,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  CircularProgress,
  TableBody,
  IconButton,
} from "@material-ui/core";
import { useState } from "react";
const useStyles = makeStyles((theme) => ({
  buttons: {
    // alignSelf: "flex-end"
  },
  radio: {
    "&$checked": {
      color: "#4B8DF8",
    },
  },
  checked: {
    color: "#4B8DF8",
  },
}));
const AdminAllOrdersPage = () => {
  const [img, setImg] = useState(avatar);
  const [selectedFile, setSelectedFile] = useState(null);
  const [
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
    isDisabledAccordion,
    setIsDisabledAccordion,
    colorOPtions,
    sizeOPtions,
    onSelectColor,
    onRemoveColor,
    onSelectSize,
    onRemoveSize,
    generateVariants,
    seletedColors,
    seletedsizes,
  ] = AdminAddProductsHook();
  const onSubmit = async (values, actions) => {
    handleNextAccordion("mediaPanel");
    setData(values);
    setIsDisabledAccordion1(false);
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // actions.resetForm();
  };
  const dispatch = useDispatch();

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      productName: "",
      description: "",
      price: "",
      discountPrice: "",
      quantity: "",
      category: "",
      subCategory: "",
      brand: "",
    },
    validationSchema: schema,
    onSubmit,
  });
  useEffect(() => {
    if (values.category.length > 0) {
      dispatch(getOneCategory(values.category));
    }
  }, [values.category]);
  //get last sub cat state from redux
  const subCat = useSelector((state) => state.subCategory.subcategory);
  useEffect(() => {
    if (subCat.data) {
      setOptions(subCat.data);
    } else setOptions([]);
  }, [subCat]);
  useEffect(() => {
    if (!setIsDisabledAccordion) {
      handleNextAccordion("panel3");
    }
  }, [setIsDisabledAccordion]);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState("panel1");
  const [isDisabledAccordion1, setIsDisabledAccordion1] = React.useState(true);
  // const [isDisabledAccordion, setIsDisabledAccordion] = React.useState(true);
  const handleAccordionChange = (isExpanded, panel) => {
    setExpanded(isExpanded ? panel : false);
  };
  const lovelyStyles = useLovelySwitchStyles();
  const handleNextAccordion = (panel) => {
    setExpanded(panel);
  };
  //get create meesage
  const productVariant = useSelector(
    (state) => state.allproducts.productVariants
  );
  const [combsArrays, setCombsArrays] = useState([
    {
      combinationName: "dress_blue_small",
      quantity: "",
      price: "",
      priceAfterDiscount: "",
      images: "",
    },
    {
      combinationName: "dress_blue_medium",
      quantity: "",
      price: "",
      priceAfterDiscount: "",
      images: "",
    },
    {
      combinationName: "dress_yellow_small",
      quantity: "",
      price: "",
      priceAfterDiscount: "",
      images: "",
    },
    {
      combinationName: "dress_yellow_medium",
      quantity: "",
      price: "",
      priceAfterDiscount: "",
      images: "",
    },
  ]);
  const handleCombinationChange = (e, index) => {
    let newState = [...combsArrays];
    let { name } = e.target;
    let value;
    switch (name) {
      // this case to make function behaive differntly depending on type of inputfield
      case "combinationName":
        value = e.target.value;
        // makeUniqueStringIdentity(value);
        break;
      case "price":
        // now keyboard takes only integers and transform null to 0 value
        value = parseInt(e.target.value);
        if (isNaN(value)) {
          value = 1;
        }
        break;
      case "priceAfterDiscount":
        // now keyboard takes only integers and transform null to 0 value
        value = parseInt(e.target.value);
        if (isNaN(value)) {
          value = 1;
        }
        break;
      case "quantity":
        // now keyboard takes only integers and transform null to 0 value
        value = parseInt(e.target.value);
        if (isNaN(value)) {
          value = 1;
        }
        break;
      case "images":
        // now keyboard takes only integers and transform null to 0 value
        if (e.target.files && e.target.files[0]) {
          //setImg(URL.createObjectURL(e.target.files[0]));
          //setSelectedFile(e.target.files[0]);
          value = e.target.files[0];
        }
        break;

      default:
        // code block
        if (value == 1) {
          value = e.target.value;
        }
    }

    newState[index][name] = value;
    //console.log(combsArrays[index]);
    setCombsArrays(newState);
    console.log(combsArrays);
  };
  const deleteTableRow = (index) => {
    let newState = [...combsArrays];
    newState.splice(index, 1);
    setCombsArrays(newState);
  };
  return (
    <Container fluid>
      <Row className="py-3">
        <Col sm="3" xs="2" md="2">
          <AdminSideBar />
        </Col>

        <Col sm="9" xs="10" md="10">
          <Accordion
            style={{ padding: 13 }}
            expanded={expanded === "panel1"}
            onChange={(event, isExpanded) =>
              handleAccordionChange(isExpanded, "panel1")
            }
          >
            <AccordionSummary
              aria-controls="panel1-content"
              id="panel1-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography variant="h6" gutterBottom>
                Product Basics
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <form onSubmit={handleSubmit} autoComplete="off">
                <Row
                  style={{
                    width: "100%",
                  }}
                >
                  <Col sm="6">
                    <input
                      id="productName"
                      value={values.productName}
                      onChange={handleChange}
                      type="text"
                      className={
                        errors.productName && touched.productName
                          ? "input-form d-block mt-3 px-3  border-danger"
                          : "input-form d-block mt-3 px-3 "
                      }
                      placeholder="product name"
                    />
                    {errors.productName && touched.productName && (
                      <p className="text-danger">{errors.productName}</p>
                    )}
                    <textarea
                      id="description"
                      className={
                        errors.description && touched.description
                          ? "input-form d-block mt-3 px-3  border-danger"
                          : "input-form d-block mt-3 px-3 "
                      }
                      rows="4"
                      cols="50"
                      placeholder="product description"
                      value={values.description}
                      onChange={handleChange}
                    />
                    {errors.description && touched.description && (
                      <p className="text-danger">{errors.description}</p>
                    )}
                    <input
                      id="price"
                      className={
                        errors.price && touched.price
                          ? "input-form d-block mt-3 px-3  border-danger"
                          : "input-form d-block mt-3 px-3 "
                      }
                      type="number"
                      placeholder="price"
                      value={values.price}
                      onChange={handleChange}
                    />
                    {errors.price && touched.price && (
                      <p className="text-danger">{errors.price}</p>
                    )}
                    <input
                      id="discountPrice"
                      type="number"
                      className={
                        errors.discountPrice && touched.discountPrice
                          ? "input-form d-block mt-3 px-3  border-danger"
                          : "input-form d-block mt-3 px-3 "
                      }
                      placeholder="discount price"
                      value={values.discountPrice}
                      onChange={handleChange}
                    />
                    {errors.discountPrice && touched.discountPrice && (
                      <p className="text-danger">{errors.discountPrice}</p>
                    )}
                  </Col>
                  <Col sm="5">
                    <select
                      id="brand"
                      name="brand"
                      onChange={handleChange}
                      className={
                        errors.brand && touched.brand
                          ? "input-form d-block mt-3 px-3  border-danger"
                          : "input-form d-block mt-3 px-3 "
                      }
                    >
                      <option value="0">select brand</option>
                      {brand.data
                        ? brand.data.map((item, index) => {
                            return (
                              <option key={index} value={item._id}>
                                {item.name}
                              </option>
                            );
                          })
                        : null}
                    </select>
                    {errors.brand && touched.brand && (
                      <p className="text-danger">{errors.brand}</p>
                    )}
                    <select
                      id="category"
                      name="category"
                      onChange={handleChange}
                      className={
                        errors.category && touched.category
                          ? "input-form d-block mt-3 px-3  border-danger"
                          : "input-form d-block mt-3 px-3 "
                      }
                    >
                      <option value="0">select category</option>
                      {category.data
                        ? category.data.map((item, index) => {
                            return (
                              <option key={index} value={item._id}>
                                {item.name}
                              </option>
                            );
                          })
                        : null}
                    </select>
                    {errors.category && touched.category && (
                      <p className="text-danger">{errors.category}</p>
                    )}
                    <Multiselect
                      id="subCategory"
                      className="mt-2"
                      placeholder="select subcategory"
                      options={options}
                      onSelect={onSelect}
                      onRemove={onRemove}
                      displayValue="name"
                      style={{ color: "red" }}
                    />
                  </Col>

                  <Row>
                    <Col sm="10" className="d-flex justify-content-end ">
                      <Button
                        //  disabled={isSubmitting}
                        type="submit"
                        variant="outline-dark"
                      >
                        go to images
                      </Button>
                    </Col>
                  </Row>
                </Row>
              </form>
            </AccordionDetails>
          </Accordion>
          <Accordion
            disabled={isDisabledAccordion1}
            style={{ padding: 15 }}
            expanded={expanded === "mediaPanel"}
            onChange={(event, isExpanded) =>
              handleAccordionChange(isExpanded, "mediaPanel")
            }
          >
            <AccordionSummary
              aria-controls="mediaPanel-content"
              id="mediaPanel-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography variant="h6" gutterBottom>
                images
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Row className="justify-content-center" style={{ width: "100%" }}>
                <Col sm="6" className="justify-content-center">
                  <MultiImageInput
                    images={images}
                    setImages={setImages}
                    theme={"light"}
                    allowCrop={false}
                    max={4}
                  />
                </Col>
                <Row
                  className="justify-content-center"
                  style={{ width: "100%" }}
                >
                  <Col sm="7" className="d-flex justify-content-end ">
                    <button
                      disabled={images.length <= 0 ? true : false}
                      onClick={handelSubmit}
                      className={
                        images.length <= 0
                          ? "btn btn-secondary d-inline mt-2 "
                          : "btn-save d-inline mt-2 "
                      }
                    >
                      create product
                    </button>
                  </Col>
                  <Col sm="5" className="d-flex justify-content-end ">
                    <Button
                      onClick={() => handleNextAccordion("panel1")}
                      variant="outline-dark"
                    >
                      back
                    </Button>
                  </Col>
                </Row>
              </Row>
            </AccordionDetails>
          </Accordion>
          <Accordion
            //disabled={setIsDisabledAccordion}
            style={{ padding: 15 }}
            expanded={expanded === "panel3"}
            onChange={(event, isExpanded) =>
              handleAccordionChange(isExpanded, "panel3")
            }
          >
            <AccordionSummary
              aria-controls="panel3-content"
              id="panel3-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography variant="h6" gutterBottom>
                variants
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Container fluid>
                <Row
                  className="justify-content-center"
                  style={{ width: "100%" }}
                >
                  <Col sm="4" className="justify-content-center me-5">
                    <Multiselect
                      id="Sizes"
                      className="mt-2"
                      placeholder="colors"
                      options={sizeOPtions}
                      onSelect={onSelectColor}
                      onRemove={onRemoveColor}
                      displayValue="name"
                    />
                  </Col>
                  <Col
                    sm="4"
                    className="justify-content-center"
                    //style={{ backgroundColor: "red" }}
                  >
                    <Multiselect
                      id="colors"
                      className="mt-2"
                      placeholder="sizes"
                      options={colorOPtions}
                      onSelect={onSelectSize}
                      onRemove={onRemoveSize}
                      displayValue="name"
                    />
                  </Col>
                </Row>
                <Row
                  className="justify-content-center"
                  //style={{ backgroundColor: "red" }}
                >
                  <Col sm="1">
                    <button
                      disabled={
                        seletedColors.length == 0 && seletedsizes.length == 0
                          ? true
                          : false
                      }
                      onClick={generateVariants}
                      className={
                        images.length <= 0
                          ? "btn btn-secondary d-inline mt-5 "
                          : "btn-save d-inline mt-5 "
                      }
                    >
                      generate
                    </button>
                  </Col>
                </Row>
                {/* hon lsheghel */}
                <>
                  {combsArrays && (
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="right" />
                          <TableCell align="left">
                            <Box
                              display="flex"
                              justifyContent="flex-start"
                              alignItems="center"
                            >
                              <Typography>Product Combo name</Typography>
                            </Box>
                          </TableCell>
                          <TableCell align="left">Price</TableCell>
                          <TableCell align="left">discount Price</TableCell>
                          <TableCell align="left">Stock</TableCell>
                          <TableCell align="left">Image</TableCell>
                          <TableCell align="left" />
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {combsArrays?.map((combination, index) => (
                          <TableRow key={index.id}>
                            <TableCell align="right"></TableCell>
                            <TableCell component="th" scope="row">
                              <TextField
                                style={{ width: 230 }}
                                id="outlined-name"
                                margin="dense"
                                variant="outlined"
                                onChange={(e) =>
                                  handleCombinationChange(e, index)
                                }
                                value={combination.combinationName}
                                inputProps={{
                                  name: "combinationName",
                                }}
                              />
                            </TableCell>
                            <TableCell align="left">
                              <TextField
                                style={{ width: 80 }}
                                id="outlined-name"
                                margin="dense"
                                variant="outlined"
                                onChange={(e) =>
                                  handleCombinationChange(e, index)
                                }
                                value={combination.price}
                                inputProps={{
                                  name: "price",
                                }}
                              />
                            </TableCell>
                            <TableCell align="left">
                              <TextField
                                style={{ width: 80 }}
                                id="outlined-name"
                                margin="dense"
                                variant="outlined"
                                onChange={(e) =>
                                  handleCombinationChange(e, index)
                                }
                                value={combination.priceAfterDiscount}
                                inputProps={{
                                  name: "priceAfterDiscount",
                                }}
                              />
                            </TableCell>
                            <TableCell align="left">
                              <TextField
                                style={{ width: 80 }}
                                id="outlined-name"
                                margin="dense"
                                variant="outlined"
                                onChange={(e) =>
                                  handleCombinationChange(e, index)
                                }
                                //  value={combination.quantity}
                                inputProps={{
                                  name: "quantity",
                                }}
                              />
                            </TableCell>

                            <TableCell align="left">
                              <div>
                                <label for={`upload-photo-${index}`}>
                                  <img
                                    src={
                                      combination.images
                                        ? URL.createObjectURL(
                                            combination.images
                                          )
                                        : img
                                    }
                                    alt="fzx"
                                    height="100px"
                                    width="120px"
                                    style={{ cursor: "pointer" }}
                                  />
                                </label>
                                <input
                                  type="file"
                                  name="images"
                                  style={{
                                    opacity: 0,
                                    position: "absolute",
                                    zIndex: -1,
                                  }}
                                  onChange={(e) =>
                                    handleCombinationChange(e, index)
                                  }
                                  id={`upload-photo-${index}`}
                                />
                              </div>
                              {/* <div>
                                <label for="upload-photo">
                                  <img
                                    src={img}
                                    alt="fzx"
                                    height="100px"
                                    width="120px"
                                    style={{ cursor: "pointer" }}
                                  />
                                </label>
                                <input
                                  type="file"
                                  name="images"
                                  onChange={(e) => console.log(index)}
                                  id={`file_${index}`}
                                />
                              </div> */}
                            </TableCell>
                            <TableCell align="left">
                              <IconButton onClick={() => deleteTableRow(index)}>
                                <DeleteForeverIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                        {/* //////////////////////////////////////////// */}
                      </TableBody>
                    </Table>
                  )}
                  {/* <div
                    xs={12}
                    style={{
                      marginTop: 20,
                      marginBottom: 20,
                      display: "flex",
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "center",
                      //  backgroundColor: "red",
                    }}
                  >
                    <Button
                      //className={classes.buttons}
                      disabled={isLoadingSave}
                      color="primary"
                      variant="contained"
                      component="span"
                      // style={{
                      //   marginTop: "20px",
                      //   height: 40,
                      //   display: "flex",
                      //   alignSelf: "center",
                      // }}
                      onClick={() => handleProductCombinations(combsArrays)}
                    >
                      {isLoadingSave && (
                        <CircularProgress
                          size={15}
                          style={{ marginRight: "1em" }}
                        />
                      )}
                      Save products
                    </Button>
                  </div> */}
                </>
              </Container>
            </AccordionDetails>
          </Accordion>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};
export default AdminAllOrdersPage;
