import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Multiselect from "multiselect-react-dropdown";
import avatar from "../../images/avatar.png";
import add from "../../images/add.png";
import MultiImageInput from "react-multiple-image-input";

import { CompactPicker } from "react-color";
import { ToastContainer } from "react-toastify";
import AdminAddProductsHook from "./../../hook/products/add-products-hook";

const AdminAddProducts = () => {
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
    <div>
      <Row className="justify-content-start ">
        <div className="admin-content-text pb-4"> add new product </div>
        <Col sm="6">
          <div className="pb-2">product images</div>

          <MultiImageInput
            images={images}
            setImages={setImages}
            theme={"light"}
            allowCrop={false}
            max={4}
          />

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
            placeholder="dicount price"
            value={priceAftr}
            onChange={onChangePriceAfter}
          />
          <input
            type="number"
            className="input-form d-block mt-3 px-3"
            placeholder="quantity"
            value={qty}
            onChange={onChangeQty}
          />
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
          <div className="text-form mt-3 ">select colors for product</div>
          <div className="mt-1 d-flex">
            {colors.length >= 1
              ? colors.map((color, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => removeColor(color)}
                      className="color ms-2 border  mt-1"
                      style={{ backgroundColor: color }}
                    ></div>
                  );
                })
              : null}

            <img
              onClick={onChangeColor}
              src={add}
              alt=""
              width="30px"
              height="35px"
              style={{ cursor: "pointer" }}
            />
            {showColor === true ? (
              <CompactPicker onChangeComplete={handelChangeComplete} />
            ) : null}
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm="6" className="d-flex justify-content-end ">
          <button onClick={handelSubmit} className="btn-save d-inline mt-2 ">
            create product
          </button>
        </Col>
      </Row>
      <ToastContainer />
    </div>
  );
};

export default AdminAddProducts;
