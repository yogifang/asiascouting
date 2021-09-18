import { Form, Container, Button, Row, Col } from "react-bootstrap";
import styles from "../styles/Contant.module.css";
import TextInput from "../components/TextInput";
import SelectInput from "../components/SelectInput";
import { useForm } from '../components/useForm';
import { useRouter } from "next/router";
import { Context } from "../components/stores";
import { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import OutputTextBig from "../components/OutputTextBig";
const initialFValues = {
    _id: "",
    email: "",
    password: "Google$Auth",
    passwordConfirm: "Google$Auth",
    passport: false,
    sportItem: "",
    isPrivacy: "",
    filled: false,
};

const optionsSportItem = [
    { value: "baseball", label: "棒球" },
    { value: "shooting", label: "射擊" },
];

const InputEmail = {
    type: "text",
    main: "請輸入您的聯絡信箱",
    sub: "Enter your email",
    name: "email",
};


const SelectSport = {
    options: optionsSportItem,
    main: "*運動項目",
    sub: "*Sport items",
    name: "sportItem",
};

const CreateSocial = () => {

    const router = useRouter();
    const { member, setMember, sportItem, setSportItem } = useContext(Context);

    const [selItem, setSelItem] = useState(optionsSportItem[0]);

    console.log('----------vreate ');
    console.log(member);

    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        const keyname = Object.getOwnPropertyNames(fieldValues);

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

        if ("passwordConfirm" in fieldValues)
            temp.passwordConfirm =
                values.password === fieldValues.passwordConfirm ? "" : "密碼必需相同。";

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
            console.log(record);
            if (record.success === false) {
                alert("帳號不存在或密碼錯誤！！");
                return;
            }
        } catch (err) {
            alert("讀取錯誤！請檢查連線！");
            console.log(err);
            return;
        }
    };
    const setAccountEmail = async (
        member = values.email,
        password = values.password
    ) => {
        const params = member + `&` + password;
        let url = process.env.HOST_URI + `api/members/` + params;
        console.log(url);
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const record = await res.json();
            if (res.status < 400) {
                alert("帳號已存在！！");
                return;
            }
        } catch (error) {
            if (error.Status === 404) alert("GET Error!!" + error);
        }
        url = process.env.HOST_URI + `api/members/`;
        values.member = member;
        // console.log(values);
        try {
            const result = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });
            const data = await result.json();
            alert("帳號已建立!!");
            setMember(values.email);
            setSportItem(values.sportItem);
            router.push("/basicinfo");
        } catch (error) {
            if (error.Status === 404) alert("GET Error!!" + error);
        }
    };

    const handleSelectChange = (level, name) => {
        // console.log('----select back');
        switch (name) {
            case "sportItem":
                setSelItem(level);
                values.sportItem = level;
                break;

            default:
                break;
        }
    };

    const handleClick = (e) => {
        e.preventDefault();
        console.log("The link was clicked.");
        console.log(values);
        console.log("errors..." + errors);
        values.member = member;
        values.email = member;
        values.sportItem = selItem.value;
        if (
            (values.email === "") |
            (values.password === "") |
            (values.passport === "") |
            (values.isPrivacy === "") |
            (values.sportItem === "")
        ) {
            alert("資料必需完整！");
            return;
        }
        setAccountEmail(values.email, values.password);
    };

    return (
        <Container className={styles.container}>
            <Navbar />
            <div className={styles.contant}>
                <Row className={styles.sheettable}>
                    <Col lg="6">
                        <Form.Label htmlFor="user_email" className={styles.colLeftMain}>
                            * 您是否持有歐盟護照或居住在歐洲
                            <p className={styles.colLeftSub}>
                                * Are you an EU citizen or holding an EU citizenship ?
                            </p>
                        </Form.Label>
                    </Col>
                    <Col lg="6">
                        <label>
                            <input
                                name="passport"
                                type="radio"
                                onChange={handleInputChange}
                            />
                            <span> 是 </span> <span> YES </span>
                        </label>
                        <label>
                            <input
                                name="passport"
                                type="radio"
                                onChange={handleInputChange}
                            />
                            <span> 否 </span> <span> NO </span>
                        </label>
                    </Col>
                </Row>
                <Row className={styles.sheettable}>
                    <Col lg="6">
                        <Form.Label htmlFor="user_email" className={styles.colLeftMain}>
                            使用您的Google 帳號新建帳號
                            <p className={styles.colLeftSub}>
                                * Use your google account to create your account
                            </p>
                            <OutputTextBig className={styles.m0} cols="12" name="email" main="" value={member} />
                        </Form.Label>
                    </Col>
                </Row>
                <Row className={styles.sheettable}>
                    <SelectInput
                        configText={SelectSport}
                        handleFunc={handleSelectChange}
                        values={selItem}
                        error={errors}
                    />
                </Row>
                <Row>
                    <p className={styles.m0}>
                        * 本人已閱讀並同意願遵守
                        <a
                            href="https://www.findyourathlete.com/termsofuse"
                            target="_blank"
                            rel="noreferrer"
                        >
                            使用者條款
                        </a>
                        及
                        <a
                            href="https://www.findyourathlete.com/privacypolicy"
                            target="_blank"
                            rel="noreferrer"
                        >
                            隱私權政策
                        </a>
                        <br />
                        <span>
                            * By clicking Check box, you agree to our Terms and our Privacy
                            Policy.{" "}
                        </span>
                    </p>
                    <Form.Label className={styles.m0}>
                        <input
                            name="isPrivacy"
                            type="checkbox"
                            onChange={handleInputChange}
                        />{" "}
                        <span> 是 </span> <span> YES </span>{" "}
                    </Form.Label>
                    <br></br>
                    <Button
                        justification="right"
                        variant="secondary"
                        className={styles.btnAppLoginSmall}
                        onClick={handleClick}
                    ></Button>{" "}
                </Row>
            </div>
        </Container>
    );
};

export default CreateSocial;
