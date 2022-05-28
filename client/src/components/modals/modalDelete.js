import { Modal, Button } from "react-bootstrap";

import { API } from "../../config/API";

export default function ModalDelete(props) {
  const handleClose = () => {
    props.setShowDelete(false);
  };

  const handleDelete = async (e) => {
    try {
      e.preventDefault();
      const response = await API.delete("/product/" + props.deleteId);
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      show={props.show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Body style={{ color: "black " }}>
        Are you sure want to delete this product ?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          No
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
