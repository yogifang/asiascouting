import { Form, Row, Col } from 'react-bootstrap';
import styles from '../styles/Event.module.css';
import Select from 'react-select';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const optionsSeasons = [
  { value: 'Indoor', label: '室內' },
  { value: 'Outdoor', label: '室外' },
];

const optionsAllItems = [
  {
    label: '田賽',
    options: [
      { value: 'High Jump', label: '跳高', unit: 'cm' },
      { value: 'Pole Vault', label: '撐竿跳高', unit: 'cm' },
      { value: 'Long Jump', label: '跳遠', unit: 'cm' },
      { value: 'Triple jump', label: '三級跳', unit: 'cm' },
      { value: 'Shot put ', label: '鉛球', unit: 'cm' },
      { value: 'Discus', label: '鐵餅', unit: 'cm' },
      { value: 'Hammer', label: '鏈鎚', unit: 'cm' },
      { value: 'Javelin', label: '標槍', unit: 'cm' },
    ],
  },
  {
    label: '徑賽',
    options: [
      { value: '100M', label: '100M賽跑', unit: 'second' },
      { value: '200M', label: '200M賽跑', unit: 'second' },
      { value: '400M', label: '400M賽跑', unit: 'second' },
      { value: '800M', label: '800M賽跑', unit: 'second' },
      { value: '1500M', label: '1500M賽跑', unit: 'second' },
      { value: '100M Hurdles(female)', label: '女子百米跨欄', unit: 'second' },
      { value: '110M Hurdles', label: '110M跨欄', unit: 'second' },
      { value: '400M Hurdles', label: '400M跨欄', unit: 'second' },
      { value: '3000M Steeplechase ', label: '3000M障礙賽', unit: 'second' },
    ],
  },
  {
    label: '馬拉松',
    options: [
      { value: 'Half Marathon', label: '半馬拉松', unit: 'second' },
      { value: 'Marathon', label: '馬拉松', unit: 'second' },
      { value: 'Ultramarathon', label: '超級馬拉松', unit: 'second' },
    ],
  },
  {
    label: '全能',
    options: [
      { value: 'Heptathlon（Female', label: '女子七項', unit: 'points' },
      { value: 'Decathlon （Male', label: '男子十項', unit: 'points' },
    ],
  },
  {
    label: '競走',
    options: [
      { value: '20KM walk', label: '20公里競走', unit: 'second' },
      { value: '50KM walk', label: '50公里競走', unit: 'second' },
    ],
  },
];

const optionsFieldItems = [
  { value: 'High Jump', label: '跳高', unit: 'cm' },
  { value: 'Pole Vault', label: '撐竿跳高', unit: 'cm' },
  { value: 'Long Jump', label: '跳遠', unit: 'cm' },
  { value: 'Triple jump', label: '三級跳', unit: 'cm' },
  { value: 'Shot put ', label: '鉛球', unit: 'cm' },
  { value: 'Discus', label: '鐵餅', unit: 'cm' },
  { value: 'Hammer', label: '鏈鎚', unit: 'cm' },
  { value: 'Javelin', label: '標槍', unit: 'cm' },
];

const optionsTrackItems = [
  { value: '100M', label: '100M賽跑', unit: 'second' },
  { value: '200M', label: '200M賽跑', unit: 'second' },
  { value: '400M', label: '400M賽跑', unit: 'second' },
  { value: '800M', label: '800M賽跑', unit: 'second' },
  { value: '1500M', label: '1500M賽跑', unit: 'second' },
  { value: '100M Hurdles(female)', label: '女子百米跨欄', unit: 'second' },
  { value: '110M Hurdles', label: '110M跨欄', unit: 'second' },
  { value: '400M Hurdles', label: '400M跨欄', unit: 'second' },
  { value: '3000M Steeplechase ', label: '3000M障礙賽', unit: 'second' },
];

const optionsAllRoundItems = [
  { value: 'Heptathlon（Female', label: '女子七項', unit: 'points' },
  { value: 'Decathlon （Male', label: '男子十項', unit: 'points' },
];

const optionMarathonItems = [
  { value: 'Half Marathon', label: '半馬拉松', unit: 'second' },
  { value: 'Marathon', label: '馬拉松', unit: 'second' },
  { value: 'Ultramarathon', label: '超級馬拉松', unit: 'second' },
];

const optionsWalkItems = [
  { value: '20KM walk', label: '20公里競走', unit: 'second' },
  { value: '50KM walk', label: '50公里競走', unit: 'second' },
];

const EventInput = (props) => {
  //  const [selItems, setSelItems] = useState(optionsFieldItems);
  //  console.log(props.values);
  // console.log(props.values[props.configText.name]);
  // console.log(props.type);
  const athleticsType = props.type.value;
  const scoreType = props.configText.scoreType;
  const [selItem, setSelItem] = useState(props.configText.item);
  const [selSeason, setSelSeason] = useState(props.configText.season);
  const [score1, setScore1] = useState(props.configText.score1);
  const [score2, setScore2] = useState(props.configText.score2);
  const [date1, setDate1] = useState(props.configText.date1);
  const [date2, setDate2] = useState(props.configText.date2);

  const customStyles = {
    control: (base) => ({
      ...base,
      width: '100%' ,
      
      height: 32,
      minHeight: 32,
    }),
    dropdownIndicator: (base) => ({
      ...base,
     
    }),
    container: (base) => ({
      ...base,
      marginleft:'0',
    }),
    groupHeading: (base) => ({
      ...base,
      fontStyle : 'italic' ,
      color : 'blue' ,
      padding: 4,
    }) ,
    singleValue: (base) =>({
      ...base ,
      height: 20,
      paddingleft: 0 ,
      minHeight: 20,
    }) ,
    option: (base) =>({
      ...base ,
      height: 20,
      minHeight: 20,
      padding: 2,
    }) ,
  };

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
        selItems = optionsAllRoundItems;
        break;
      case 'Marathon':
        selItems = optionMarathonItems;
        break;
      case 'Walk':
        selItems = optionsWalkItems;
        break;
      default:
        break;
    }
  }

  optionsItems();

  const handleSelectItem = (level) => {
    console.log(level);
  };
  const handleSelectSeason = (level) => {
    console.log(level);
    setSelSeason(level);
  };

  const handleLocalChange = (level) => {
    // console.log('----------Select');
    // console.log(level);
    props.handleFunc(level, props.configText.name);
  };

  return (
    <>
      <Row>
        <Col lg='2'>
          <Select
            placeholder='選取比賽項目'
            className={styles.eventselect}
            name={props.configText.name}
            autosize={true}
            value={selItem}
            onChange={handleSelectItem}
            id={props.configText.name}
            options={optionsAllItems}
            styles={customStyles}
          />
        </Col>

        <Col lg='2'>
          <Select
            placeholder='室內/戶外'
            className={styles.eventselect}
            name={props.configText.name}
            autosize={true}
            value={selSeason}
            onChange={handleSelectSeason}
            id={props.configText.name}
            options={optionsSeasons}
            styles={customStyles}
          />
        </Col>

        <Col lg='1'>
          <Form.Control size='sm' type='text' placeholder='Min' />
        </Col>
        <Col lg='1'>
          <Form.Control size='sm' type='text' placeholder='Sec' />
        </Col>
        <Col lg='1'>
          <Form.Control size='sm' type='text' placeholder='Hun' />
        </Col>
        <Col lg='1'>
          <DatePicker
            className={styles.datepicker}
            onChange={handleLocalChange}
            scrollableYearDropdown
            showYearDropdown
          />
        </Col>
        <Col lg='1'>
          <Form.Control size='sm' type='text' placeholder='Min' />
        </Col>
        <Col lg='1'>
          <Form.Control size='sm' type='text' placeholder='Sec' />
        </Col>
        <Col lg='1'>
          <Form.Control size='sm' type='text' placeholder='Hun' />
        </Col>
        <Col lg='1'>
          <DatePicker
            className={styles.datepicker}
            onChange={handleLocalChange}
            scrollableYearDropdown
            showYearDropdown
          />
        </Col>
      </Row>
    </>
  );
};

export default EventInput;
