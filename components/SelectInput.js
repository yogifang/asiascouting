import { Form, Col } from "react-bootstrap";
import styles from "../styles/Contant.module.css";
import Select from "react-select";
const SelectInput = (props) => {
  //  console.log(props.values);
  // console.log(props.values[props.configText.name]);
  // console.log(props.handleFunc);

  const handleLocalChange = (level) => {
    // console.log('----------Select');
    // console.log(level);
    props.handleFunc(level, props.configText.name);
  };

  return (
    <>
      <Col lg="5">
        <Form.Label
          htmlFor={props.configText.name}
          className={styles.colLeftMain}
        >
          {props.configText.main}
          <p className={styles.colLeftSub}>{props.configText.sub}</p>
        </Form.Label>{" "}
      </Col>
      <Col lg="7">
        <Select
          placeholder="Select Level"
          className={styles.rightSelect}
          name={props.configText.name}
          autosize={true}
          value={props.values}
          onChange={handleLocalChange}
          id={props.configText.name}
          instanceId={props.configText.name}
          options={props.configText.options}
        />
        <Form.Label className={styles.colRightSub}>
          {props.error[props.configText.name]}
        </Form.Label>{" "}
      </Col>
    </>
  );
};

export default SelectInput;
