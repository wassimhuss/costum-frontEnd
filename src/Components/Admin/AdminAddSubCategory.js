import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";

import { ToastContainer } from "react-toastify";
import addSubcategoryhook from "./../../hook/subcategory/add-subcategory-hook";

const AdminAddSubCategory = () => {
  const [
    id,
    name,
    loading,
    category,
    subcategory,
    handelChange,
    handelSubmit,
    onChangeName,
  ] = addSubcategoryhook();

  return (
    <div>
      <Row className="justify-content-center">
        <div className="admin-content-text-2 pb-4">add new subcategory</div>
        <Col sm="12">
          <input
            value={name}
            onChange={onChangeName}
            type="text"
            className="input-form d-block mt-3 px-3"
            placeholder="subcategory name"
          />
          <select
            name="category"
            id="cat"
            className="select mt-3 px-2 "
            onChange={handelChange}
          >
            <option value="0">select category</option>
            {category.data
              ? category.data.map((item) => {
                  return (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  );
                })
              : null}
          </select>
        </Col>
      </Row>
      <Row>
        <Col
          sm="12"
          className="d-flex justify-content-end "
          style={{ marginTop: "5%" }}
        >
          <button onClick={handelSubmit} className="btn-save d-inline mt-2 ">
            create
          </button>
        </Col>
      </Row>
      <ToastContainer />
    </div>
  );
};

export default AdminAddSubCategory;
