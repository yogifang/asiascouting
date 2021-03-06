import { Form, FormControl, Button, Row, Col } from "react-bootstrap";
import styles from "../styles/Contant.module.css";
import fetch from "isomorphic-unfetch";
import { useForm } from "../components/useForm";
import { useRouter } from "next/router";
import { useState, useEffect, useReducer, useContext } from "react";
import { Context } from "./stores";
import TextInput from "./TextInput";

const initialFValues = {
  email: "",
  password: "",
  isPrivacy: "",
};

const InputEmail = {
  type: "text",
  main: "請輸入您的聯絡信箱",
  sub: "Enter your email",
  name: "email",
};

const InputPassword = {
  type: "password",
  main: "輸入密碼",
  sub: "Enter password",
  name: "password",
};

const Login = () => {
  const router = useRouter();
  const { member, setMember, sportItem, setSportItem } = useContext(Context);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("email" in fieldValues) {
      if (temp.email !== "") {
        temp.email = /$^|.+@.+..+/.test(fieldValues.email)
          ? ""
          : "Email 格式錯誤.";
      } else {
        temp.email = "不得空白。";
      }
    }

    if ("password" in fieldValues)
      temp.password =
        fieldValues.password.length > 5 ? "" : "不得少於5個字元。";

    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const checkExistMember = async (
    member = values.email,
    password = values.password
  ) => {
    const params = member + `&` + password;
    const url = process.env.HOST_URI + `api/members/` + params;
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const record = await res.json();
      if (record.success === false) {
        alert("帳號不存在或密碼錯誤！！");
        return;
      }
      setMember(record.data.email);
      setSportItem(record.data.sportItem);
      router.push("/basicinfo");
    } catch (err) {
      alert("讀取錯誤！請檢查連線！");
      console.log(err);
      return;
    }
  };

  const handleClickSubmit = () => {
    checkExistMember(values.email, values.password);
  };

  return (
    <div className={styles.contant}>
      <Row>
        <TextInput
          configText={InputEmail}
          handleFunc={handleInputChange}
          values={values}
          error={errors}
        />
        <TextInput
          configText={InputPassword}
          handleFunc={handleInputChange}
          values={values}
          error={errors}
        />
      </Row>
      <Row>
        <br></br>
        <Button
          justification="right"
          variant="secondary"
          className={styles.btnAppLoginSmall}
          onClick={handleClickSubmit}
        ></Button>{" "}
      </Row>
    </div>
  );
};

export default Login;
