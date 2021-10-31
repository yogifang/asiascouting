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



const UtrField = {
    type: "number",
    main: "UTR",
    sub: "Universal Tennis Rating",
    name: "UTR",
};


const RankSingleITF = {
    type: "number",
    main: "ITF排名(單打)",
    sub: "ITF Ranking (Singles)",
    name: "rankSingleITF",
}

const RankDoubleITF = {
    type: "number",
    main: "ITF排名(雙打)",
    sub: "ITF Ranking (Doubles)",
    name: "rankDoubleITF",
}


const RankSingle = {
    type: "number",
    main: "全國排名(單打)",
    sub: "ITF Ranking (Singles)",
    name: "rankSingle",
}

const RankDouble = {
    type: "number",
    main: "全國排名(雙打)",
    sub: "ITF Ranking (Doubles)",
    name: "rankDouble",
}


const LinkVideo1 = {
    type: "text",
    main: "招募短片連結1",
    sub: "Tennis Video Link #1",
    name: "linkVideo1",
};
const LinkVideo2 = {
    type: "text",
    main: "招募短片連結2",
    sub: "Tennis Video Link #2",
    name: "linkVideo2",
};

const initialFValues = {
    _id: "",
    member: "",
    UTR: 0,
    rankSingleITF: 0,
    rankDoubleITF: 0,
    rankSingle: 0,
    rankDouble: 0,
    linkVideo1: "",
    linkVideo2: "",
    bFilled: Boolean,

};

const Tennis = () => {
    const { member, setMember } = useContext(Context);


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
            case "UTR":
            case "rankSingleITF":
            case "rankDoubleITF":
            case "rankSingle":
            case "rankDouble":
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
        const getTennis = async () => {
            try {
                const url = process.env.HOST_URI + `api/tennisPerformance/${member}`;
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
                setValues(nValues)
            } catch (error) {
                console.log(error);
            }
        };

        getTennis();
        //values.member = recMember.email ;
    }, []); // eslint-disable-line react-hooks/exhaustive-deps




    const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
        useForm(initialFValues, true, validate);

    const handleClick = async (e) => {
        console.log(values)
        if (values._id === "" || values._id === undefined) {
            const url = process.env.HOST_URI + `api/tennisPerformance/`;
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
            const url = process.env.HOST_URI + `api/tennisPerformance/${member}`;
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
                        <p className={styles.textpurple}>網球成績及運動表現</p>
                        <p className={styles.textorange}>若以下資料有不便回答者 可填入N</p>

                        <TextInput configText={UtrField} handleFunc={handleInputChange} values={values} error={errors} />
                        <TextInput configText={RankSingleITF} handleFunc={handleInputChange} values={values} error={errors} />
                        <TextInput configText={RankDoubleITF} handleFunc={handleInputChange} values={values} error={errors} />
                        <TextInput configText={RankSingle} handleFunc={handleInputChange} values={values} error={errors} />
                        <TextInput configText={RankDouble} handleFunc={handleInputChange} values={values} error={errors} />
                        <TextInput configText={LinkVideo1} handleFunc={handleInputChange} values={values} error={errors} />
                        <TextInput configText={LinkVideo2} handleFunc={handleInputChange} values={values} error={errors} />
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

export default Tennis;
