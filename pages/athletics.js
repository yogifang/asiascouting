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
import EventInput from "../components/EventInput";

const optionsGameLevel = [
    { value: "Olympics", label: "奧運" },
    { value: "Intercontinental", label: "奧運資格賽/世錦賽/世界盃/世大運" },
    { value: "Asian Games", label: "亞運/亞錦賽/亞洲盃" },
    { value: "Others", label: "其他" },
];

const optionsAthleticsTypes = [
    { value: "Field", label: "田賽" },
    { value: "Track", label: "徑賽" },
    { value: "All-round", label: "全能" },
    { value: "Marathon", label: "馬拉松" },
    { value: "Walk", label: "競走" },
]



const bestEvent1 = {
    name: 'bestevent1',

}

const bestEvent2 = {
    name: 'bestevent2',

}

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
const athleticsType = {
    options: optionsAthleticsTypes,
    main: "田徑類別",
    sub: "Track & Field Type",
    name: "athleticsType",
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


const eventData = {
    season: 'Outdoor',
    gameType: '',
    bestScore1: 0,
    bestDate1: new Date,
    bestLevel1: '',
}


const initialFValues = {
    _id: "",
    member: "",
    gender: '',
    athleticsType: "",
    bestevent1: {},
    bestevent2: {},
    bestevent3: {},
    bestevent4: {},
    bestevent5: {},
    bestevent6: {},

    bFilled: false,
};

const Shooting = () => {
    const { member, setMember } = useContext(Context);
    const [latestGameDate, setLatestGameDate] = useState(new Date());
    const [selAthleticsType, setSelAthleticsType] = useState(optionsAthleticsTypes[0]);
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

    const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
        useForm(initialFValues, true, validate);

    useEffect(() => {

        //values.member = recMember.email ;
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleEventChange = (date, name) => {

    };

    const handleSelectChange = (level, name) => {
        //  console.log(name);
        //  console.log(level);
        switch (name) {
            case "athleticsType":
                setSelAthleticsType(level);
                values.athleticsType = level;
                break;

            default:
                break;
        }
    }


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
                        <p className={styles.textpurple}>田徑成績及運動表現</p>
                        <p className={styles.textorange}>若以下資料有不便回答者 可填入N</p>
                        <SelectInput
                            configText={athleticsType}
                            handleFunc={handleSelectChange}
                            values={selAthleticsType}
                            error={errors}
                        />
                    </Row>
                    <Row>

                        <EventInput
                            type={selAthleticsType}
                            configText={bestEvent1}
                            handleFunc={handleEventChange}
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
            </div>
        </Container>
    );
};

export default Shooting;
