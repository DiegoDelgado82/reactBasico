// src/DataTable.js
import React from "react";
import { Table, Button } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";

const DataTable = ({ usuarios, onEdit }) => {
  return (
    <div className="table-responsive">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Apellido</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.apellido}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.direccion}</td>
              <td>{usuario.telefono}</td>
              <td>
                <Button variant="warning" onClick={() => onEdit(usuario)}>
                  <FaEdit />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DataTable;
