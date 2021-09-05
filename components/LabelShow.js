import { Col } from "react-bootstrap";
import styles from "../styles/Contant.module.css";

const LabelShow = (props) => {
  return (
    <>
      <Col lg="12">
        <div className={styles.textorange}>
          <div className={styles.bgorange}>
            <p className="m0">
              <span>{props.configText.main}</span>
              <br />
              <span>{props.configText.sub}</span>
            </p>
          </div>
        </div>
      </Col>
    </>
  );
};

export default LabelShow;
