import { Form, Row, Col } from "react-bootstrap";
import styles from "../styles/Contant.module.css";
import { useState } from "react";
const OutputText = (props) => {
  // console.log("output text.....");
  let value1 =
    (props.value1 === undefined) | (props.value1 === "") ? "N/A" : props.value1;

  let value2 =
    (props.value2 === undefined) | (props.value2 === "") ? "N/A" : props.value2;

  return (
    <>
      <Col sm={props.cols} className={styles.sheetcell}>
        <Row>
          <Col>
            <Form.Label htmlFor={props.name1} className={styles.pagemain}>
              {props.main1}
              <p className={styles.pagevalue}>
                {value1}
                {props.unit1}
              </p>
            </Form.Label>
          </Col>
          <Col>
            <Form.Label htmlFor={props.name2} className={styles.pagemain}>
              {props.main2}
              <p className={styles.pagevalue}>
                {value2}
                {props.unit2}
              </p>
            </Form.Label>
          </Col>
        </Row>
      </Col>

    </>
  );
};

export default OutputText;
