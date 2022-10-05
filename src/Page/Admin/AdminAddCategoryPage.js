import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import AdminSideBar from "../../Components/Admin/AdminSideBar";
import AdminAllProducts from "../../Components/Admin/AdminAllProducts";
import Pagination from "../../Components/Uitily/Pagination";
import AdminOrderDetalis from "../../Components/Admin/AdminOrderDetalis";
import AdminAddCategory from "../../Components/Admin/AdminAddCategory";
import AdminEditCategory from "../../Components/Admin/AdminEditCategory";
import ViewCategoryAdminHook from "../../hook/admin/view-category-admin-hook";
import { ToastContainer } from "react-toastify";
const AdminAddCategoryPage = () => {
  const [items, pagination, onPress] = ViewCategoryAdminHook();
  if (pagination) var pageCount = pagination;
  else pageCount = 0;
  return (
    <Container fluid>
      <Row className="py-3">
        <Col sm="3" xs="2" md="2">
          <AdminSideBar />
        </Col>

        <Col sm="9" xs="10" md="10">
          <AdminEditCategory categories={items} category={true} />
          {pageCount > 1 ? (
            <Pagination pageCount={pageCount} onPress={onPress} />
          ) : null}
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default AdminAddCategoryPage;
