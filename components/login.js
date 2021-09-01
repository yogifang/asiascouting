import { Form, FormControl, Button, Row, Col } from "react-bootstrap";
import styles from "../styles/Contant.module.css";

const Login = () => {
  const handleInputChange = () => {};
  const handleClickSubmit = () => {};
  return (
    <div className={styles.contant}>
      <Row>
        <Col lg="6">
          <Form.Label htmlFor="user_email" className={styles.colLeftMain}>
            請輸入您的聯絡信箱
            <p className={styles.colLeftSub}>Enter your email</p>
          </Form.Label>{" "}
        </Col>
        <Col lg="6">
          <FormControl
            id="user_email"
            type="text"
            className={styles.colRightMain}
            name="email"
            onChange={handleInputChange}
          />
          <Form.Label className={styles.colRightSub}>5678</Form.Label>{" "}
        </Col>
      </Row>
      <br />
      <Row>
        <Col lg="6">
          <Form.Label htmlFor="user_password" className={styles.colLeftMain}>
            輸入密碼
            <p className={styles.colLeftSub}>Input Your password</p>
          </Form.Label>{" "}
        </Col>
        <Col lg="6">
          <FormControl
            id="user_password"
            type="text"
            className={styles.colRightMain}
            name="email"
            onChange={handleInputChange}
          />
          <Form.Label className={styles.colRightSub}>5678</Form.Label>{" "}
        </Col>
      </Row>
      <Row>
        <p className={styles.m0}>
          * 本人已閱讀並同意願遵守
          <a
            href="https://www.findyourathlete.com/termsofuse"
            target="_blank"
            rel="noreferrer"
          >
            使用者條款
          </a>
          及
          <a
            href="https://www.findyourathlete.com/privacypolicy"
            target="_blank"
            rel="noreferrer"
          >
            隱私權政策
          </a>
          <br />
          <span>
            * By clicking Check box, you agree to our Terms and our Privacy
            Policy.{" "}
          </span>
        </p>
        <Form.Label className={styles.m0}>
          <input
            name="isPrivacy"
            type="checkbox"
            onChange={handleInputChange}
          />{" "}
          <span> 是 </span> <span> YES </span>{" "}
        </Form.Label>
        <br></br>
        <Button
          justification="right"
          variant="secondary"
          className={styles.btnAppLoginSmall}
        ></Button>{" "}
      </Row>
    </div>
  );
};

export default Login;
