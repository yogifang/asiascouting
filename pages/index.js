import styles from "../styles/Contant.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import {
  Button,
  Grid,
  Form,
  Nav,
  Row,
  Col,
  Container,
  ButtonGroup,
} from "react-bootstrap";
import { useState, useEffect, useReducer, createContext } from "react";
import Navbar from "../components/Navbar";
import registerImage from "../pages/assets/buttons/register.png";
import loginImage from "../pages/assets/buttons/login.png";
import saveImage from "../pages/assets/buttons/next.png";
//import PagesManifestPlugin from "next/dist/build/webpack/plugins/pages-manifest-plugin";

export default function Home() {
  const handleCreate = () => {};

  const handleLogin = () => {};

  return (
    <Container className={styles.container}>
      <Navbar />
      <Row>
        <Col>
          <Button variant="primary" className={styles.btnAppLogin}></Button>{" "}
        </Col>
        <Col>
          <Button variant="primary" className={styles.btnAppCreate}></Button>{" "}
        </Col>
      </Row>
    </Container>
  );
}
