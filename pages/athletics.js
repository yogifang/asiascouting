import styles from '../styles/Contant.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import { useForm } from '../components/useForm';
import { Button, Row, Col, Container, ButtonGroup } from 'react-bootstrap';
import { Context } from '../components/stores';
import { useState, useEffect, useReducer, useContext } from 'react';

import 'react-datepicker/dist/react-datepicker.css';
import TextInput from '../components/TextInput';
import DateInput from '../components/DateInput';
import SelectInput from '../components/SelectInput';
import EventInput from '../components/EventInput';

const optionsGameLevel = [
  { value: 'Olympics', label: '奧運' },
  { value: 'Intercontinental', label: '奧運資格賽/世錦賽/世界盃/世大運' },
  { value: 'Asian Games', label: '亞運/亞錦賽/亞洲盃' },
  { value: 'Others', label: '其他' },
];

const optionsAthleticsTypes = [
  { value: 'Field', label: '田賽' },
  { value: 'Track', label: '徑賽' },
  { value: 'All-round', label: '全能' },
  { value: 'Marathon', label: '馬拉松' },
  { value: 'Walk', label: '競走' },
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


const initialFValues = {
  _id: '',
  member: '',
  bestevent1: {},
  bestevent2: {},
  bestevent3: {},
  bestevent4: {},
  bestevent5: {},
  bestevent6: {},
  bFilled: false,
};

const AthleticsPerformance = () => {
  const { member, setMember, sportItem, setSportItem } = useContext(Context);
  const [busy, setBusy] = useState(true);
  const [bestevent1, setBestevent1] = useState(initBestEvent);
  const [bestevent2, setBestevent2] = useState(initBestEvent);
  const [bestevent3, setBestevent3] = useState(initBestEvent);
  const [bestevent4, setBestevent4] = useState(initBestEvent);
  const [bestevent5, setBestevent5] = useState(initBestEvent);
  const [bestevent6, setBestevent6] = useState(initBestEvent);
  const [id, setId] = useState("");

  const findIndexByValue = (options, label) => {
    console.log(label);
    const index = options.findIndex((options) => options.label === label);
    return index;

  };


  useEffect(
    () => {
    setBusy(true);
    const getAthleticePerformance = async () => {
      if (member === undefined) return;
      console.log('effect.........athletics')
      const url = process.env.HOST_URI + `api/athleticsPerformance/${member}`;
      const queryParams = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      const [res] = await Promise.all([fetch(url, queryParams)]);
      const [record] = await Promise.all([res.json()]);

      console.log(record);
      const data = record.data;

      //if (data.bestevent1 !== undefined) { setBestevent1(data.bestevent1); }
     // if (data.bestevent2 !== undefined) { setBestevent1(data.bestevent2); }
     // if (data.bestevent3 !== undefined) { setBestevent1(data.bestevent3); }
     // if (data.bestevent4 !== undefined) { setBestevent1(data.bestevent4); }
      //if (data.bestevent5 !== undefined) { setBestevent1(data.bestevent5); }
      //if (data.bestevent6 !== undefined) { setBestevent1(data.bestevent6); }
    //  setBestevent1(data.bestevent1);
     // setBestevent2(data.bestevent2);
    //  setBestevent3(data.bestevent3);
    //  setBestevent4(data.bestevent4);
     // setBestevent5(data.bestevent5);
    //  setBestevent6(data.bestevent6);
      setId(data._id);
      setBusy(false);
    }


    getAthleticePerformance();

    // console.log(bestevent1);

  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleEventChange = (name, data) => {

    // console.log(data)
    console.log(name)
    console.log(data)
    let tmpData = {};
    let field ;
    for (field in data) {
      tmpData[field] = data[field];
   
    }
    
   console.log(tmpData)
    switch (name) {
      case 'event1':
        setBestevent1({}) ;
        setBestevent1(tmpData);
        break;
      case 'event2':
        setBestevent2(tmpData);
        break;
      case 'event3':
        setBestevent3(tmpData);
        break;
      case 'event4':
        setBestevent4(tmpData);
        break;
      case 'event5':
        setBestevent5(tmpData);
        break;
      case 'event6':
        setBestevent6(tmpData);
        break;
      default:
        break;
    }
   // console.log(bestevent1)
  };



  const handleClick = async (e) => {
    if (member === undefined) {
      alert('Member is Missing!!');
      return;
    }

    Object.assign(values, { _id: _id }, { member: member }, { event1: bestevent1 }, { event2: bestevent2 }, { event3: bestevent3 }, { event4: bestevent4 }, { event5: bestevent5 }, { event6: bestevent6 },);
    console.log(values);

    if (_id === '') {
      const url = process.env.HOST_URI + `api/athleticsPerformance`;
      values.member = member;

      const result = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const data = await result.json();
      alert('Data is Created!!');
    } else {
      const url = process.env.HOST_URI + `api/athleticsPerformance/${member}`;
      values.member = member;

      const result = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const data = await result.json();

      alert('Data is Updated!!');
    }
  };

  return (
    <Container className={styles.container}>
      <Navbar />
      <div className={styles.contant}>
        <div className='div-scroll'>
          <Row>
            <p className={styles.textpurple}>田徑成績及運動表現</p>
          </Row>
          <br />
          <Row>
            <Col sm={2} >
              <h6 className={styles.m0}>運動項目</h6>
            </Col>
            <Col sm={2} >
              <h6 className={styles.m0}>運動場地</h6>
            </Col>
            <Col sm={4} >
              <h6 className={styles.m0}>最佳成績《一》</h6>
            </Col>
            <Col sm={4} >
              <h6 className={styles.m0}>最佳成績《二》</h6>
            </Col>
          </Row>

          <Row>
            <EventInput name='event1' handleFunc={handleEventChange} values={bestevent1} />
          </Row>
          <Row>
            <EventInput name='event2' handleFunc={handleEventChange} values={bestevent2} />
          </Row>
          <Row>
            <EventInput name='event3' handleFunc={handleEventChange} values={bestevent3} />
          </Row>
          <Row>
            <EventInput name='event4' handleFunc={handleEventChange} values={bestevent4} />
          </Row>
          <Row>
            <EventInput name='event5' handleFunc={handleEventChange} values={bestevent5} />
          </Row>
          <Row>
            <EventInput name='event6' handleFunc={handleEventChange} values={bestevent6} />
          </Row>
          < Row >
            <br></br>
            <Button
              justification='right'
              onClick={handleClick}
              variant='secondary'
              className={styles.btnAppNextSmall}
            ></Button>{' '}
          </Row>

        </div>
      </div>
    </Container >
  );
};

export default AthleticsPerformance;
