import React from "react";
import { Button, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import AdminItemsCard from "./AdminItemsCard";
import { makeStyles } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import ModalMui from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import AdminAddBrand from "./AdminAddBrand";
import { useState } from "react";
const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: "0 20px 60px -2px rgba(27,33,58,.4)",
    padding: theme.spacing(2, 4, 3),
    width: "60%",
    height: "60%",
    overflow: "hidden",
    borderRadius: "8px",
  },
  modal: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
}));
const AdminAllProducts = ({ brands }) => {
  const [editBrandModal, setEditBrandModal] = useState(false);
  const openEditBrandModal = () => {
    setEditBrandModal(true);
  };

  const closeEditBrandModal = () => {
    setEditBrandModal(false);
  };
  const classes = useStyles();
  return (
    <div>
      <div
        className="admin-content-text"
        style={{ marginTop: 10, marginBottom: 10 }}
      >
        <Button className="font" variant="dark" onClick={openEditBrandModal}>
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
      <ModalMui
        disableAutoFocus={true}
        className={classes.modal}
        open={editBrandModal}
        onClose={closeEditBrandModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={editBrandModal}>
          <div className={classes.paper}>
            <AdminAddBrand />
          </div>
        </Fade>
      </ModalMui>
    </div>
  );
};

export default AdminAllProducts;
