import { Form, FormControl, Row, Col } from "react-bootstrap";
import styles from "../styles/Contant.module.css";

const TextInput2 = (props) => {
  //  console.log(props.values);
  // console.log(props.values[props.configText.name]);
  // console.log(props.handleFunc);

  const handleLocalChange = (e) => {
    props.handleFunc(e);
  };

  return (
    <>
      <Row className={styles.rowLine}>
        <Col lg="4">
          <Form.Label
            htmlFor={props.configText.name1}
            className={styles.colLeftMain2}
          >
            {props.configText.main1}
            <p className={styles.colLeftSub2}>{props.configText.sub1}</p>
          </Form.Label>{" "}
        </Col>
        <Col lg="2">
          <FormControl
            id={props.configText.name1}
            type={props.configText.type}
            className={styles.colRightMain2}
            name={props.configText.name1}
            onChange={handleLocalChange}
            value={props.values[props.configText.name1]}
          />
          <Form.Label className={styles.colRightSub2}>
            {props.error[props.configText.name1]}
          </Form.Label>
        </Col>

        <Col lg="1">
          <Form.Label
            htmlFor={props.configText.name2}
            className={styles.colLeftMain2}
          >
            {props.configText.main2}
            <p className={styles.colLeftSub2}>{props.configText.sub2}</p>
          </Form.Label>{" "}
        </Col>
        <Col lg="2">
          <FormControl
            id={props.configText.name2}
            type={props.configText.type}
            className={styles.colRightMain2}
            name={props.configText.name2}
            onChange={handleLocalChange}
            value={props.values[props.configText.name2]}
          />
          <Form.Label className={styles.colRightSub2}>
            {props.error[props.configText.name2]}
          </Form.Label>
        </Col>
      </Row>
    </>
  );
};

export default TextInput2;
