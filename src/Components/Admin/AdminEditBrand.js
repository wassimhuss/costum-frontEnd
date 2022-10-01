import React from "react";
import { Button, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import AdminItemsCard from "./AdminItemsCard";

const AdminAllProducts = ({ brands }) => {
  return (
    <div>
      <div
        className="admin-content-text"
        style={{ marginTop: 10, marginBottom: 10 }}
      >
        <Button
          className="font"
          variant="dark"
          onClick={() => {
            alert("hi");
          }}
        >
          add brand
        </Button>
      </div>
      <Row className="justify-content-start">
        {brands ? (
          brands.map((item, index) => (
            <AdminItemsCard key={index} item={item} />
          ))
        ) : (
          <h4>no brands </h4>
        )}
      </Row>
    </div>
  );
};

export default AdminAllProducts;
