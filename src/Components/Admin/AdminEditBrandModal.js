import React, { useEffect, useState } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import avatar from "../../images/avatar.png";
import AddBrandHook from "../../hook/brand/add-brand-hook";
import { useDispatch, useSelector } from "react-redux";
import notify from "../../hook/useNotifaction";
import { editBrand } from "../../redux/actions/brandAction";
const AdminEditBrandModal = ({ item }) => {
  const dispatch = useDispatch();
  const [img, setImg] = useState(avatar);
  const [name, setName] = useState(item.name);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPress, setIsPress] = useState(false);
  //convert url to file
  const convertURLtoFile = async (url) => {
    const response = await fetch(url, { mode: "cors" });
    const data = await response.blob();
    const ext = url.split(".").pop();
    const filename = url.split("/").pop();
    const metadata = { type: `image/${ext}` };
    return new File([data], Math.random(), metadata);
  };
  useEffect(() => {
    if (item.image) {
      convertURLtoFile(item.image).then(
        (val) => setSelectedFile(val) + setImg(URL.createObjectURL(val))
      );
    }
  }, [item]);
  const onChangeName = (event) => {
    setName(event.target.value);
  };

  //when image change save it
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImg(URL.createObjectURL(event.target.files[0]));
      setSelectedFile(event.target.files[0]);
    }
  };
  const handelSubmit = async (event) => {
    if (name === "" || selectedFile === null) {
      notify("please fill all fields", "warn");
      return;
    }
    const formData = new FormData();
    console.log(name + " " + selectedFile);
    formData.append("name", name);
    formData.append("image", selectedFile);
    setLoading(true);
    setIsPress(true);
    await dispatch(editBrand(item._id, formData)).then((res) =>
      res
        ? notify("brand edited successfully", "success") +
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
        <div className="admin-content-text-2 pb-4">edit brand</div>
        <Col sm="12">
          <div className="text-form pb-2">brand image</div>
          <div>
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
              name="photo"
              onChange={onImageChange}
              id="upload-photo"
            />
          </div>
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

export default AdminEditBrandModal;
