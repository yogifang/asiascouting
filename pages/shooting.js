import styles from "../styles/Contant.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import { useForm } from "../components/useForm";
import { Button, Row, Container, ButtonGroup } from "react-bootstrap";
import { Context } from "../components/stores";
import { useState, useEffect, useReducer, useContext } from "react";

import "react-datepicker/dist/react-datepicker.css";
import TextInput from "../components/TextInput";
import DateInput from "../components/DateInput";
import SelectInput from "../components/SelectInput";

const optionsGameLevel = [
  { value: "1", label: "奧運" },
  { value: "2", label: "奧運資格賽/世錦賽/世界盃/世大運" },
  { value: "3", label: "亞運/亞錦賽/亞洲盃" },
  { value: "4", label: "其他" },
];

const LatestGameName = {
  type: "text",
  main: "最近一次比賽名稱",
  sub: "Latest Competition Name",
  name: "latestGameName",
};

const LastestScore = {
  type: "number",
  main: "最近一次比賽成績",
  sub: "Latest Competition Results",
  name: "lastestScore",
};
const LatestGameDate = {
  format: "MMMM",
  main: "比賽日期",
  sub: "Date",
  name: "latestGameDate",
};
const Best10M60R = {
  type: "number",
  main: "10米生涯最佳成績(60發)",
  sub: "10M Air Rifle Record(60 shots)",
  name: "best10M60R",
};
const Best10MLevel = {
  options: optionsGameLevel,
  main: "在哪一層級之賽事達到該成績",
  sub: "Record Broken in What Level",
  name: "best10MLevel",
};
const Best10MDate = {
  format: "MMMM",
  main: "比賽日期",
  sub: "Date",
  name: "best10MDate",
};
const Best50M3x40 = {
  type: "number",
  main: "50米生涯最佳成績(3x40)",
  sub: "50M Rifle Record (3x40)",
  name: "best50M3x40",
};
const Best50M3x40Level = {
  options: optionsGameLevel,
  main: "在哪一層級之賽事達到該成績",
  sub: "Latest Competition Name",
  name: "best50M3x40Level",
};
const Best50M3x40Date = {
  format: "MMMM",
  main: "比賽日期",
  sub: "Date",
  name: "best50M3x40Date",
};
const Best50M3x20 = {
  type: "number",
  main: "50米生涯最佳成績(3x20)",
  sub: "50M Rifle Record (3x20)",
  name: "best50M3x20",
};
const Best50M3x20Level = {
  options: optionsGameLevel,
  main: "在哪一層級之賽事達到該成績",
  sub: "Latest Competition Name",
  name: "latestGameName",
};
const Best50M3x20Date = {
  format: "MMMM",
  main: "比賽日期",
  sub: "Date",
  name: "best50M3x20Date",
};
const RankNational = {
  type: "number",
  main: "國內排名",
  sub: "National Rank",
  name: "rankNational",
};
const RankWorld = {
  type: "number",
  main: "世界排名",
  sub: "World Rank",
  name: "rankWorld",
};
const LinkISSF = {
  type: "text",
  main: "ISSF 官網選手連結",
  sub: "ISSF Profile Link",
  name: "linkISSF",
};
const LinkVideo = {
  type: "text",
  main: "比賽或訓練影片",
  sub: "Showcasing Vidoes",
  name: "linkVideo",
};

const initialFValues = {
  _id: "",
  member: "",
  latestGameName: "",
  lastestScore: 0,
  latestGameDate: Date.now(),
  best10M60R: 0,
  best10MLevel: "",
  best10MDate: Date.now(),
  best50M3x40: 0,
  best50M3x40Level: "",
  best50M3x40Date: Date.now(),
  best50M3x20: 0,
  best50M3x20Level: "",
  best50M3x20Date: Date.now(),
  rankNational: 0,
  rankWorld: 0,
  linkISSF: "",
  linkVideo: "",
  bFilled: false,
};

const Shooting = () => {
  const { member, setMember } = useContext(Context);
  const [latestGameDate, setLatestGameDate] = useState(new Date());
  const [best10MDate, setBest10MDate] = useState(new Date());
  const [best50M3x40Date, setBest50M3x40Date] = useState(new Date());
  const [best50M3x20Date, setBest50M3x20Date] = useState(new Date());
  const [selBest10MLevel, setSelBest10MLevel] = useState(optionsGameLevel[0]);
  const [selBest50M3x20Level, setSelBest50M3x20Level] = useState(
    optionsGameLevel[0]
  );
  const [selBest50M3x40Level, setSelBest50M3x40Level] = useState(
    optionsGameLevel[0]
  );

  const findIndexByValue = (options, label) => {
    console.log(label);
    const index = options.findIndex((options) => options.label === label);
    return index;
    //console.log(options[4].label);
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    const keyname = Object.getOwnPropertyNames(fieldValues);

    switch (keyname[0]) {
      case "lastestScore":
      case "best10M60R":
      case "best50M3x40":
      case "best50M3x20":
      case "rankNational":
      case "rankWorld":
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

  useEffect(() => {
    const getShooting = async () => {
      try {
        const url = process.env.HOST_URI + `api/shootingPerformance/${member}`;
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
          switch (field) {
            case "latestGameDate":
            case "best10MDate":
            case "best50M3x40Date":
            case "best50M3x20Date":
              nValues[field] = Date.parse(Data.data[field]);
              break;
            default:
              nValues[field] = Data.data[field];
              break;
          }

          // setValues(field, Data.data[field]);
        }
        setValues(nValues);
        setLatestGameDate(new Date(nValues.latestGameDate));
        setBest10MDate(new Date(nValues.best10MDate));
        setBest50M3x20Date(new Date(nValues.best50M3x20Date));
        setBest50M3x40Date(new Date(nValues.best50M3x40Date));
        let index = findIndexByValue(optionsGameLevel, nValues.best10MLevel);
        setSelBest10MLevel(optionsGameLevel[index]);
        index = findIndexByValue(optionsGameLevel, nValues.best50M3x20Level);
        setSelBest50M3x20Level(optionsGameLevel[index]);
        index = findIndexByValue(optionsGameLevel, nValues.best50M3x40Level);
        setSelBest50M3x40Level(optionsGameLevel[index]);

        console.log(index);
      } catch (error) {
        console.log(error);
      }
    };

    getShooting();
    //values.member = recMember.email ;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDateChange = (date, name) => {
    switch (name) {
      case "latestGameDate":
        setLatestGameDate(new Date(date));
        values.latestGameDate = date;
        break;
      case "best10MDate":
        setBest10MDate(new Date(date));
        values.best10MDate = date;
        break;
      case "best50M3x40Date":
        setBest50M3x40Date(new Date(date));
        values.best50M3x40Date = date;
        break;
      case "best50M3x20Date":
        setBest50M3x20Date(new Date(date));
        values.best50M3x20Date = date;
        break;
      default:
        break;
    }
  };

  const handleSelectChange = (level, name) => {
    // console.log('----select back');
    switch (name) {
      case "best10MLevel":
        setSelBest10MLevel(level);
        values.Best10MLevel = level;
        break;
      case "best50M3x40Level":
        setSelBest50M3x20Level(level);
        values.Best50M3x40Level = level;
        break;
      case "best50M3x20Level":
        setSelBest50M3x20Level(level);
        values.Best50M3x20Level = level;
        break;
      default:
        break;
    }
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleClick = async (e) => {
    if (values._id === "") {
      const url = process.env.HOST_URI + `api/shootingPerformance/`;
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
      const url = process.env.HOST_URI + `api/shootingPerformance/${member}`;
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
        <div className="div-scroll">
          <Row>
            <p className={styles.textpurple}>射擊成績及運動表現</p>
            <p className={styles.textorange}>若以下資料有不便回答者 可填入N</p>
            <TextInput configText={LatestGameName} handleFunc={handleInputChange} values={values} error={errors} />
            <TextInput configText={LastestScore} handleFunc={handleInputChange} values={values} error={errors} />
            <DateInput configText={LatestGameDate} handleFunc={handleDateChange} values={values} error={errors} />
            <TextInput configText={Best10M60R} handleFunc={handleInputChange} values={values} error={errors} />
            <SelectInput configText={Best10MLevel} handleFunc={handleSelectChange} values={selBest10MLevel} error={errors} />
            <DateInput configText={Best10MDate} handleFunc={handleDateChange} values={values} error={errors} />
            <TextInput configText={Best50M3x40} handleFunc={handleInputChange} values={values} error={errors} />
            <SelectInput configText={Best50M3x40Level} handleFunc={handleSelectChange} values={selBest50M3x40Level} error={errors} />
            <DateInput configText={Best50M3x40Date} handleFunc={handleDateChange} values={values} error={errors} />
            <TextInput configText={Best50M3x20} handleFunc={handleInputChange} values={values} error={errors} />
            <SelectInput configText={Best50M3x20Level} handleFunc={handleSelectChange} values={selBest50M3x20Level} error={errors} />
            <DateInput configText={Best50M3x20Date} handleFunc={handleDateChange} values={values} error={errors} />

            <TextInput configText={RankNational} handleFunc={handleInputChange} values={values} error={errors} />
            <TextInput configText={RankWorld} handleFunc={handleInputChange} values={values} error={errors} />
            <TextInput configText={LinkISSF} handleFunc={handleInputChange} values={values} error={errors} />
            <TextInput configText={LinkVideo} handleFunc={handleInputChange} values={values} error={errors} />
          </Row>
          <Row>
            <br></br>
            <Button justification="right" onClick={handleClick} variant="secondary" className={styles.btnAppNextSmall} ></Button>
          </Row>
        </div>
      </div>
    </Container>
  );
};

export default Shooting;
