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
  item: { value: '', label: '', unit: 'cm' },
  season: { value: '', label: '' },
  score1: {
    min: 0,
    sec: 0,
    hud: 0,
    points: 0,
    cm: 0,
  },
  date1: Date.now(),
  score2: {
    min: 0,
    sec: 0,
    hud: 0,
    points: 0,
    cm: 0,
  },
  date2: Date.now(),
};



const EventInput = (props) => {
  // const values = (props.values === undefined) ? initBestEvent : props.values;
  
  const eventName = props.name;
  // console.log(eventName);
  let values ={};
  values.item = props.item ;
  values.season = props.season ;
  values.score1 = props.score1 ;
  values.date1 = props.date1 ;
  values.score2 = props.score2 ;
  values.date2 = props.date2 ;
 // console.log(eventName);
 // console.log(values);
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
   
    values.item = level;
    handleLocalChange();
  };
  const handleSelectSeason = (level) => {
    
    values.season = level;
    handleLocalChange();
  };
  const handleDate1Change = (date) => {
    //  setDate1(date);
    values.date1 = date;
    handleLocalChange();
  };

  const handleDate2Change = (date) => {
    //  setDate2(date);
    values.date2 = date;
    handleLocalChange();
  };


  const handleNumberChange = (event) => {
    const num = parseInt(event.target.value);
    
    const targetName = event.target.name.replace(eventName , '') ;
    console.log(targetName);
    switch (targetName) {
      case 'Min1':
        values.score1.min = num;
        values.score1.points = null;
        values.score1.cm = null;
        break;
      case 'Min2':
        values.score2.min = num;
        values.score2.points = null;
        values.score2.cm = null;
        break;
      case 'Sec1':
        values.score1.sec = num;
        values.score1.points = null;
        values.score1.cm = null;
        break;
      case 'Sec2':
        values.score2.sec = num;
        values.score2.points = null;
        values.score2.cm = null;
        break;
      case 'Hud1':
        values.score1.hud = num;
        values.score1.points = null;
        values.score1.cm = null;
        break;
      case 'Hud2':
        values.score2.hud = num;
        values.score2.points = null;
        values.score2.cm = null;
        break;
      case 'CM1':
        values.score1.cm = num;
        values.score1.points = null;
        values.score1.min = null;
        values.score1.sec = null;
        values.score1.hud = null;
        break;
      case 'Points1':
        values.score1.points = num;
        values.score1.cm = null;
        values.score1.min = null;
        values.score1.sec = null;
        values.score1.hud = null;
        break;
      case 'CM2':
        values.score2.cm = num;
        values.score2.points = null;
        values.score2.min = null;
        values.score2.sec = null;
        values.score2.hud = null;
        break;
      case 'Points2':
        values.score2.points = num;
        values.score2.cm = null;
        values.score2.min = null;
        values.score2.sec = null;
        values.score2.hud = null;
        break;
      default:
        break;
    }

    handleLocalChange();
  };

  const handleLocalChange = () => {

    props.handleFunc(eventName, values);
  };

  return (
    <>
      <Row>
        <Col lg='4'>
          <InputGroup className='mb-3' >
            <Col lg='6'>
              <Select
                id={eventName + 's1'}
                instanceId={eventName + 's1'}
                placeholder='選取比賽項目'
                className={styles.eventselect}
                name='item'
                autosize={true}
                value={values.item}
                onChange={handleSelectItem}
                options={optionsAllItems}
                styles={customStyles}
              />
            </Col>
            <Col lg='6'>
              <Select
                id={eventName + 'season'}
                instanceId={eventName + 'season'}
                placeholder='室內/戶外'
                className={styles.eventselect}
                name='season'
                autosize={true}
                value={values.season}
                onChange={handleSelectSeason}
                options={optionsSeasons}
                styles={customStyles}
              />
            </Col>
          </InputGroup>
        </Col>

        <Col lg='4'>
          <InputGroup className='mb-3'>
            {values.item.unit === 'second' ? (
              <>
                <div className={styles.colRightMain}>
                  <Form.Control  name={eventName + 'Min1'} size='sm' type='number' placeholder='Min' value={values.score1.min} onChange={handleNumberChange} />
                  <Form.Label className={styles.colRightSub}>分</Form.Label>
                </div>

                <div className={styles.colRightMain}>
                  <Form.Control name={eventName + 'Sec1'} size='sm' type='number' placeholder='Sec' value={values.score1.sec} onChange={handleNumberChange} />
                  <Form.Label className={styles.colRightSub}>秒</Form.Label>
                </div>
                <div className={styles.colRightMain}>
                  <Form.Control name={eventName + 'Hud1'} size='sm' type='number' placeholder='Hun' value={values.score1.hud} onChange={handleNumberChange} />
                  <Form.Label className={styles.colRightSub}>百分之一秒</Form.Label>
                </div>
              </>
            ) : null}
            {values.item.unit === 'cm' ? (
              <>
                <div className={styles.colRightMain1}>
                  <Form.Control name={eventName + 'CM1'} size='sm' type='number' placeholder='cm' value={values.score1.cm} onChange={handleNumberChange} />
                  <Form.Label className={styles.colRightSub}>公分</Form.Label>
                </div>

              </>
            ) : null}
            {values.item.unit === 'points' ? (
              <>
                <div className={styles.colRightMain1}>
                  <Form.Control name={eventName +'Points1'} size='sm' type='number' placeholder='points' value={values.score1.points} onChange={handleNumberChange} />
                  <Form.Label className={styles.colRightSub}>分數</Form.Label>
                </div>

              </>
            ) : null}
            <span>
              <div className={styles.colRightMain1}>
                <DatePicker
                  id={eventName + 'date1'}
                  className={styles.datepicker}
                  onChange={handleDate1Change}
                  value={values.date1}
                  scrollableYearDropdown
                  showYearDropdown
                  name='date1'
                  selected={values.date1}
                  dateFormatCalendar='MMMM'
                  dateFormat="dd/MM/yyyy"
                />
                <Form.Label className={styles.colRightSub}>日期</Form.Label>
              </div>

            </span>
          </InputGroup>
        </Col>

        <Col lg='4'>
          <InputGroup className='mb-3'>
            {values.item.unit === 'second' ? (
              <>
                <div className={styles.colRightMain}>
                  <Form.Control name={eventName +'Min2'} size='sm' type='number' placeholder='Min' value={values.score2.min} onChange={handleNumberChange} />
                  <Form.Label className={styles.colRightSub}>分</Form.Label>
                </div>

                <div className={styles.colRightMain}>
                  <Form.Control name={eventName +'Sec2'} size='sm' type='number' placeholder='Sec' value={values.score2.sec} onChange={handleNumberChange} />
                  <Form.Label className={styles.colRightSub}>秒</Form.Label>
                </div>
                <div className={styles.colRightMain}>
                  <Form.Control name={eventName +'Hud2'} size='sm' type='number' placeholder='Hun' value={values.score2.hud} onChange={handleNumberChange} />
                  <Form.Label className={styles.colRightSub}>百分之一秒</Form.Label>
                </div>
              </>
            ) : null}
            {values.item.unit === 'cm' ? (
              <>
                <div className={styles.colRightMain1}>
                  <Form.Control name='CM2' size='sm' type='number' placeholder='cm' value={values.score2.cm} onChange={handleNumberChange} />
                  <Form.Label className={styles.colRightSub}>公分</Form.Label>
                </div>

              </>
            ) : null}
            {values.item.unit === 'points' ? (
              <>
                <div className={styles.colRightMain1}>
                  <Form.Control name={eventName +'Points2'} size='sm' type='number' placeholder='points' value={values.score2.points} onChange={handleNumberChange} />
                  <Form.Label className={styles.colRightSub}>分數</Form.Label>
                </div>

              </>
            ) : null}
            <span>
              <div className={styles.colRightMain1}>
                <DatePicker
                  id={eventName + 'date2'}
                  className={styles.datepicker}
                  onChange={handleDate2Change}
                  value={values.date2}
                  scrollableYearDropdown
                  showYearDropdown
                  name='date2'
                  selected={values.date2}
                  dateFormatCalendar='MMMM'
                  dateFormat="dd/MM/yyyy"
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
