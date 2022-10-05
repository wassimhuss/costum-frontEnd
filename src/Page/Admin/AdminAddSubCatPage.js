import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import AdminSideBar from "../../Components/Admin/AdminSideBar";
import AdminEditSubCategory from "../../Components/Admin/AdminEditSubCategory";
import { ToastContainer } from "react-toastify";
const AdminAddSubCatPage = () => {
  return (
    <Container fluid>
      <Row className="py-3">
        <Col sm="3" xs="2" md="2">
          <AdminSideBar />
        </Col>

        <Col sm="9" xs="10" md="10">
          <AdminEditSubCategory />
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default AdminAddSubCatPage;
