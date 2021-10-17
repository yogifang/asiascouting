import styles from "../styles/Contant.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import { useForm } from "../components/useForm";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import { Context } from "../components/stores";
import { useState, useEffect, useReducer, useContext } from "react";
import TextInput from "../components/TextInput";

import LabelShow from "../components/LabelShow";
const initialFValues = {
  _id: "",
  member: "",
  GPA: 0,
  AVG: 0,
  TOFEL: 0,
  IELTS: 0,
  TOEIC: 0,
  SAT: 0,
  ACT: 0,
  IntentMajor: "",
  bFilled: false,
};

const LabelSchool = {
  main: "學業成績",
  sub: "Academic Performance",
};
const LabelLanguage = {
  main: "英文檢定",
  sub: "Language Proficiency Tests",
};
const LabelCollage = {
  main: "美國大學入學檢定",
  sub: "College Entrance Exam",
};

const GAP = {
  type: "number",
  main: "在校成績GPA",
  sub: "GPA",
  name: "GPA",
};
const AVG = {
  type: "number",
  main: "在校平均成績",
  sub: "AVG",
  name: "AVG",
};
const TOFEL = {
  type: "number",
  main: "托福考試成績",
  sub: "TOEFL iBT Scores",
  name: "TOFEL",
};
const IELTS = {
  type: "number",
  main: "雅思考試成績",
  sub: "IELTS Scores",
  name: "IELTS",
};
const TOEIC = {
  type: "number",
  main: "多益考試成績",
  sub: "TOEIC Scores",
  name: "TOEIC",
};
const SAT = {
  type: "number",
  main: "SAT考試成績",
  sub: "SAT Scores",
  name: "SAT",
};
const ACT = {
  type: "number",
  main: "ACT考試成績",
  sub: "ACT Scores",
  name: "ACT",
};

const IntentMajor = {
  type: "text",
  main: "欲就讀科系",
  sub: " Interests in College Major",
  name: "IntentMajor",
};

const Subjects = () => {
  const { member } = useContext(Context);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("IntentMajor" in fieldValues) {
    } else {
      console.log(fieldValues);
      const keyname = Object.getOwnPropertyNames(fieldValues);
      temp[keyname] =
        fieldValues[keyname] < 0 ? (temp[keyname] = "不得小於0") : "";
    }

    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  useEffect(() => {
    const getSubjects = async () => {
      try {
        const url = process.env.HOST_URI + `api/subjects/${member}`;
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const Data = await res.json();
        console.log(Data);
        let field;
        let nValues = {};
        for (field in values) {
          nValues[field] = Data.data[field];
        }
        setValues(nValues);
      } catch (error) {
        console.log(error);
      }
    };

    getSubjects();
  }, []);

  const handleClick = async (e) => {
    if (values._id === "") {
      const url = process.env.HOST_URI + `api/subjects/`;
      values.member = member;
      const result = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await result.json();
      alert("Data is Saved!!");
    } else {
      const url = process.env.HOST_URI + `api/subjects/${member}`;
      values.member = member;
      const result = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await result.json();
      alert("Data is Updated!!");
    }
  };

  return (
    <Container className={styles.container}>
      <Navbar />
      <div className={styles.contant}>
        <Row>
          <LabelShow configText={LabelSchool} />
          <TextInput configText={GAP} handleFunc={handleInputChange} values={values} error={errors} />
          <TextInput configText={AVG} handleFunc={handleInputChange} values={values} error={errors} />
          <LabelShow configText={LabelLanguage} />
          <TextInput configText={TOFEL} handleFunc={handleInputChange} values={values} error={errors} />
          <TextInput configText={IELTS} handleFunc={handleInputChange} values={values} error={errors} />
          <TextInput configText={TOEIC} handleFunc={handleInputChange} values={values} error={errors} />
          <LabelShow configText={LabelCollage} />
          <TextInput configText={ACT} handleFunc={handleInputChange} values={values} error={errors} />
          <TextInput configText={IntentMajor} handleFunc={handleInputChange} values={values} error={errors} />
        </Row>
        <Row>
          <br></br>
          <Button justification="right" onClick={handleClick} variant="secondary" className={styles.btnAppNextSmall} ></Button>
        </Row>
      </div>
    </Container>
  );
};

export default Subjects;
