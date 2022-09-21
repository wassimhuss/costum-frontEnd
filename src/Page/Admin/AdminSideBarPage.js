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
import MultiImageInput from "react-multiple-image-input";
import Button from "react-bootstrap/Button";
import { getOneCategory } from "../../redux/actions/subcategoryAction";
import * as yup from "yup";
import { useFormik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
const AdminAllOrdersPage = () => {
  const onSubmit = async (values, actions) => {
    handleNextAccordion("mediaPanel");
    console.log(values);
    // console.log(actions);
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // actions.resetForm();
  };
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    productName: yup.string().min(3).required(),
    description: yup.string().min(20).required(),
    price: yup.number().required(),
    discountPrice: yup.number(),
    category: yup.string().required(),
    subCategory: yup.string(),
    brand: yup.string().required(),
  });
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
      console.log("shtghal");
      dispatch(getOneCategory(values.category));
    }
  }, [values.category]);
  //get last sub cat state from redux
  const subCat = useSelector((state) => state.subCategory.subcategory);
  console.log(subCat);
  useEffect(() => {
    if (subCat.data) {
      setOptions(subCat.data);
    } else setOptions([]);
  }, [subCat]);
  const [expanded, setExpanded] = React.useState("panel1");
  const [isDisabledAccordion, setIsDisabledAccordion] = React.useState(true);
  const handleAccordionChange = (isExpanded, panel) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleNextAccordion = (panel) => {
    setExpanded(panel);
  };
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
  ] = AdminAddProductsHook();
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
                  <Col sm="5">
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
                      onSelect={handleChange}
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
                      onClick={handelSubmit}
                      className="btn-save d-inline mt-2 "
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
            disabled={isDisabledAccordion}
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
              <Typography>Disabled Accordion</Typography>
            </AccordionSummary>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};
export default AdminAllOrdersPage;
