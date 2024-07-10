// src/AddData.js
import React, { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import { collection, addDoc, getDocs, doc, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { FaSignOutAlt, FaUsers } from "react-icons/fa";
import UsersModal from "./UsersModal";

const AddData = () => {
  const [apellido, setApellido] = useState("");
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "myCollection"));
        const usuariosData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setUsuarios(usuariosData);
      } catch (error) {
        console.error("Error al obtener los documentos: ", error);
        toast.error("Error al obtener datos: " + error.message, { autoClose: 1000 });
      }
    };
    fetchData();
  }, []);

  const handleAddOrUpdateData = async () => {
    if (editingUser) {
      try {
        const docRef = doc(db, "myCollection", editingUser.id);
        await updateDoc(docRef, {
          apellido,
          nombre,
          direccion,
          telefono,
        });
        setUsuarios(usuarios.map(user => user.id === editingUser.id ? { id: editingUser.id, apellido, nombre, direccion, telefono } : user));
        toast.success("Datos actualizados correctamente", { autoClose: 1000 });
      } catch (error) {
        console.error("Error al actualizar documento: ", error);
        toast.error("Error al actualizar datos: " + error.message, { autoClose: 1000 });
      }
    } else {
      try {
        const docRef = await addDoc(collection(db, "myCollection"), {
          apellido,
          nombre,
          direccion,
          telefono,
        });
        console.log("Documento agregado con ID: ", docRef.id);
        toast.success("Datos guardados correctamente", { autoClose: 1000 });
        setUsuarios([...usuarios, { id: docRef.id, apellido, nombre, direccion, telefono }]);
      } catch (error) {
        console.error("Error al agregar documento: ", error);
        toast.error("Error al guardar datos: " + error.message, { autoClose: 1000 });
      }
    }
    resetForm();
  };

  const resetForm = () => {
    setApellido("");
    setNombre("");
    setDireccion("");
    setTelefono("");
    setEditingUser(null);
  };

  const handleEdit = (user) => {
    setApellido(user.apellido);
    setNombre(user.nombre);
    setDireccion(user.direccion);
    setTelefono(user.telefono);
    setEditingUser(user);
    setShowModal(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Sesión cerrada correctamente", { autoClose: 1000 });
    } catch (error) {
      console.error("Error al cerrar sesión: ", error);
      toast.error("Error al cerrar sesión: " + error.message, { autoClose: 1000 });
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col>
          <h1>{editingUser ? "Editar Usuario" : "Agregar Usuario"}</h1>
        </Col>
        <Col className="text-end">
          <Button variant="outline-danger" onClick={handleLogout}>
            <FaSignOutAlt /> Cerrar Sesión
          </Button>
        </Col>
      </Row>
      <Form>
        <Form.Group className="mb-3" controlId="apellido">
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="nombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="direccion">
          <Form.Label>Dirección</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese dirección"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="telefono">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" onClick={handleAddOrUpdateData}>
          {editingUser ? "Actualizar" : "Guardar"}
        </Button>
        <Button variant="info" className="ms-2" onClick={handleShowModal}>
          <FaUsers /> Usuarios Guardados
        </Button>
      </Form>
      <UsersModal show={showModal} onHide={handleCloseModal} usuarios={usuarios} onEdit={handleEdit} />
    </Container>
  );
};

export default AddData;
