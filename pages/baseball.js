import styles from "../styles/Contant.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import { useForm } from "../components/useForm";
import { Button, Row, Col, Container, ButtonGroup } from "react-bootstrap";
import { Context } from "../components/stores";
import { useState, useEffect, useReducer, useContext } from "react";

import "react-datepicker/dist/react-datepicker.css";
import TextInput from "../components/TextInput";
import DateInput from "../components/DateInput";
import SelectInput from "../components/SelectInput";
import TextInput2 from "../components/TextInput2";
import TextInput4 from "../components/TextInput4";
import LabelShow from "../components/LabelShow";

const initialFValues = {
  _id: "",
  member: "",
  TenYardSplit: 0,
  SixtyYardSplit: 0,
  Throwing: 0,
  BlockPitch: 0,
  ERA: 0,
  gamesP: 0,
  AVG: 0,
  ER: 0,
  EXIT: 0,
  HB: 0,
  HR: 0,
  IP: 0,
  K: 0,
  OPS: 0,
  gamesH: 0,
  BB: 0,
  BBB: 0,
  BH: 0,
  BHR: 0,
  BK: 0,
  BRUN: 0,
  RUN: 0,
  Hit2B: 0,
  Hit3B: 0,
  Hits: 0,
  lAVG: 0,
  lBB: 0,
  lBBB: 0,
  lBH: 0,
  lBHR: 0,
  lBK: 0,
  lBRUN: 0,
  lER: 0,
  lERA: 0,
  lHB: 0,
  lHit2B: 0,
  lHit3B: 0,
  lHitHR: 0,
  lHits: 0,
  lIP: 0,
  lK: 0,
  lOPS: 0,
  lRUN: 0,
  AB: 0,
  latestGameDate: Date.now(),
  latestGameName: "",
  bFilled: false,
};

const LastestGameDate = {
  format: "MMMM",
  main: "最近一次比賽日期",
  sub: "Most recent game date",
  name: "latestGameDate",
};
const LastestGameName = {
  type: "text",
  main: "最近一次比賽名稱",
  sub: "Most recent game tournament/competition name",
  name: "latestGameName",
};

const Split10Yard = {
  type: "number",
  main: "10碼衝刺（秒）",
  sub: "10 Yard Split (Sec.)",
  name: "TenYardSplit",
};
const Split60Yard = {
  type: "number",
  main: "60碼衝刺（秒）",
  sub: "60 Yard Split (Sec.)",
  name: "SixtyYardSplit",
};

const ThrowingSpeed = {
  type: "number",
  main: "球速（英里每小時）",
  sub: "Throwing Velocity (mph)",
  name: "Throwing",
};

const BlockingSpeed = {
  type: "number",
  main: "捕手二壘阻殺測試(秒)",
  sub: "Block Pitch (sec.)",
  name: "BlockPitch",
};

const EraEr = {
  type: "number",
  main1: "防禦率",
  sub1: "ERA",
  name1: "ERA",
  main2: "自責分",
  sub2: "ER",
  name2: "ER",
};

const GBhr = {
  type: "number",
  main1: "出賽場數",
  sub1: "G",
  name1: "gamesP",
  main2: "被全壘打",
  sub2: "BHR",
  name2: "BHR",
};
const IpHb = {
  type: "number",
  main1: "投球局數",
  sub1: "IP",
  name1: "IP",
  main2: "觸身球",
  sub2: "HB",
  name2: "HB",
};

const Hbb = {
  type: "number",
  main1: "被安打",
  sub1: "H",
  name1: "BH",
  main2: "保送",
  sub2: "BB",
  name2: "BB",
};

const Rk = {
  type: "number",
  main1: "被得分",
  sub1: "R",
  name1: "BRUN",
  main2: "三振",
  sub2: "K",
  name2: "K",
};

const EvAb = {
  type: "number",
  main1: "揮棒速度(英里每小時)",
  sub1: "Exit Velocity",
  name1: "EXIT",
  main2: "打席",
  sub2: "AB",
  name2: "AB",
};

const Avg2B = {
  type: "number",
  main1: "打擊率",
  sub1: "AVG",
  name1: "AVG",
  main2: "二壘安打",
  sub2: "2B",
  name2: "Hit2B",
};
const Ops3B = {
  type: "number",
  main1: "攻擊指數",
  sub1: "OPS",
  name1: "OPS",
  main2: "三壘安打",
  sub2: "3B",
  name2: "Hit3B",
};

const GHR = {
  type: "number",
  main1: "出賽場數",
  sub1: "G",
  name1: "gamesH",
  main2: "全壘打",
  sub2: "HR",
  name2: "HR",
};

const RK = {
  type: "number",
  main1: "得分",
  sub1: "R",
  name1: "RUN",
  main2: "被三振",
  sub2: "K",
  name2: "BK",
};

const HBBB = {
  type: "number",
  main1: "安打",
  sub1: "H",
  name1: "Hits",
  main2: "被保送",
  sub2: "BB",
  name2: "BBB",
};

const LabelSprint = {
  main: "速度",
  sub: "Sprint meansurements (time)",
};

const LabelHitting = {
  main: "打擊表現與生涯數據",
  sub: "Hitting Performance & Career Stats",
};
const LabelPitching = {
  main: "投球表現與生涯數據",
  sub: "SPitching Performance & Career Stats",
};
const BaseballPerformance = () => {
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("rankDomestic" in fieldValues)
      temp.rankDomestic = fieldValues.rankDomestic
        ? ""
        : "This field is required.";
    if ("englishName" in fieldValues)
      temp.englishName = fieldValues.englishName
        ? ""
        : "This field is required.";
    if ("email" in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not valid.";
    if ("mobile" in fieldValues)
      temp.mobile =
        fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required.";
    if ("departmentId" in fieldValues)
      temp.departmentId =
        fieldValues.departmentId.length !== 0 ? "" : "This field is required.";
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

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

  return (
    <Container className={styles.container}>
      <Navbar />
      <div className={styles.contant}>
        <div className="div-scroll">
          <Row>
            <div>
              <p className={styles.textpurple}>個人運動表現與比賽數據</p>

              <span className={styles.textorange}>
                若以下資料有不便回答者 可填入N
              </span>
            </div>
            <LabelShow configText={LabelSprint} />
            <TextInput
              configText={Split10Yard}
              handleFunc={handleInputChange}
              values={values}
              error={errors}
            />
            <TextInput
              configText={Split60Yard}
              handleFunc={handleInputChange}
              values={values}
              error={errors}
            />
            <LabelShow configText={LabelPitching} />
            <TextInput
              configText={ThrowingSpeed}
              handleFunc={handleInputChange}
              values={values}
              error={errors}
            />
            <TextInput
              configText={BlockingSpeed}
              handleFunc={handleInputChange}
              values={values}
              error={errors}
            />

            <TextInput2
              configText={EraEr}
              handleFunc={handleInputChange}
              values={values}
              error={errors}
            />
            <TextInput2
              configText={GBhr}
              handleFunc={handleInputChange}
              values={values}
              error={errors}
            />
            <TextInput2
              configText={IpHb}
              handleFunc={handleInputChange}
              values={values}
              error={errors}
            />
            <TextInput2
              configText={GBhr}
              handleFunc={handleInputChange}
              values={values}
              error={errors}
            />
            <TextInput2
              configText={GBhr}
              handleFunc={handleInputChange}
              values={values}
              error={errors}
            />
            <LabelShow configText={LabelHitting} />
            <TextInput2
              configText={EvAb}
              handleFunc={handleInputChange}
              values={values}
              error={errors}
            />
            <TextInput2
              configText={Avg2B}
              handleFunc={handleInputChange}
              values={values}
              error={errors}
            />
            <TextInput2
              configText={Ops3B}
              handleFunc={handleInputChange}
              values={values}
              error={errors}
            />
            <TextInput2
              configText={GHR}
              handleFunc={handleInputChange}
              values={values}
              error={errors}
            />
            <TextInput2
              configText={RK}
              handleFunc={handleInputChange}
              values={values}
              error={errors}
            />
            <TextInput2
              configText={HBBB}
              handleFunc={handleInputChange}
              values={values}
              error={errors}
            />
            <TextInput
              configText={LastestGameName}
              handleFunc={handleInputChange}
              values={values}
              error={errors}
            />
            <DateInput
              configText={LastestGameDate}
              handleFunc={handleDateChange}
              values={values}
              error={errors}
            />
            <div>
              <p className={styles.textpurple}>
                最近一場比賽成績
                <br />
                <span>Most recent game statistics</span>
              </p>
            </div>
            <Col lg="6">
              <Col lg="12">
                <p className={styles.textorange}>
                  <span>投球成績</span>
                  <br />
                  <span>Pitching Performance</span>
                </p>
                <Col lg="12">
                  <TextInput2
                    configText={EraEr}
                    handleFunc={handleInputChange}
                    values={values}
                    error={errors}
                  />
                  <TextInput2
                    configText={EraEr}
                    handleFunc={handleInputChange}
                    values={values}
                    error={errors}
                  />
                </Col>
              </Col>
            </Col>
          </Row>
          <Row>
            <Col lg="12">
              <TextInput2
                configText={EraEr}
                handleFunc={handleInputChange}
                values={values}
                error={errors}
              />
            </Col>
          </Row>
        </div>
      </div>
    </Container>
  );
};

export default BaseballPerformance;
