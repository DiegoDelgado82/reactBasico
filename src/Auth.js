// src/Login.js
import React, { useState } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { Container, Form, Button, Row, Col, Image } from "react-bootstrap";
import logo from './assets/logo/logo.png'; // Importa tu logo

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Ingreso exitoso", { autoClose: 1000 });
    } catch (error) {
      console.error("Error de acceso: ", error);
      toast.error("Error de acceso", { autoClose: 1000 });
    }
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-md-center">
        <Col md="4" className="text-center">
          <Image src={logo} fluid className="mb-4 logo" /> {/* Agrega el logo aquí */}
          <h2>Acceso al sistema</h2>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese su email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleLogin}>
              Ingresar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
