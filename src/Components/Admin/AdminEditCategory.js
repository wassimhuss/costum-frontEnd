import React from "react";
import { Button, Image, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import AdminItemsCard from "./AdminItemsCard";
import { makeStyles } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import ModalMui from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import AdminAddCategory from "./AdminAddCategory";
import { useState } from "react";
import noItems from "../../images/noItems.png";
const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: "0 20px 60px -2px rgba(27,33,58,.4)",
    padding: theme.spacing(2, 4, 3),
    width: "50%",
    height: "50%",
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
const AdminEditCategory = ({ categories, category }) => {
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
          add category
        </Button>
      </div>
      <Row className="justify-content-start">
        {categories
          ? categories.map((item, index) => (
              <AdminItemsCard key={index} item={item} category={true} />
            ))
          : null}
      </Row>
      {!categories.length >= 1 ? (
        <div style={{ marginLeft: 250, marginTop: 100 }}>
          <Image
            src={noItems}
            alt="fzx"
            fluid
            height="500px"
            width="550px"
            style={{ cursor: "pointer" }}
          />
        </div>
      ) : null}
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
            <AdminAddCategory />
          </div>
        </Fade>
      </ModalMui>
    </div>
  );
};

export default AdminEditCategory;
