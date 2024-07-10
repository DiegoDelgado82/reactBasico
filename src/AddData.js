// src/AddData.js
import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
import { Container, Form, Button, Table } from "react-bootstrap";

const AddData = () => {
  const [apellido, setApellido] = useState("");
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [usuarios, setUsuarios] = useState([]);

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
        toast.error("Error al obtener datos: " + error.message);
      }
    };
    fetchData();
  }, []);

  const handleAddData = async () => {
    try {
      const docRef = await addDoc(collection(db, "myCollection"), {
        apellido: apellido,
        nombre: nombre,
        direccion: direccion,
        telefono: telefono,
      });
      console.log("Documento agregado con ID: ", docRef.id);
      toast.success("Datos guardados correctamente");
      // Limpiar los campos después de guardar
      setApellido("");
      setNombre("");
      setDireccion("");
      setTelefono("");
      // Actualizar la lista de usuarios
      setUsuarios([...usuarios, { id: docRef.id, apellido, nombre, direccion, telefono }]);
    } catch (error) {
      console.error("Error al agregar documento: ", error);
      toast.error("Error al guardar datos: " + error.message);
    }
  };

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Agregar Usuario</h1>
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
        <Button variant="primary" onClick={handleAddData}>
          Guardar
        </Button>
      </Form>

      <h2 className="mt-4">Usuarios Guardados</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Apellido</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.apellido}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.direccion}</td>
              <td>{usuario.telefono}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AddData;
