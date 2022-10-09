import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import AdminSideBar from "../../Components/Admin/AdminSideBar";
import Pagination from "../../Components/Uitily/Pagination";
import AdminEditBrand from "../../Components/Admin/AdminEditBrand";
import ViewBrandAdminHook from "../../hook/admin/view-brand-admin-hook";
import { ToastContainer } from "react-toastify";
const AdminAddBrandPage = () => {
  const [items, pagination, onPress] = ViewBrandAdminHook();
  if (pagination) var pageCount = pagination;
  else pageCount = 0;
  return (
    <Container fluid>
      <Row className="py-3">
        <Col sm="3" xs="2" md="2">
          <AdminSideBar />
        </Col>

        <Col sm="9" xs="10" md="10">
          <AdminEditBrand brands={items} />
          {pageCount > 1 ? (
            <Pagination pageCount={pageCount} onPress={onPress} />
          ) : null}
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default AdminAddBrandPage;
