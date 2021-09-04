import { Form, FormControl, Row, Col } from 'react-bootstrap';
import styles from '../styles/Contant.module.css';
import { Context } from './stores';
import { useState, useEffect, useReducer, useContext } from 'react';

import { useRouter } from 'next/router';

const TextInput = (props) => {
  console.log(props.values);
  console.log(props.values[props.configText.name]);
  console.log(props.handleFunc);
  return (
    <>
      <Col lg='5'>
        <Form.Label htmlFor={props.configText.name} className={styles.colLeftMain}>
          {props.configText.main}
          <p className={styles.colLeftSub}>{props.configText.sub}</p>
        </Form.Label>{' '}
      </Col>
      <Col lg='7'>
        <FormControl
          id={props.configText.name}
          type={props.configText.type}
          className={styles.colRightMain}
          name={props.configText.name}
          onClick={props.handleFunc}
          value={props.values[props.configText.name]}
        />
        <Form.Label className={styles.colRightSub}>{props.configText.error}</Form.Label>{' '}
      </Col>
    </>
  );
};

export default TextInput;
