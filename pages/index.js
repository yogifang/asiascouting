import styles from "../styles/Contant.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import Login from "../components/login";
<<<<<<< HEAD
import Create from "../components/create";
=======
>>>>>>> 76e59063779354612be1802f489dbbcd56c2723d
import {
  Button,
  Grid,
  Form,
  Nav,
  Row,
  Col,
  Container,
  Spinner,
  ButtonGroup,
} from "react-bootstrap";
import { useState, useEffect, useReducer, createContext } from "react";
import Navbar from "../components/Navbar";
import registerImage from "../pages/assets/buttons/register.png";
import loginImage from "../pages/assets/buttons/login.png";
import saveImage from "../pages/assets/buttons/next.png";
//import PagesManifestPlugin from "next/dist/build/webpack/plugins/pages-manifest-plugin";

export default function Home() {
  const [login, setLogin] = useState(false);
  const [typeLogin, setTypeLogin] = useState("");

  const handleCreate = () => {
    setLogin(true);
    setTypeLogin("create");
  };

  const handleLogin = () => {
    setLogin(true);
    setTypeLogin("login");
  };

  const handleGoogleLogin = () => {
    setLogin(true);
    setTypeLogin("google");
  };

  const switchRender = () => {
    console.log(typeLogin);
    switch (typeLogin) {
      case "login":
        console.log("switch....login....");
        return <Login />;
        break;
      case "create":
<<<<<<< HEAD
        return <Create />;
=======
>>>>>>> 76e59063779354612be1802f489dbbcd56c2723d
        break;
      case "google":
        break;
      default:
        break;
    }
  };
  return (
    <Container className={styles.container}>
      <Navbar />
      {!login ? (
        <Row>
          <Col>
            <Button
              justification="right"
              variant="secondary"
              className={styles.btnAppCreate}
              onClick={handleCreate}
            ></Button>{" "}
          </Col>
          <Col>
            <Button
              justification="left"
              variant="secondary"
              className={styles.btnAppLogin}
              onClick={handleLogin}
            ></Button>{" "}
          </Col>
          <Col>
            <Button variant="secondary" onClick={handleGoogleLogin}>
              Google Login
            </Button>{" "}
          </Col>
        </Row>
      ) : (
        <>{switchRender()}</>
      )}
    </Container>
  );
}
