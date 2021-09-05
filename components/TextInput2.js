import { Form, FormControl, Col } from "react-bootstrap";
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
      <Col lg="2"></Col>
      <Col lg="2">
        <Form.Label
          htmlFor={props.configText.name}
          className={styles.colLeftMain}
        >
          {props.configText.main}
          <p className={styles.colLeftSub}>{props.configText.sub}</p>
        </Form.Label>{" "}
      </Col>
      <Col lg="2">
        <FormControl
          id={props.configText.name}
          type={props.configText.type}
          className={styles.colRightMain}
          name={props.configText.name}
          onChange={handleLocalChange}
          value={props.values[props.configText.name]}
        />
        <Form.Label className={styles.colRightSub}>
          {props.error[props.configText.name]}
        </Form.Label>{" "}
      </Col>
      <Col lg="2">
        <Form.Label
          htmlFor={props.configText.name}
          className={styles.colLeftMain}
        >
          {props.configText.main}
          <p className={styles.colLeftSub}>{props.configText.sub}</p>
        </Form.Label>{" "}
      </Col>
      <Col lg="2">
        <FormControl
          id={props.configText.name}
          type={props.configText.type}
          className={styles.colRightMain}
          name={props.configText.name}
          onChange={handleLocalChange}
          value={props.values[props.configText.name]}
        />
        <Col lg="2"></Col>
        <Form.Label className={styles.colRightSub}>
          {props.error[props.configText.name]}
        </Form.Label>{" "}
      </Col>
    </>
  );
};

export default TextInput2;
