import React, { useEffect, useState } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import avatar from "../../../images/avatar.png";
import AddBrandHook from "../../../hook/brand/add-brand-hook";
import { useDispatch, useSelector } from "react-redux";
import notify from "../../../hook/useNotifaction";
import { editBrand } from "../../../redux/actions/brandAction";
import { editCategory } from "../../../redux/actions/categoryAction";
import { editSubCategory } from "../../../redux/actions/subcategoryAction";
const AdminEditSubCategoryModal = ({ item }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(item.name);
  const [loading, setLoading] = useState(true);
  const [isPress, setIsPress] = useState(false);
  const onChangeName = (event) => {
    setName(event.target.value);
  };
  const handelSubmit = async (event) => {
    if (name === "") {
      notify("please fill all fields", "warn");
      return;
    }
    setLoading(true);
    setIsPress(true);
    await dispatch(
      editSubCategory(item._id, {
        name,
      })
    ).then((res) =>
      res
        ? notify("subCategory edited successfully", "success") +
          setTimeout(() => {
            window.location.reload();
          }, 1000)
        : notify("please try again later ", "error")
    );
    setLoading(false);
  };
  return (
    <div>
      <Row className="justify-content-center">
        <div className="admin-content-text-2 pb-4">edit category</div>
        <Col sm="12">
          <input
            type="text"
            value={name}
            className="input-form d-block mt-3 px-3"
            placeholder="brand name"
            onChange={onChangeName}
          />
        </Col>
      </Row>
      <Row>
        <Col sm="12" className="d-flex justify-content-end ">
          <button onClick={handelSubmit} className="btn-save d-inline mt-2 ">
            create
          </button>
        </Col>
      </Row>

      {isPress ? (
        loading ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <h4>brand created </h4>
        )
      ) : null}
      <ToastContainer />
    </div>
  );
};

export default AdminEditSubCategoryModal;
