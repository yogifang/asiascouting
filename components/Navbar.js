import Link from "next/link";
import { Navbar, Button, Tabs, Tab, Container, Nav } from "react-bootstrap";
import styles from "../styles/Nav.module.css";

const AppNavbar = () => (
  <>
    <Navbar bg="light" variant="light" className={styles.navbar}>
      <Container className={styles.Container}>
        <Nav>
          <Nav.Link href="#home">
            {" "}
            <span>
              帳號建立<br></br>Sign Up for Free{" "}
            </span>
          </Nav.Link>
          <Nav.Link href="#features">
            {" "}
            <span>
              基本資料 <br></br>Basic Info{" "}
            </span>
          </Nav.Link>

          <Nav.Link href="#pricing">
            {" "}
            <span>
              成績及運動表現 <br></br>Physical Performance{" "}
            </span>
          </Nav.Link>
          <Nav.Link href="#pricing">
            <span>
              射擊成績 <br></br>Shooting{" "}
            </span>
          </Nav.Link>
          <Nav.Link href="#pricing">
            {" "}
            <span>
              {" "}
              聯繫資料 <br></br>Contact{" "}
            </span>
          </Nav.Link>
          <Nav.Link href="#pricing">
            {" "}
            <span>
              學科相關成績 <br></br>Academic Achievements{" "}
            </span>
          </Nav.Link>
          <Nav.Link href="#pricing">
            {" "}
            <span>
              確認送出 <br></br>Submit{" "}
            </span>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  </>
);

export default AppNavbar;
