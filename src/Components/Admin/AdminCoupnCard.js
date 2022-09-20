import React, { useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import CouponCardHook from "../../hook/coupon/coupon-card-hook";
import deleteicon from "../../images/delete.png";
import editicon from "../../images/edit.png";
import { deleteCoupon } from "../../redux/actions/couponAction";
import { Link } from "react-router-dom";
const AdminCoupnCard = ({ coupon }) => {
  const [formatDate, dateString, show, handleClose, handleShow, handelDelete] =
    CouponCardHook(coupon);

  return (
    <div className="user-address-card my-3 px-2">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            {" "}
            <div className="font">delete confirmation</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="font">
            are you sure you want to delete this coupon ?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="font" variant="success" onClick={handleClose}>
            cancel
          </Button>
          <Button className="font" variant="dark" onClick={handelDelete}>
            delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Row className="d-flex justify-content-between  ">
        <Col xs="6">
          <div className="p-2">coupon name : {coupon.name}</div>
        </Col>
        <Col xs="6" className="d-flex d-flex justify-content-end">
          <div className="d-flex p-2">
            <Link
              to={`/admin/editcoupon/${coupon._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="d-flex mx-2">
                <img
                  alt=""
                  className="ms-1 mt-2"
                  src={editicon}
                  height="17px"
                  width="15px"
                />
                <p className="item-delete-edit"> edit</p>
              </div>
            </Link>
            <div onClick={handleShow} className="d-flex ">
              <img
                alt=""
                className="ms-1 mt-2"
                src={deleteicon}
                height="17px"
                width="15px"
              />
              <p className="item-delete-edit"> delete</p>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs="12">
          <div
            style={{
              color: "#555550",
              fontFamily: "Almarai",
              fontSize: "16px",
            }}
          >
            expirely date : {formatDate(dateString)}
          </div>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col xs="12" className="d-flex">
          <div
            style={{
              color: "#555550",
              fontFamily: "Almarai",
              fontSize: "16px",
            }}
          >
            coupon discount rate:
          </div>

          <div
            style={{
              color: "#979797",
              fontFamily: "Almarai",
              fontSize: "16px",
            }}
            className="mx-2"
          >
            {coupon.discount} %
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AdminCoupnCard;
