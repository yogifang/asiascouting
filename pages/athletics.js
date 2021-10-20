import styles from '../styles/Contant.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';

import { Button, Row, Col, Container } from 'react-bootstrap';
import { Context } from '../components/stores';
import { useState, useEffect, useContext } from 'react';

import 'react-datepicker/dist/react-datepicker.css';

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
  score1: { min: 0, sec: 0, hud: 0, points: 0, cm: 0 },
  date1: Date.now(),
  score2: { min: 0, sec: 0, hud: 0, points: 0, cm: 0 },

  date2: Date.now(),
};


const AthleticsPerformance = () => {
  const { member, setMember, sportItem, setSportItem } = useContext(Context);
  const [loaded, setLoaded] = useState(false);
  const [id, setId] = useState('');
  const [item1, setItem1] = useState({ value: '', label: '', unit: 'cm' });
  const [season1, setSeason1] = useState({ value: '', label: '' });
  const [score11, setScore11] = useState({ min: 0, sec: 0, hud: 0, points: 0, cm: 0 });
  const [date11, setDate11] = useState(new Date());
  const [score12, setScore12] = useState({ min: 0, sec: 0, hud: 0, points: 0, cm: 0 });
  const [date12, setDate12] = useState(new Date());

  const [item2, setItem2] = useState({ value: '', label: '', unit: 'cm' });
  const [season2, setSeason2] = useState({ value: '', label: '' });
  const [score21, setScore21] = useState({ min: 0, sec: 0, hud: 0, points: 0, cm: 0 });
  const [date21, setDate21] = useState(Date.now());
  const [score22, setScore22] = useState({ min: 0, sec: 0, hud: 0, points: 0, cm: 0 });
  const [date22, setDate22] = useState(Date.now());

  const [item3, setItem3] = useState({ value: '', label: '', unit: 'cm' });
  const [season3, setSeason3] = useState({ value: '', label: '' });
  const [score31, setScore31] = useState({ min: 0, sec: 0, hud: 0, points: 0, cm: 0 });
  const [date31, setDate31] = useState(Date.now());
  const [score32, setScore32] = useState({ min: 0, sec: 0, hud: 0, points: 0, cm: 0 });
  const [date32, setDate32] = useState(Date.now());

  const [item4, setItem4] = useState({ value: '', label: '', unit: 'cm' });
  const [season4, setSeason4] = useState({ value: '', label: '' });
  const [score41, setScore41] = useState({ min: 0, sec: 0, hud: 0, points: 0, cm: 0 });
  const [date41, setDate41] = useState(Date.now());
  const [score42, setScore42] = useState({ min: 0, sec: 0, hud: 0, points: 0, cm: 0 });
  const [date42, setDate42] = useState(Date.now());
  const [item5, setItem5] = useState({ value: '', label: '', unit: 'cm' });
  const [season5, setSeason5] = useState({ value: '', label: '' });
  const [score51, setScore51] = useState({ min: 0, sec: 0, hud: 0, points: 0, cm: 0 });
  const [date51, setDate51] = useState(Date.now());
  const [score52, setScore52] = useState({ min: 0, sec: 0, hud: 0, points: 0, cm: 0 });
  const [date52, setDate52] = useState(Date.now());

  const [item6, setItem6] = useState({ value: '', label: '', unit: 'cm' });
  const [season6, setSeason6] = useState({ value: '', label: '' });
  const [score61, setScore61] = useState({ min: 0, sec: 0, hud: 0, points: 0, cm: 0 });
  const [date61, setDate61] = useState(Date.now());
  const [score62, setScore62] = useState({ min: 0, sec: 0, hud: 0, points: 0, cm: 0 });
  const [date62, setDate62] = useState(Date.now());



  const findIndexByValue = (options, label) => {
    console.log(label);
    const index = options.findIndex((options) => options.label === label);
    return index;
  };

  useEffect(() => {
    const getAthleticePerformance = async () => {
    
      console.log('effect.........athletics');
      const url = process.env.HOST_URI + `api/athleticsPerformance/${member}`;
      const queryParams = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
      try {
        const res = await fetch(url, queryParams);
        const record = await res.json();
        const data = record.data;
       // console.log(data);
        const date11  = Date.parse(data.event1.date1);
        const date12 = Date.parse(data.event1.date2) ;
        const date21  = Date.parse(data.event2.date1);
        const date22 = Date.parse(data.event2.date2) ;
        const date31  = Date.parse(data.event3.date1);
        const date32 = Date.parse(data.event3.date2) ;
        const date41  = Date.parse(data.event4.date1);
        const date42 = Date.parse(data.event4.date2) ;
        const date51  = Date.parse(data.event5.date1);
        const date52 = Date.parse(data.event5.date2) ;
        const date61  = Date.parse(data.event6.date1);
        const date62 = Date.parse(data.event6.date2) ;
        setId(data._id);
        setItem1(data.event1.item);
        setSeason1(data.event1.season);
        setScore11(data.event1.score1);
        setDate11(date11);
        setScore12(data.event1.score2);
        setDate12(date12) ;
       
        setItem2(data.event2.item);
        setSeason2(data.event2.season);
        setScore21(data.event2.score1);
        setDate21(date21);
        setScore22(data.event2.score2);
        setDate22(date22) ;

        setItem3(data.event3.item);
        setSeason3(data.event3.season);
        setScore31(data.event3.score1);
        setDate31(date31);
        setScore32(data.event3.score2);
        setDate32(date32) ;

        setItem4(data.event4.item);
        setSeason4(data.event4.season);
        setScore41(data.event4.score1);
        setDate41(date41);
        setScore42(data.event4.score2);
        setDate42(date42) ;

        setItem5(data.event5.item);
        setSeason5(data.event5.season);
        setScore51(data.event5.score1);
        setDate51(date51);
        setScore52(data.event5.score2);
        setDate52(date52) ;

        setItem6(data.event6.item);
        setSeason6(data.event6.season);
        setScore61(data.event6.score1);
        setDate61(date61);
        setScore62(data.event6.score2);
        setDate62(date62) ;
      } catch (error) {
        console.log(error);
      }
    };

    
      getAthleticePerformance();
    
   
    
  }, [member]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleEventChange = (name, data) => {
    let score1 = {};
    let score2 = {};
    score1.cm = data.score1.cm;
    score1.points = data.score1.points;
    score1.min = data.score1.min;
    score1.sec = data.score1.sec;
    score1.hud = data.score1.hud;
    score2.cm = data.score2.cm;
    score2.points = data.score2.points;
    score2.min = data.score2.min;
    score2.sec = data.score2.sec;
    score2.hud = data.score2.hud;

    switch (name) {
      case 'event1':
        setItem1(data.item);
        setSeason1(data.season);
        setScore11(score1);
        setDate11(data.date1);
        setScore12(score2);
        setDate12(data.date2);
        break;
      case 'event2':
        setItem2(data.item);
        setSeason2(data.season);
        setScore21(score1);
        setDate21(data.date1);
        setScore22(score2);
        setDate22(data.date2);
        break;
      case 'event3':
        setItem3(data.item);
        setSeason3(data.season);
        setScore31(score1);
        setDate31(data.date1);
        setScore32(score2);
        setDate32(data.date2);
        break;
      case 'event4':
        setItem4(data.item);
        setSeason4(data.season);
        setScore41(score1);
        setDate41(data.date1);
        setScore42(score2);
        setDate42(data.date2);
        break;
      case 'event5':
        setItem5(data.item);
        setSeason5(data.season);
        setScore51(score1);
        setDate51(data.date1);
        setScore52(score2);
        setDate52(data.date2);
        break;
      case 'event6':
        setItem6(data.item);
        setSeason6(data.season);
        setScore61(score1);
        setDate61(data.date1);
        setScore62(score2);
        setDate62(data.date2);
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
   let bestevent1 = {};
   let bestevent2 = {};
   let bestevent3 = {};
   let bestevent4 = {};
   let bestevent5 = {};
   let bestevent6 = {};

    Object.assign(bestevent1 , {item: item1} , {season: season1} , {score1: score11} , {date1:date11} ,{score2: score12} ,{date2:date12}) ;
    Object.assign(bestevent2 , {item: item2} , {season: season2} , {score1: score21} , {date1:date21} ,{score2: score22} ,{date2:date22}) ;
    Object.assign(bestevent3 , {item: item3} , {season: season3} , {score1: score31} , {date1:date31} ,{score2: score32} ,{date2:date32}) ;
    Object.assign(bestevent4 , {item: item4} , {season: season4} , {score1: score41} , {date1:date41} ,{score2: score42} ,{date2:date42}) ;
    Object.assign(bestevent5 , {item: item5} , {season: season5} , {score1: score51} , {date1:date51} ,{score2: score52} ,{date2:date52}) ;
    Object.assign(bestevent6 , {item: item6} , {season: season6} , {score1: score61} , {date1:date61} ,{score2: score62} ,{date2:date62}) ;
    console.log(bestevent1) ;
   
   let values = {} ;
    Object.assign(
      values,
      { _id: id },
      { member: member },
      { event1: bestevent1 },
      { event2: bestevent2 },
      { event3: bestevent3 },
      { event4: bestevent4 },
      { event5: bestevent5 },
      { event6: bestevent6 }
    );
    console.log(values);
  
    if (id === '') {
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
            <Col sm={2}>
              <h6 className={styles.m0}>運動項目</h6>
            </Col>
            <Col sm={2}>
              <h6 className={styles.m0}>運動場地</h6>
            </Col>
            <Col sm={4}>
              <h6 className={styles.m0}>最佳成績《一》</h6>
            </Col>
            <Col sm={4}>
              <h6 className={styles.m0}>最佳成績《二》</h6>
            </Col>
          </Row>

          <Row>
            <EventInput
              name='event1'
              handleFunc={handleEventChange}
              item={item1}
              season={season1}
              score1={score11}
              date1={date11}
              score2={score12}
              date2={date12}
            />
          </Row>
          <Row>
            <EventInput
              name='event2'
              handleFunc={handleEventChange}
              item={item2}
              season={season2}
              score1={score21}
              date1={date21}
              score2={score22}
              date2={date22}
            />
          </Row>
          <Row>
            <EventInput
              name='event3'
              handleFunc={handleEventChange}
              item={item3}
              season={season3}
              score1={score31}
              date1={date31}
              score2={score32}
              date2={date32}
            />
          </Row>
          <Row>
            <EventInput
              name='event4'
              handleFunc={handleEventChange}
              item={item4}
              season={season4}
              score1={score41}
              date1={date41}
              score2={score42}
              date2={date42}
            />
          </Row>
          <Row>
            <EventInput
              name='event5'
              handleFunc={handleEventChange}
              item={item5}
              season={season5}
              score1={score51}
              date1={date51}
              score2={score52}
              date2={date52}
            />
          </Row>
          <Row>
            <EventInput
              name='event6'
              handleFunc={handleEventChange}
              item={item6}
              season={season6}
              score1={score61}
              date1={date61}
              score2={score62}
              date2={date62}
            />
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

export default AthleticsPerformance;
