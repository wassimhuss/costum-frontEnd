import React, { useState, useEffect } from "react";
import { Col, Card, Row, Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import prod1 from "../../images/prod1.png";
import { useDispatch, useSelector } from "react-redux";
import { deleteBrand } from "../../redux/actions/brandAction";
import notify from "../../hook/useNotifaction";
import { ToastContainer } from "react-toastify";
import { makeStyles } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import ModalMui from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import AdminAddBrand from "./AdminAddBrand";

const AdminItemsCard = ({ item, category }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  const handelDelete = async () => {
    await dispatch(deleteBrand(item._id)).then((res) =>
      res
        ? notify("brand deleted successfuly", "success") +
          setTimeout(() => {
            window.location.reload();
          }, 1250)
        : notify("oh no ! there is a problem ", "error")
    );
    setShow(false);
  };
  return (
    <Col xs="12" sm="6" md="5" lg="2" className="d-flex">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            <div className="font">delete brand </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="font">are you sure you want to delete this brand</div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="font" variant="success" onClick={handleClose}>
            cancel
          </Button>
          <Button className="font" variant="danger" onClick={handelDelete}>
            delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Card
        className="my-4"
        style={{
          width: "100%",
          height: "250px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#FFFFFF",
        }}
      >
        <Row className="d-flex justify-content-center px-2">
          <Col className=" d-flex justify-content-between">
            <div
              onClick={handleShow}
              className="d-inline item-delete-edit"
              style={{ color: "red" }}
            >
              delete
            </div>
            <Link
              to={`/admin/editBrand/${item._id}`}
              style={{ textDecoration: "none" }}
            >
              <div
                className="d-inline item-delete-edit"
                style={{ color: "black" }}
              >
                edit
              </div>
            </Link>
            {category ? (
              <Link
                to={`/admin/category-subs/${item._id}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="d-inline item-delete-edit"
                  style={{ color: "black" }}
                >
                  view
                </div>
              </Link>
            ) : null}
          </Col>
        </Row>
        <div style={{ textDecoration: "none" }}>
          <Card.Img
            style={{ height: "150px", width: "100%" }}
            src={item.image}
          />
          <Card.Body>
            <Card.Title>
              <div className="card-title">{item.name}</div>
            </Card.Title>
            <Card.Text>
              <div className="d-flex justify-content-between">
                <div className="card-rate"></div>
                <div className="d-flex">
                  <div className="card-price">
                    <div>
                      <span
                        style={{ textDecorationLine: "line-through" }}
                      ></span>
                    </div>
                  </div>
                  <div className="card-currency mx-1"></div>
                </div>
              </div>
            </Card.Text>
          </Card.Body>
        </div>
      </Card>
      <ToastContainer />
    </Col>
  );
};

export default AdminItemsCard;
