// src/UsersModal.js
import React from "react";
import { Modal, Button } from "react-bootstrap";
import DataTable from "./DataTable";

const UsersModal = ({ show, handleClose, usuarios, onEdit }) => {
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Usuarios Guardados</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <DataTable usuarios={usuarios} onEdit={onEdit} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UsersModal;
