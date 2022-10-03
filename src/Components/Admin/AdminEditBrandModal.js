import React, { useState } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import avatar from "../../images/avatar.png";
import { useSelector, useDispatch } from "react-redux";
import AddBrandHook from "../../hook/brand/add-brand-hook";
import notify from "../../hook/useNotifaction";
import { editBrand } from "../../redux/actions/brandAction";
import { useEffect } from "react";
const AdminEditBrandModal = ({ onClose, item }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(item.name);
  const [img, setImg] = useState(item.image);
  const [loading, setLoading] = useState(true);
  const [isPress, setIsPress] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
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
    if (selectedFile == null) {
      convertURLtoFile(item.image).then((val) => setSelectedFile(val));
    }
  }, [selectedFile]);
  console.log(selectedFile);
  //to change name state
  const onChangeName = (event) => {
    event.persist();
    setName(event.target.value);
  };
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImg(URL.createObjectURL(event.target.files[0]));
      setSelectedFile(event.target.files[0]);
    }
  };

  //save data in database
  const handelSubmit = async (event) => {
    event.preventDefault();
    if (name === "" || selectedFile === null) {
      console.log("من فضلك اكمل البيانات");
      notify("من فضلك اكمل البيانات", "warn");
      return;
    }
    console.log(selectedFile);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", selectedFile);
    setLoading(true);
    setIsPress(true);
    await dispatch(editBrand(formData, item._id)).then((res) => {
      res.status === 201
        ? notify("تمت عملية الاضافة بنجاح", "success")
        : notify("هناك مشكله فى عملية الاضافة", "error");
    });
    setTimeout(() => {
      window.location.reload();
    }, 1200);

    setLoading(false);
  };
  return (
    <div>
      <Row className="justify-content-center">
        <div className="admin-content-text-2 pb-4">add new brand</div>
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
