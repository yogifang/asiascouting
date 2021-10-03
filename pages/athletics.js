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

const Shooting = () => {
  const { member, setMember } = useContext(Context);
  const [_id, set_ID] = useState('')
  let bestevent1 = initBestEvent;
  let bestevent2 = initBestEvent;
  let bestevent3 = initBestEvent;
  let bestevent4 = initBestEvent;
  let bestevent5 = initBestEvent;
  let bestevent6 = initBestEvent;
  let values = {};

  const findIndexByValue = (options, label) => {
    console.log(label);
    const index = options.findIndex((options) => options.label === label);
    return index;
    //console.log(options[4].label);
  };


  useEffect(() => {
    //values.member = recMember.email ;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleEventChange = (name, data) => {

    console.log(data)
    console.log(name)
    return;
    switch (name) {
      case 'event1':
        //    setBestevent1(data);
        bestevent1 = data;
        break;
      case 'event2':
        //     setBestevent1(data);
        bestevent2 = data;
        break;
      case 'event3':
        //      setBestevent1(data);

        bestevent3 = data;
        break;
      case 'event4':
        //    setBestevent1(data);
        bestevent4 = data;
        break;
      case 'event5':
        //     setBestevent1(data);
        bestevent5 = data;
        break;
      case 'event6':
        //    setBestevent1(data);
        bestevent6 = data;
        break;
      default:
        break;
    }
  };

  const handleSelectChange = (level, name) => {
    //  console.log(name);
    //  console.log(level);
    switch (name) {
      case 'athleticsType':
        setSelAthleticsType(level);
        values.athleticsType = level;
        break;

      default:
        break;
    }
  };

  const handleClick = async (e) => {

    Object.assign(values, _id, member, bestevent1, bestevent2, bestevent3, bestevent4, bestevent5, bestevent6);
    console.log(values);

    if (values._id === '') {
      const url = process.env.HOST_URI + `api/athleticsPerformance/`;
      values.member = member;

      const result = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const data = await result.json();
      alert('Data is Saved!!');
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
          <Row>
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
    </Container>
  );
};

export default Shooting;
