import styles from '../styles/Contant.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import { useForm } from '../components/useForm';
import { Button, Row, Container, ButtonGroup } from 'react-bootstrap';
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
  item: '',
  season: '',
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

const Shooting = () => {
  const { member, setMember } = useContext(Context);
  const [bestevent1, setBestevent1] = useState(initBestEvent)
  const [bestevent2, setBestevent2] = useState(initBestEvent)
  const [bestevent3, setBestevent3] = useState(initBestEvent)
  const [bestevent4, setBestevent4] = useState(initBestEvent)
  const [bestevent5, setBestevent5] = useState(initBestEvent)
  const [bestevent6, setBestevent6] = useState(initBestEvent)

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
      case 'lastestScore':
      case 'best10M60R':
      case 'best50M3x40':
      case 'best50M3x20':
      case 'rankNational':
      case 'rankWorld':
        temp[keyname] = fieldValues[keyname] < 0 ? (temp[keyname] = '不得小於0') : '';
        break;
      default:
        break;
    }
    setErrors({
      ...temp,
    });

    if (fieldValues === values) return Object.values(temp).every((x) => x === '');
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } = useForm(
    initialFValues,
    true,
    validate
  );

  useEffect(() => {
    //values.member = recMember.email ;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleEventChange = (date, name) => { };

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
    if (values._id === '') {
      const url = process.env.HOST_URI + `api/shootingPerformance/`;
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
      const url = process.env.HOST_URI + `api/shootingPerformance/${member}`;
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
            <EventInput name='event1' handleFunc={handleEventChange} values={bestevent1} />
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
