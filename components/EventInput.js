import { Form, Row, Col, InputGroup } from 'react-bootstrap';
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
  // console.log(props.values);
  // console.log(props.values[props.configText.name]);
  // console.log(props.type);
  const [values, setValues] = useState(props.values);
  const [selItem, setSelItem] = useState(values.item);
  const [selSeason, setSelSeason] = useState(values.season);
  const [unit, setUnit] = useState('second');
  const [date1, setDate1] = useState(values.date1);
  const [date2, setDate2] = useState(values.date2);
  const [tempValue, setTempValue] = useState(props.values);
  let calcValue = tempValue;
  // console.log(tempValue);

  const customStyles = {
    control: (base) => ({
      ...base,
      width: '100%',

      height: 32,
      minHeight: 32,
    }),
    dropdownIndicator: (base) => ({
      ...base,
    }),
    container: (base) => ({
      ...base,
      marginleft: '0',
    }),
    groupHeading: (base) => ({
      ...base,
      fontStyle: 'italic',
      color: 'blue',
      padding: 4,
    }),
    singleValue: (base) => ({
      ...base,
      height: 20,
      paddingleft: 0,
      minHeight: 20,
    }),
    option: (base) => ({
      ...base,
      height: 20,
      minHeight: 20,
      padding: 2,
    }),
  };


  const handleSelectItem = (level) => {
    // console.log(level);
    setUnit(level.unit);
  };
  const handleSelectSeason = (level) => {
    // console.log(level);
    setSelSeason(level);
    console.log(selSeason);
  };
  const handleDate1Change = (date) => {
    setDate1(date)

  };
  const handleDate2Change = (date) => {
    setDate2(date)
  };
  const handleNumberChange = (event) => {
    const num = parseInt(event.target.value);
    //  console.log(event.target);
    switch (event.target.name) {
      case 'Min1':
        calcValue.score1.min = num;
        break;
      case 'Min2':
        calcValue.score2.min = num;
        break;
      case 'Sec1':
        calcValue.score1.sec = num;
        break;
      case 'Sec2':
        calcValue.score2.sec = num;
        break;
      case 'Hud1':
        calcValue.score1.hud = num;
        break;
      case 'Hud2':
        calcValue.score2.hud = num;
        break;
      case 'CM1':
        calcValue.score1.cm = num;
        break;
      case 'Points1':
        calcValue.score1.points = num;
        break;
      case 'CM2':
        calcValue.score2.cm = num;
        break;
      case 'Points2':
        calcValue.score2.points = num;
        break;
      default:
        break;
    }
    setTempValue(calcValue);
    // console.log(tempValue.score1.min);

  };

  const handleLocalChange = (level) => {
    // console.log('----------Select');
    // console.log(level);
    props.handleFunc(level, props.configText.name);
  };

  return (
    <>
      <Row>
        <Col lg='4'>
          <InputGroup className='mb-3' >
            <Col lg='6'>
              <Select
                id={props.name + 's1'}
                instanceId={props.name + 's1'}
                placeholder='選取比賽項目'
                className={styles.eventselect}
                name={props.name + 's1'}
                autosize={true}
                value={selItem.label}
                onChange={handleSelectItem}
                options={optionsAllItems}
                styles={customStyles}
              />
            </Col>
            <Col lg='6'>
              <Select
                id={props.name + 'season'}
                instanceId={props.name + 'season'}
                placeholder='室內/戶外'
                className={styles.eventselect}
                name={props.name + 'season'}
                autosize={true}
                value={selSeason}
                onChange={handleSelectSeason}
                options={optionsSeasons}
                styles={customStyles}
              />
            </Col>
          </InputGroup>
        </Col>

        <Col lg='4'>
          <InputGroup className='mb-3'>
            {unit === 'second' ? (
              <>
                <Form.Control name='Min1' size='sm' type='number' placeholder='Min' defaultValue={tempValue.score1.min} onChange={handleNumberChange} />
                <Form.Control name='Sec1' size='sm' type='number' placeholder='Sec' defaultValue={tempValue.score1.sec} onChange={handleNumberChange} />
                <Form.Control name='Hud1' size='sm' type='number' placeholder='Hun' defaultValue={tempValue.score1.hud} onChange={handleNumberChange} />
              </>
            ) : null}
            {unit === 'cm' ? (
              <>
                <Form.Control name='CM1' size='sm' type='number' placeholder='cm' defaultValue={tempValue.score1.cm} onChange={handleNumberChange} />
              </>
            ) : null}
            {unit === 'points' ? (
              <>
                <Form.Control name='Points1' size='sm' type='number' placeholder='points' defaultValue={tempValue.score1.points} onChange={handleNumberChange} />
              </>
            ) : null}
            <span>
              <DatePicker
                id={props.name + 'date1'}
                className={styles.datepicker}
                onChange={(date) => handleDate1Change(date)}
                value={date2}
                scrollableYearDropdown
                showYearDropdown
                name={props.name + 'date1'}
                selected={date1}
                dateFormatCalendar='MMMM'
              />
            </span>
          </InputGroup>
        </Col>

        <Col lg='4'>
          <InputGroup className='mb-3'>
            {unit === 'second' ? (
              <>
                <Form.Control name='Min1' size='sm' type='number' placeholder='Min' defaultValue={tempValue.score2.min} onChange={handleNumberChange} />
                <Form.Control name='Sec1' size='sm' type='number' placeholder='Sec' defaultValue={tempValue.score2.sec} onChange={handleNumberChange} />
                <Form.Control name='Hud1' size='sm' type='number' placeholder='Hun' defaultValue={tempValue.score2.hud} onChange={handleNumberChange} />
              </>
            ) : null}
            {unit === 'cm' ? (
              <>
                <Form.Control name='CM2' size='sm' type='number' placeholder='cm' defaultValue={tempValue.score2.cm} onChange={handleNumberChange} />
              </>
            ) : null}
            {unit === 'points' ? (
              <>
                <Form.Control name='Points2' size='sm' type='number' placeholder='points' defaultValue={tempValue.score2.points} onChange={handleNumberChange} />
              </>
            ) : null}
            <span>
              <DatePicker
                id={props.name + 'date2'}
                className={styles.datepicker}
                onChange={(date) => handleDate2Change(date)}
                value={date2}
                scrollableYearDropdown
                showYearDropdown
                name={props.name + 'date2'}
                selected={date2}
                dateFormatCalendar='MMMM'
              />
            </span>
          </InputGroup>
        </Col>
      </Row>
    </>
  );
};

export default EventInput;
