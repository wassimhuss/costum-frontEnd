import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import AdminSideBar from "../../Components/Admin/AdminSideBar";
import AdminAllProducts from "../../Components/Admin/AdminAllProducts";
import Pagination from "../../Components/Uitily/Pagination";
import AdminOrderDetalis from "../../Components/Admin/AdminOrderDetalis";
import AdminAddBrand from "../../Components/Admin/AdminAddBrand";
import AdminEditBrand from "../../Components/Admin/AdminEditBrand";
import ViewProductAdminHook from "../../hook/admin/view-product-admin-hook";
import ViewBrandAdminHook from "../../hook/admin/view-brand-admin-hook";
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
    </Container>
  );
};

export default AdminAddBrandPage;
