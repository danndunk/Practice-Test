import { useEffect, useState } from "react";
import convertRupiah from "rupiah-format";

import NavbarComponent from "../components/navbar/navbar";
import ModalAdd from "../components/modals/modalAdd";
import ModalDelete from "../components/modals/modalDelete";
import ModalEdit from "../components/modals/modalEdit";

import { Container, Card, Button } from "react-bootstrap";
import "./productPage.css";

import { API } from "../config/API";

export default function Products() {
  const [showDelete, setShowDelete] = useState();
  const [showAdd, setShowAdd] = useState();
  const [showEdit, setShowEdit] = useState();
  const [products, setProducts] = useState();
  const [deleteId, setDeleteId] = useState();
  const [editId, setEditId] = useState();

  const handleAdd = () => {
    setShowAdd(true);
  };

  const handleModalDelete = (id) => {
    setShowDelete(true);
    setDeleteId(id);
  };

  const handleModalEdit = (id) => {
    setShowEdit(true);
    setEditId(id);
  };

  const getProducts = async () => {
    try {
      const response = await API.get("/products");

      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <NavbarComponent />
      <Container className="py-5 mt-5">
        <div className="ms-4">
          <Button variant="info" className="px-4 mb-2" onClick={handleAdd}>
            Add
          </Button>
        </div>
        <div className="d-flex flex-wrap justify-content-center">
          {products?.map((product) => (
            <Card
              style={{ width: "18rem" }}
              className="card-container mx-3 my-3 bg-secondary"
              key={product.id}
            >
              <Card.Img
                variant="top"
                src={product.image}
                className="img-product"
              />
              <Card.Body>
                <Card.Title style={{ fontSize: "40px", fontWeight: "600" }}>
                  {product.namaBarang}
                </Card.Title>
                <Card.Text className="mt-2" style={{ fontSize: "14px" }}>
                  Harga Beli : {convertRupiah.convert(product.hargaBeli)}
                </Card.Text>
                <Card.Text
                  className="mb-4"
                  style={{ marginTop: "-10px", fontSize: "14px" }}
                >
                  Harga Jual : {convertRupiah.convert(product.hargaJual)}
                </Card.Text>
                <div className="btn-group" style={{ width: "100%" }}>
                  <Button
                    onClick={() => handleModalEdit(product.id)}
                    className="mx-1 text-dark"
                    variant="secondary"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleModalDelete(product.id)}
                    className="mx-1"
                    variant="danger"
                  >
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
        <ModalAdd show={showAdd} setShowAdd={setShowAdd} />
        <ModalDelete
          show={showDelete}
          setShowDelete={setShowDelete}
          deleteId={deleteId}
        />
        <ModalEdit show={showEdit} setShowEdit={setShowEdit} editId={editId} />
      </Container>
    </>
  );
}
