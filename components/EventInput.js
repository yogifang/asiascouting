import { Form, Row, Col, InputGroup } from 'react-bootstrap';
import styles from '../styles/Event.module.css';
import Select from 'react-select';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';

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

const initBestEvent = {
  item: '',
  season: '',
  score1: {
    min: 0,
    sec: 0,
    hud: 0,
    points: 0,
    cm: 0,
  },
  date1: Date(Date.now()),
  score2: {
    min: 0,
    sec: 0,
    hud: 0,
    points: 0,
    cm: 0,
  },
  date2: Date(Date.now()),
};


const EventInput = (props) => {
  const [selItems, setSelItems] = useState(props.values.item);
  const [selSeason, setSelSeason] = useState(optionsSeasons[0]);

  const [date1, setDate1] = useState(null)
  const [date2, setDate2] = useState(null)

  const values = props.values;
  let selItem = values.item;
  const eventName = props.name;

  let calcValue = values;
  // console.log(props.values);

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
    //  console.log(level);
    setSelItems(level);
    calcValue.item = level;
    handleLocalChange();
  };
  const handleSelectSeason = (level) => {
    // console.log(level);
    setSelSeason(level);
    calcValue.season = level;
    handleLocalChange();
  };
  const handleDate1Change = (date) => {
    setDate1(date);
    calcValue.date1 = date1;
    handleLocalChange();
  };

  const handleDate2Change = (date) => {
    setDate2(date);
    calcValue.date2 = date2;
    handleLocalChange();
  };


  const handleNumberChange = (event) => {
    const num = parseInt(event.target.value);
    console.log(event.target.name);

    switch (event.target.name) {
      case 'Min1':
        calcValue.score1.min = num;
        calcValue.score1.points = null;
        calcValue.score1.cm = null;
        break;
      case 'Min2':
        calcValue.score2.min = num;
        calcValue.score2.points = null;
        calcValue.score2.cm = null;
        break;
      case 'Sec1':
        calcValue.score1.sec = num;
        calcValue.score1.points = null;
        calcValue.score1.cm = null;
        break;
      case 'Sec2':
        calcValue.score2.sec = num;
        calcValue.score2.points = null;
        calcValue.score2.cm = null;
        break;
      case 'Hud1':
        calcValue.score1.hud = num;
        calcValue.score1.points = null;
        calcValue.score1.cm = null;
        break;
      case 'Hud2':
        calcValue.score2.hud = num;
        calcValue.score2.points = null;
        calcValue.score2.cm = null;
        break;
      case 'CM1':
        calcValue.score1.cm = num;
        calcValue.score1.points = null;
        calcValue.score1.min = null;
        calcValue.score1.sec = null;
        calcValue.score1.hud = null;
        break;
      case 'Points1':
        calcValue.score1.points = num;
        calcValue.score1.cm = null;
        calcValue.score1.min = null;
        calcValue.score1.sec = null;
        calcValue.score1.hud = null;
        break;
      case 'CM2':
        calcValue.score2.cm = num;
        calcValue.score2.points = null;
        calcValue.score2.min = null;
        calcValue.score2.sec = null;
        calcValue.score2.hud = null;
        break;
      case 'Points2':
        calcValue.score2.points = num;
        calcValue.score2.cm = null;
        calcValue.score2.min = null;
        calcValue.score2.sec = null;
        calcValue.score2.hud = null;
        break;
      default:
        break;
    }

    handleLocalChange();
  };

  const handleLocalChange = () => {

    props.handleFunc(eventName, calcValue);
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
                name='item'
                autosize={true}
                value={selItems}
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
                name='season'
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
            {selItems.unit === 'second' ? (
              <>
                <div className={styles.colRightMain}>
                  <Form.Control name='Min1' size='sm' type='number' placeholder='Min' defaultValue={calcValue.score1.min} onChange={handleNumberChange} />
                  <Form.Label className={styles.colRightSub}>分</Form.Label>
                </div>

                <div className={styles.colRightMain}>
                  <Form.Control name='Sec1' size='sm' type='number' placeholder='Sec' defaultValue={calcValue.score1.sec} onChange={handleNumberChange} />
                  <Form.Label className={styles.colRightSub}>秒</Form.Label>
                </div>
                <div className={styles.colRightMain}>
                  <Form.Control name='Hud1' size='sm' type='number' placeholder='Hun' defaultValue={calcValue.score1.hud} onChange={handleNumberChange} />
                  <Form.Label className={styles.colRightSub}>百分之一秒</Form.Label>
                </div>
              </>
            ) : null}
            {selItems.unit === 'cm' ? (
              <>
                <div className={styles.colRightMain1}>
                  <Form.Control name='CM1' size='sm' type='number' placeholder='cm' defaultValue={calcValue.score1.cm} onChange={handleNumberChange} />
                  <Form.Label className={styles.colRightSub}>公分</Form.Label>
                </div>

              </>
            ) : null}
            {selItems.unit === 'points' ? (
              <>
                <div className={styles.colRightMain1}>
                  <Form.Control name='Points1' size='sm' type='number' placeholder='points' defaultValue={calcValue.score1.points} onChange={handleNumberChange} />
                  <Form.Label className={styles.colRightSub}>分數</Form.Label>
                </div>

              </>
            ) : null}
            <span>
              <div className={styles.colRightMain1}>
                <DatePicker
                  id={props.name + 'date1'}
                  className={styles.datepicker}
                  onChange={(date) => handleDate1Change(date)}
                  value={date1}
                  scrollableYearDropdown
                  showYearDropdown
                  name='date1'
                  selected={Date.parse(date1)}
                  dateFormatCalendar='MMMM'
                />
                <Form.Label className={styles.colRightSub}>日期</Form.Label>
              </div>

            </span>
          </InputGroup>
        </Col>

        <Col lg='4'>
          <InputGroup className='mb-3'>
            {selItems.unit === 'second' ? (
              <>
                <div className={styles.colRightMain}>
                  <Form.Control name='Min2' size='sm' type='number' placeholder='Min' defaultValue={calcValue.score1.min} onChange={handleNumberChange} />
                  <Form.Label className={styles.colRightSub}>分</Form.Label>
                </div>

                <div className={styles.colRightMain}>
                  <Form.Control name='Sec2' size='sm' type='number' placeholder='Sec' defaultValue={calcValue.score1.sec} onChange={handleNumberChange} />
                  <Form.Label className={styles.colRightSub}>秒</Form.Label>
                </div>
                <div className={styles.colRightMain}>
                  <Form.Control name='Hud2' size='sm' type='number' placeholder='Hun' defaultValue={calcValue.score1.hud} onChange={handleNumberChange} />
                  <Form.Label className={styles.colRightSub}>百分之一秒</Form.Label>
                </div>
              </>
            ) : null}
            {selItems.unit === 'cm' ? (
              <>
                <div className={styles.colRightMain1}>
                  <Form.Control name='CM2' size='sm' type='number' placeholder='cm' defaultValue={calcValue.score1.cm} onChange={handleNumberChange} />
                  <Form.Label className={styles.colRightSub}>公分</Form.Label>
                </div>

              </>
            ) : null}
            {selItems.unit === 'points' ? (
              <>
                <div className={styles.colRightMain1}>
                  <Form.Control name='Points2' size='sm' type='number' placeholder='points' defaultValue={calcValue.score1.points} onChange={handleNumberChange} />
                  <Form.Label className={styles.colRightSub}>分數</Form.Label>
                </div>

              </>
            ) : null}
            <span>
              <div className={styles.colRightMain1}>
                <DatePicker
                  id={props.name + 'date2'}
                  className={styles.datepicker}
                  onChange={(date) => handleDate2Change(date)}
                  value={date2}
                  scrollableYearDropdown
                  showYearDropdown
                  name='date2'
                  selected={Date.parse(date2)}
                  dateFormatCalendar='MMMM'
                />
                <Form.Label className={styles.colRightSub}>日期</Form.Label>
              </div>

            </span>
          </InputGroup>
        </Col>

      </Row>
    </>
  );
};

export default EventInput;
