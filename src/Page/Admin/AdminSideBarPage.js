import React from "react";
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
const AdminAllOrdersPage = () => {
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
              <Row
                //className="justify-content-center"
                style={{
                  width: "100%",
                }}
              >
                <Col sm="5">
                  <input
                    value={prodName}
                    onChange={onChangeProdName}
                    type="text"
                    className="input-form d-block mt-3 px-3"
                    placeholder="product name"
                  />
                  <textarea
                    className="input-form-area p-2 mt-3"
                    rows="4"
                    cols="50"
                    placeholder="product description"
                    value={prodDescription}
                    onChange={onChangeDesName}
                  />
                  <input
                    type="number"
                    className="input-form d-block mt-3 px-3"
                    placeholder="price"
                    value={priceBefore}
                    onChange={onChangePriceBefor}
                  />
                  <input
                    type="number"
                    className="input-form d-block mt-3 px-3"
                    placeholder="discount price"
                    value={priceAftr}
                    onChange={onChangePriceAfter}
                  />
                </Col>
                <Col sm="5">
                  <select
                    name="brand"
                    onChange={onSeletBrand}
                    className="select input-form-area mt-3 px-2 "
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
                  <select
                    name="cat"
                    onChange={onSeletCategory}
                    className="select input-form-area mt-3 px-2 "
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

                  <Multiselect
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
                      onClick={() => handleNextAccordion("mediaPanel")}
                      variant="outline-dark"
                    >
                      go to images
                    </Button>
                  </Col>
                </Row>
              </Row>
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
                      onClick={() => handleNextAccordion("mediaPanel")}
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
