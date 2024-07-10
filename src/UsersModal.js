// src/UsersModal.js
import React from "react";
import { Modal, Button } from "react-bootstrap";
import DataTable from "./DataTable";

const UsersModal = ({ show, onHide, usuarios, onEdit }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Usuarios Guardados
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <DataTable usuarios={usuarios} onEdit={onEdit} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UsersModal;
