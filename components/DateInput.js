import { Form, Col } from "react-bootstrap";
import styles from "../styles/Contant.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateInput = (props) => {
  //  console.log(props.values);
  // console.log(props.values[props.configText.name]);
  // console.log(props.handleFunc);

  const handleLocalChange = (date) => {
    props.handleFunc(date, props.configText.name);
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
        <DatePicker
          id={props.configText.name}
          name={props.configText.name}
          className={styles.rightSelect}
          selected={props.values[props.configText.name]}
          onChange={handleLocalChange}
          dateFormatCalendar={props.configText.format}
          scrollableYearDropdown
          showYearDropdown
        />
        <Form.Label className={styles.colRightSub}>
          {props.error[props.configText.name]}
        </Form.Label>{" "}
      </Col>
    </>
  );
};

export default DateInput;
