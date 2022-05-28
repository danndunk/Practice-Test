import { useState } from "react";

import { Modal, Button, Alert } from "react-bootstrap";
import "./modal.css";

import { API } from "../../config/API";

export default function ModalAdd(props) {
  const [form, setForm] = useState({
    image: "",
    namaBarang: "",
    hargaBeli: "",
    hargaJual: "",
    stok: "",
  });
  const [preview, setPreview] = useState();
  const [message, setMessage] = useState();

  const handleClose = () => {
    props.setShowAdd(false);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("image", form.image[0], form.image[0].name);
      formData.set("namaBarang", form.namaBarang);
      formData.set("hargaBeli", form.hargaBeli);
      formData.set("hargaJual", form.hargaJual);
      formData.set("stok", form.stok);

      const response = await API.post("/product", formData, config);
      console.log(response);

      if (response.data.status === "success") {
        const alert = (
          <Alert
            variant="success"
            className="py-1 d-flex justify-content-center"
          >
            Success Add Book
          </Alert>
        );
        setMessage(alert);
        window.location.reload();
      } else {
        const alert = (
          <Alert
            variant="danger"
            className="py-1 d-flex justify-content-center"
          >
            {response.data.message}
          </Alert>
        );
        setMessage(alert);
      }
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
      centered
    >
      <Modal.Body className="container-form">
        <form onSubmit={handleSubmit}>
          <div
            style={{
              fontSize: "36px",
              lineHeight: "49px",
              fontWeight: "700",
            }}
            className="mb-3 color-black"
          >
            Add Product
          </div>
          <div className="mt-3 form ">
            {preview && (
              <div className="d-flex justify-content-center">
                <img
                  src={preview}
                  style={{
                    maxWidth: "200px",
                    maxHeight: "200px",
                    objectFit: "cover",
                    margin: "10px 0px",
                  }}
                  alt="preview"
                />
              </div>
            )}
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="px-3 py-2 mt-3 color-black"
              required
            />
            <input
              type="text"
              placeholder="namaBarang"
              name="namaBarang"
              onChange={handleChange}
              className="px-3 py-2 mt-3 color-black"
              required
            />
            <input
              type="number"
              placeholder="hargaBeli"
              name="hargaBeli"
              onChange={handleChange}
              className="px-3 py-2 mt-3 color-black"
              required
            />
            <input
              type="number"
              placeholder="hargaJual"
              name="hargaJual"
              onChange={handleChange}
              className="px-3 py-2 mt-3 color-black"
              required
            />
            <input
              type="number"
              placeholder="stok"
              name="stok"
              onChange={handleChange}
              className="px-3 py-2 mt-3 color-black"
              required
            />
            {message}
          </div>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="success" type="submit">
              Add
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  );
}
