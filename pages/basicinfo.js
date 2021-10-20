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
import MonthInput from "../components/MonthInput";
import SelectInput from "../components/SelectInput";

const initialFValues = {
  _id: "",
  ChineseName: "",
  PassportName: "",
  Gender: "",
  GradDate: Date.now(),
  Height: 0.0,
  LeftRightHand: "",
  PriPosition: "",
  SecPosition: "",
  Weight: 0.0,
  bFilled: false,
  currentGrad: "",
  member: "",
};
const optionsPosition = [
  { value: "P", label: "投手" },
  { value: "C", label: "捕手" },
  { value: "1B", label: "一壘手" },
  { value: "2B", label: "二壘手" },
  { value: "3B", label: "三壘手" },
  { value: "SS", label: "游擊手" },
  { value: "LF", label: "左外野手" },
  { value: "CF", label: "中外野手" },
  { value: "RF", label: "右外野手" },
  { value: "DH", label: "指定打擊" },
];

const optionsHands = [
  { value: "LPLH", label: "左投左打" },
  { value: "RPRH", label: "右投右打" },
  { value: "LPRH", label: "左投右打" },
  { value: "RPLH", label: "右投左打" },
  { value: "LPDH", label: "左投兩打" },
  { value: "RPDH", label: "右投兩打" },
];

const optionsGrads = [
  { value: "G1", label: "小學一年級" },
  { value: "G2", label: "小學二年級" },
  { value: "G3", label: "小學三年級" },
  { value: "G4", label: "小學四年級" },
  { value: "G5", label: "小學五年級" },
  { value: "G6", label: "小學六年級" },
  { value: "G7", label: "國中一年級" },
  { value: "G8", label: "國中二年級" },
  { value: "G9", label: "國中三年級" },
  { value: "G10", label: "高中一年級" },
  { value: "G11", label: "高中二年級" },
  { value: "G12", label: "高中三年級" },
  { value: "G13", label: "大學" },
];

const ChineseName = {
  type: "text",
  main: "*中文姓名",
  sub: "*Preferred Name",
  name: "ChineseName",
};

const PassportName = {
  type: "text",
  main: "*護照英文名",
  sub: "*First Name and Last Name",
  name: "PassportName",
};

const Height = {
  type: "number",
  main: "身高(公分)",
  sub: "Height (cm)",
  name: "Height",
};

const Weight = {
  type: "number",
  main: "體重(公斤)",
  sub: "Weight(kg)",
  name: "Weight",
};

const CurrentGrad = {
  options: optionsGrads,
  main: "年級",
  sub: "School Grad Year",
  name: "currentGrad",
};
const GradDate = {
  format: "MM/yyyy",
  main: "高中預計畢業日期(年月)",
  sub: "High School Expected Graduation Date",
  name: "GradDate",
};

const PrimePostion = {
  options: optionsPosition,
  main: "*守備位置",
  sub: "*Position",
  name: "PriPosition",
};

const SecondPostion = {
  options: optionsPosition,
  main: "*第二守備位置",
  sub: "*Second Position(s)",
  name: "SecPosition",
};

const Handers = {
  options: optionsHands,
  main: "投/打慣用手",
  sub: "B/T",
  name: "LeftRightHand",
};

const BasicInfo = () => {
  const { member, setMember, sportItem, setSportItem } = useContext(Context);
  const [radioGenger, setRadioGender] = useState("Male");
  const [selPriPosition, setSelPriPosition] = useState(optionsPosition[0]);
  const [selSecPosition, setSelSecPosition] = useState(optionsPosition[1]);
  const [selHands, setSelHands] = useState(optionsHands[0]);
  const [selGrads, setSelGrads] = useState(optionsGrads[0]);
  const [loaded, setLoaded] = useState(false);
  const [dateGrad , setDateGrad] = useState(Date.now()) ;
  const findIndexByValue = (options, value) => {
    const index = options.findIndex((options) => options.value === value);
    return index;
    //console.log(options[4].label);
  };

  useEffect(() => {
    const getBasicInfo = async () => {
      try {
        const url = process.env.HOST_URI + `api/baseballInfo/${member}`;
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
          //  console.log(field);
          if (field !== "GradDate") {
            nValues[field] = Data.data[field];
          } else {
            nValues[field] = Date.parse(Data.data[field]);
          }

          // setValues(field, Data.data[field]);
        }
        console.log(nValues);
        setValues(nValues);
        let index = findIndexByValue(optionsPosition, nValues.PriPosition);
        setSelPriPosition(optionsPosition[index]);
        index = findIndexByValue(optionsPosition, nValues.SecPosition);
        setSelSecPosition(optionsPosition[index]);
        index = findIndexByValue(optionsHands, nValues.LeftRightHand);
        setSelHands(optionsHands[index]);
        index = findIndexByValue(optionsGrads, nValues.currentGrad);
        setSelGrads(optionsGrads[index]);
        values.currentGrad = optionsGrads[index];
        setRadioGender(nValues.Gender);
        setDateGrad(Date(nValues.GradDate));
        setLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    if (!loaded) {
      getBasicInfo();
    }
  }, []);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    const keyname = Object.getOwnPropertyNames(fieldValues);

    switch (keyname[0]) {
      case "Height":
      case "Weight":
        temp[keyname] =
          fieldValues[keyname] < 0 ? (temp[keyname] = "不得小於0") : "";
        break;
      default:
        break;
    }
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleRadioGender = (e) => {
    setRadioGender(e.target.name);
    console.log(e.target);
    values.Gender = e.target.name;
  };

  const handleDateChange = (date, name) => {
    console.log("------------call back");
    //  console.log(name);
    console.log(date);
    switch (name) {
      case "GradDate":
        setDateGrad(Date.parse(date));
        values.GradDate = Date.parse(date);
        break;

      default:
        break;
    }
  };

  const handleSelectChange = (level, name) => {
    //   console.log("----select back");
    //   console.log(level);
    switch (name) {
      case "currentGrad":
        setSelGrads(level);
        values.currentGrad = level.value;
        break;
      case "PriPosition":
        setSelPriPosition(level);
        values.PriPosition = level.value;
        break;
      case "SecPosition":
        setSelSecPosition(level);
        values.SecPosition = level.value;
        break;
      case "LeftRightHand":
        setSelHands(level);
        values.LeftRightHand = level.value;
        break;
      default:
        break;
    }
  };

  const handleClick = async (e) => {
    values.member = member;

    if (values._id === "") {
      const url = process.env.HOST_URI + `api/baseballInfo/`;
      const result = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await result.json();
      //  console.log(data);
      alert("Data is Saved!!");
    } else {
      const url = process.env.HOST_URI + `api/baseballInfo/${member}`;
      const result = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await result.json();
      console.log(data);
      alert("Data is Updated!!");
    }
  };

  return (
    <Container className={styles.container}>
      <Navbar />
      <div className={styles.contant}>
        <Row>
          <p className={styles.textorange}>若以下資料有不便回答者 可填入N</p>

          <TextInput configText={ChineseName} handleFunc={handleInputChange} values={values} error={errors} />
          <TextInput configText={PassportName} handleFunc={handleInputChange} values={values} error={errors} />

          <Col lg="5">
            <Form.Label type="radio" className={styles.colLeftMain}>
              *性別
              <p className={styles.colLeftSub}>*Sex</p>
            </Form.Label>
          </Col>
          <Col lg="7">
            <Form>
              <div key={`inline-radio`} className="mb-3" id="genderSel">
                <Form.Check inline label="男" name="Male" type={"radio"} id={`inline-radio-1`} checked={radioGenger === "Male"} onChange={handleRadioGender} />
                <Form.Check inline label="女" name="Female" type={"radio"} id={`inline-radio-2`} checked={radioGenger === "Female"} onChange={handleRadioGender} />
                <Form.Check inline label="其它" name="Others" type={"radio"} id={`inline-radio-3`} checked={radioGenger === "Others"} onChange={handleRadioGender} />
              </div>
            </Form>
          </Col>
          {sportItem === "baseball" ? (
            <>
              <SelectInput configText={PrimePostion} handleFunc={handleSelectChange} values={selPriPosition} error={errors} />
              <SelectInput configText={SecondPostion} handleFunc={handleSelectChange} values={selSecPosition} error={errors} />
              <SelectInput configText={Handers} handleFunc={handleSelectChange} values={selHands} error={errors} />
            </>
          ) : null}
          <TextInput configText={Height} handleFunc={handleInputChange} values={values} error={errors} />
          <TextInput configText={Weight} handleFunc={handleInputChange} values={values} error={errors} />
          <SelectInput configText={CurrentGrad} handleFunc={handleSelectChange} values={selGrads} error={errors} />
          <MonthInput configText={GradDate} handleFunc={handleDateChange} values={values} error={errors} />
        </Row>
        <Row>
          <br></br>
          <Button justification="right" onClick={handleClick} variant="secondary" className={styles.btnAppNextSmall} ></Button>{" "}
        </Row>
      </div>
    </Container>
  );
};

export default BasicInfo;
