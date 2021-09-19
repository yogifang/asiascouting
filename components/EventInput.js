import { Form, Col } from "react-bootstrap";
import styles from "../styles/Contant.module.css";
import Select from "react-select";
import { useState } from "react";
const optionsSeasons = [
    { value: "Indoor", label: "室內" },
    { value: "Outdoor", label: "室外" },
]
const optionsFieldItems = [
    { value: "High Jump", label: "跳高", unit: 'cm' },
    { value: "Pole Vault", label: "撐竿跳高", unit: 'cm' },
    { value: "Long Jump", label: "跳遠", unit: 'cm' },
    { value: "Triple jump", label: "三級跳", unit: 'cm' },
    { value: "Shot put ", label: "鉛球", unit: 'cm' },
    { value: "Discus", label: "鐵餅", unit: 'cm' },
    { value: "Hammer", label: "鏈鎚", unit: 'cm' },
    { value: "Javelin", label: "標槍", unit: 'cm' },

]

const optionsTrackItemsMale = [
    { value: "100M", label: "100M賽跑", unit: 'second' },
    { value: "200M", label: "200M賽跑", unit: 'second' },
    { value: "400M", label: "400M賽跑", unit: 'second' },
    { value: "800M", label: "800M賽跑", unit: 'second' },
    { value: "1500M", label: "1500M賽跑", unit: 'second' },
    { value: "110M Hurdles", label: "110M跨欄", unit: 'second' },
    { value: "400M Hurdles", label: "400M跨欄", unit: 'second' },
    { value: "3000M Steeplechase ", label: "3000M障礙賽", unit: 'second' },

]
const optionsTrackItemsFemale = [
    { value: "100M", label: "100M賽跑", unit: 'second' },
    { value: "200M", label: "200M賽跑", unit: 'second' },
    { value: "400M", label: "400M賽跑", unit: 'second' },
    { value: "800M", label: "800M賽跑", unit: 'second' },
    { value: "1500M", label: "1500M賽跑", unit: 'second' },
    { value: "100M Hurdles", label: "100M跨欄", unit: 'second' },
    { value: "400M Hurdles", label: "400M跨欄", unit: 'second' },
    { value: "3000M Steeplechase ", label: "3000M障礙賽", unit: 'second' },

]

const EventInput = (props) => {

    //  const [selItems, setSelItems] = useState(optionsFieldItems);
    //  console.log(props.values);
    // console.log(props.values[props.configText.name]);
    // console.log(props.type);
    const athleticsType = props.type.value;
    let tempEvent;
    let selItems = [];
    console.log(athleticsType);

    function optionsItems() {
        console.log(athleticsType);
        switch (athleticsType) {
            case 'Field':
                selItems = optionsFieldItems;
                break;
            case 'Track':
                selItems = optionsTrackItemsMale;
                break;
            case 'All-round':

                break;
            case 'Marathon':

            case 'Walk':

                break;
            default:

                break;
        }
    };

    optionsItems();
    const handleLocalChange = (level) => {
        // console.log('----------Select');
        // console.log(level);
        props.handleFunc(level, props.configText.name);
    };

    return (
        <>
            <Col lg="5">
                <Form.Label
                    htmlFor={props.configText.name}
                    className={styles.colLeftMain}
                >
                    {props.configText.main}
                    <p className={styles.colLeftSub}>{props.configText.sub}</p>
                </Form.Label>{" "}
            </Col>
            <Col lg="7">
                <Select
                    placeholder="Select Level"
                    className={styles.rightSelect}
                    name={props.configText.name}
                    autosize={true}
                    value={props.values}
                    onChange={handleLocalChange}
                    id={props.configText.name}
                    options={selItems}
                />
                <Form.Label className={styles.colRightSub}>
                    {props.error[props.configText.name]}
                </Form.Label>{" "}
            </Col>
        </>
    );
};


export default EventInput;
