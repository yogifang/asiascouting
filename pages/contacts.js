import styles from "../styles/Contant.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import { useForm } from "../components/useForm";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import { Context } from "../components/stores";
import { useState, useMemo, useEffect, useReducer, useContext } from "react";
import countryList from "../components/country-list";
import TextInput from "../components/TextInput";
import DateInput from "../components/DateInput";
import SelectInput from "../components/SelectInput";

const initialFValues = {
  _id: "",
  email: "",
  birthday: Date.now(),
  school: "",
  liveCity: "",
  Nationality: "",
  links: "",
  member: "",
  bFilled: false,
};

const Email = {
  type: "text",
  main: "電子郵件",
  sub: "Contact Email",
  name: "email",
};

const Birthday = {
  format: "MMMM",
  main: "出生年月日",
  sub: "Birthdate",
  name: "birthday",
};

const School = {
  type: "text",
  main: "就讀學校",
  sub: "School",
  name: "school",
};

const LiveCity = {
  type: "text",
  main: "居住城市",
  sub: "What city do you live in?",
  name: "liveCity",
};

const Links = {
  type: "text",
  main: "其他資料或個人社群連結",
  sub: "Other showcasing links",
  name: "links",
};

const Contacts = () => {
  const { member, setMember } = useContext(Context);
  const [birthday, setBirthday] = useState(Date.now);
  const listOption = new countryList();
  const optionsCountry = useMemo(() => listOption.getData(), []); // eslint-disable-line react-hooks/exhaustive-deps
  const [country, setCountry] = useState(optionsCountry[0]);
  const { memberEmail } = useContext(Context);
  const { setValueTabs } = useContext(Context);
  const selCountryChangeHandler = (country) => {
    console.log(country);
    console.log(optionsCountry[30]);
    setCountry(country);
    values.Nationality = country.label;
  };

  const Nationality = {
    options: optionsCountry,
    main: "*國籍",
    sub: "*Nationality",
    name: "Nationality",
  };

  const findIndexByValue = (options, label) => {
    let index = options.findIndex((options) => options.label === label);
    console.log(index);
    if (index === -1) index = 0;
    return index;
    //console.log(options[4].label);
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("email" in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not valid.";

    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  useEffect(() => {
    const getContacts = async () => {
      try {
        const url = process.env.HOST_URI + `api/contacts/${member}`;
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
            case "birthday":
              nValues[field] = Date.parse(Data.data[field]);
              break;
            default:
              nValues[field] = Data.data[field];
              break;
          }
        }

        setValues(nValues);
        const index = findIndexByValue(optionsCountry, nValues.Nationality);
        console.log(index);

        setCountry(optionsCountry[index]);
        setBirthday(Date.parse(nValues.birthday));
        console.log(nValues);
        console.log(values);
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
    //values.member = recMember.email ;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDateChange = (date, name) => {
    console.log("------------call back");
    //  console.log(name);
    console.log(date);
    switch (name) {
      case "birthday":
        setBirthday(Date.parse(date));
        values.birthday = Date.parse(date);
        break;

      default:
        break;
    }
  };
  const handleSelectChange = (level, name) => {
    //   console.log("----select back");
    //   console.log(level);
    switch (name) {
      case "Nationality":
        setCountry(level);
        values.Nationality = level.value;
        break;

      default:
        break;
    }
  };

  const handleClick = async (e) => {
    const url = process.env.HOST_URI + `api/contacts/${member}`;
    values.member = member;
    console.log(values);
    const result = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await result.json();
    console.log(data);
    alert("Data is Saved!!");
  };
  return (
    <Container className={styles.container}>
      <Navbar />
      <div className={styles.contant}>
        <Row>
          <TextInput
            configText={Email}
            handleFunc={handleInputChange}
            values={values}
            error={errors}
          />
          <DateInput
            configText={Birthday}
            handleFunc={handleDateChange}
            values={values}
            error={errors}
          />
          <TextInput
            configText={School}
            handleFunc={handleInputChange}
            values={values}
            error={errors}
          />
          <TextInput
            configText={LiveCity}
            handleFunc={handleInputChange}
            values={values}
            error={errors}
          />
          <SelectInput
            configText={Nationality}
            handleFunc={handleSelectChange}
            values={country}
            error={errors}
          />
          <TextInput
            configText={Links}
            handleFunc={handleInputChange}
            values={values}
            error={errors}
          />
        </Row>
        <Row>
          <br></br>
          <Button
            justification="right"
            onClick={handleClick}
            variant="secondary"
            className={styles.btnAppNextSmall}
          ></Button>{" "}
        </Row>
      </div>
    </Container>
  );
};

export default Contacts;
