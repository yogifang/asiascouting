import { Form, FormControl, Button, Row, Col } from "react-bootstrap";
import styles from "../styles/Contant.module.css";

const Create = () => {
  const handleInputChange = () => {};
  const handleClickSubmit = () => {};
  return (
    <div className={styles.contant}>
      <Row>
        <Col lg="6">
          <Form.Label htmlFor="user_email" className={styles.colLeftMain}>
            * 您是否持有歐盟護照或居住在歐洲
            <p className={styles.colLeftSub}>
              * Are you an EU citizen or holding an EU citizenship ?
            </p>
          </Form.Label>{" "}
        </Col>
        <Col lg="6">
          <div className="d-flex">
            <div className="ml-2 mb-3">
              <label>
                <input
                  name="passport"
                  type="radio"
                  onChange={handleInputChange}
                />
                <span> 是 </span> <span> YES </span>{" "}
              </label>{" "}
            </div>{" "}
            <div className="ml-2 mb-3">
              <label>
                <input
                  name="passport"
                  type="radio"
                  onChange={handleInputChange}
                />
                <span> 否 </span> <span> NO </span>{" "}
              </label>{" "}
            </div>{" "}
          </div>{" "}
        </Col>
      </Row>
      <Row>
        <Col lg="5">
          <Form.Label htmlFor="user_email" className={styles.colLeftMain}>
            請輸入您的聯絡信箱
            <p className={styles.colLeftSub}>Enter your email</p>
          </Form.Label>{" "}
        </Col>
        <Col lg="7">
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
      <Row>
        <Col lg="5">
          <Form.Label htmlFor="user_email" className={styles.colLeftMain}>
            建立密碼
            <p className={styles.colLeftSub}>Create a password</p>
          </Form.Label>{" "}
        </Col>
        <Col lg="7">
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
      <Row>
        <Col lg="5">
          <Form.Label htmlFor="user_email" className={styles.colLeftMain}>
            確認密碼
            <p className={styles.colLeftSub}>Confirm password</p>
          </Form.Label>{" "}
        </Col>
        <Col lg="7">
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
      <Row>
        <Col lg="5">
          <Form.Label htmlFor="user_email" className={styles.colLeftMain}>
            *運動項目
            <p className={styles.colLeftSub}>*Sport items</p>
          </Form.Label>{" "}
        </Col>
        <Col lg="7">
          <Form.Select
            aria-label="Default select example"
            className={styles.colRightMain}
          >
            <option value="1">Shooting</option>
            <option value="2">Baseball</option>
          </Form.Select>
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

export default Create;
