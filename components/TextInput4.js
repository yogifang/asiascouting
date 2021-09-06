import { Form, FormControl, Col } from "react-bootstrap";
import styles from "../styles/Contant.module.css";

const TextInput4 = (props) => {
  //  console.log(props.values);
  // console.log(props.values[props.configText.name]);
  // console.log(props.handleFunc);

  const handleLocalChange = (e) => {
    props.handleFunc(e);
  };

  return (
    <>
      <Col lg="6">
        <div className={styles.bgboarder}>
          <Col lg="12">
            <p className={styles.textorange}>
              <span>投球成績</span>
              <br />
              <span>Pitching Performance</span>
            </p>
          </Col>
        </div>
      </Col>
    </>
  );
};

export default TextInput4;
