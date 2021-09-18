import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useContext } from 'react';
import fetch from 'isomorphic-unfetch';
import { Container, Row, Col } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { Context } from '../components/stores';
import Navbar from '../components/Navbar';
import styles from '../styles/Contant.module.css';
import Moment from 'react-moment';
import OutputText from '../components/OutputText';
import OutputText2 from '../components/OutputText2';
import OutputDate from '../components/OutputDate';
import OutputMonth from '../components/OutputMonth';
import FileBase64 from 'react-file-base64';
import OutputTextBig from '../components/OutputTextBig';
import OutputContent from '../components/OutputContent';
import Nobody from '../components/nobody';

const initialBaseinfos = {
  ChineseName: '',
  PassportName: '',
  Gender: '',
  GradDate: Date.now(),
  Height: 0.0,
  LeftRightHand: '',
  PriPosition: '',
  SecPosition: '',
  Weight: 0.0,
  bFilled: false,
  currentGrad: '',
};

const initialContacts = {
  email: '',
  birthday: Date.now(),
  school: '',
  liveCity: '',
  Nationality: '',
  links: '',
  member: '',
  bFilled: false,
};

const initialSubjects = {
  member: '',
  GPA: 0,
  AVG: 0,
  TOFEL: 0,
  IELTS: 0,
  TOEIC: 0,
  SAT: 0,
  ACT: 0,
  IntentMajor: '',
  bFilled: false,
};

const initialBaseballPerformance = {
  member: '',
  TenYardSplit: 0,
  SixtyYardSplit: 0,
  Throwing: 0,
  BlockPitch: 0,
  ERA: 0,
  gamesP: 0,
  AVG: 0,
  ER: 0,
  EXIT: 0,
  HB: 0,
  HR: 0,
  IP: 0,
  K: 0,
  OPS: 0,
  gamesH: 0,
  BB: 0,
  BBB: 0,
  BH: 0,
  BHR: 0,
  BK: 0,
  BRUN: 0,
  RUN: 0,
  Hit2B: 0,
  Hit3B: 0,
  Hits: 0,
  lAVG: 0,
  lBB: 0,
  lBBB: 0,
  lBH: 0,
  lBHR: 0,
  lBK: 0,
  lBRUN: 0,
  lER: 0,
  lERA: 0,
  lHB: 0,
  lHit2B: 0,
  lHit3B: 0,
  lHitHR: 0,
  lHits: 0,
  lIP: 0,
  lK: 0,
  lOPS: 0,
  lRUN: 0,
  AB: 0,
  latestGameDate: Date.now(),
  latestGameName: '',
  bFilled: false,
};

const BaseballPage = () => {
  const { member, setMember } = useContext(Context);
  const [values, setValues] = useState(initialBaseinfos);
  const [valContact, setValContact] = useState(initialContacts);
  const [valSubjects, setValSubjects] = useState(initialSubjects);
  const [valPerformance, setValPerformance] = useState(initialBaseballPerformance);
  const [picture, setPicture] = useState({ _id: '', member: '', image: Nobody });
  const [photo, setPhoto] = useState({ image: Nobody });

  useEffect(() => {
    const getBaseballInfo = async () => {
      try {
        const url = process.env.HOST_URI + `api/baseballInfo/${member}`;
        // const res = await fetch(`https://dashboard-chi-three.vercel.app/api/baseballInfo/${member}`, {
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const record = await res.json();
        // console.log(record.data);
        let field;
        let nValues = {};
        for (field in initialBaseinfos) {
          nValues[field] = record.data[field];
        }
        setValues(nValues);
      } catch (error) {
        console.log(error);
      }
    };

    const getContacts = async () => {
      try {
        const url = process.env.HOST_URI + `api/contacts/${member}`;
        //  const res = await fetch(`https://dashboard-chi-three.vercel.app/api/contacts/${member}`, {
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const record = await res.json();
        // console.log(record.data);
        let field;
        let nValues = {};
        for (field in initialContacts) {
          nValues[field] = record.data[field];
        }
        setValContact(nValues);
      } catch (error) {
        console.log(error);
      }
    };

    const getSubjects = async () => {
      try {
        const url = process.env.HOST_URI + `api/subjects/${member}`;
        const res = await fetch(url, {
          // const res = await fetch(`https://dashboard-chi-three.vercel.app/api/subjects/${member}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const record = await res.json();
        // console.log(record.data);
        let field;
        let nValues = {};
        for (field in initialSubjects) {
          nValues[field] = record.data[field];
        }
        setValSubjects(nValues);
      } catch (error) {
        console.log(error);
      }
    };

    const getPerformance = async () => {
      console.log("===========baseball performance =====");
      console.log(member);
      try {
        const url = process.env.HOST_URI + `api/baseballPerformance/${member}`;
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const record = await res.json();
        // console.log(record.data);
        let field;
        let nValues = {};
        for (field in initialBaseballPerformance) {
          switch (field) {
            case "latestGameDate":
              nValues[field] = Date.parse(record.data[field]);

              break;
            default:
              nValues[field] = record.data[field];
              break;
          }
          //  nValues[field] = record.data[field];
        }
        console.log(nValues);
        setValPerformance(nValues);
      } catch (error) {
        console.log(error);
      }
    };

    const getPhoto = async () => {
      const url = process.env.HOST_URI + `api/photos/${member}`;
      const queryParams = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
      const [res] = await Promise.all([fetch(url, queryParams)]);
      const [record] = await Promise.all([res.json()]);
      if (record.success) {
        setPicture(record.data);
        if (record.data.image !== undefined) {
          //console.log(record.data.image);
          setPhoto({ image: record.data.image });
        }
      } else {
        //   console.log('-------no data');
      }
    };

    getBaseballInfo();
    getContacts();
    getSubjects();
    getPerformance();
    getPhoto();
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const newpicture = {
      _id: picture._id,
      member: member,
      image: photo.image,
    };

    setPicture(newpicture);

    if (newpicture._id === '') {
      try {
        const url = process.env.HOST_URI + `api/photos/`;
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newpicture),
        });
        alert('Data is Saved!!');
      } catch (error) {
        console.log(error);
      }
    } else {
      const member = newpicture.member;
      const url = process.env.HOST_URI + `api/photos/${member}`;
      const result = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newpicture),
      });
      const data = await result.json();
      //  console.log(data);
      alert('Data is Updated!!');
    }
  };
  return (
    <Container className={styles.container}>
      <Navbar />
      <h2 className={styles.m0}> Baseball Pages </h2>
      <div className={styles.contant}>
        <div className={styles.sheettable} style={{ width: '1024px' }}>
          <Row className={styles.sheettable}>
            <Col className={styles.sidecolumn} sm='2'>
              <h5 className={styles.sidetitle}> </h5>
            </Col>
            <Col sm='3'>
              <Image placeholder='empty' src={photo.image} alt='Picture of the author' width={210} height={250} />
            </Col>
            <Col sm='3'>
              <OutputTextBig cols='12' name='ChineseName' main='' value={values.ChineseName} />
              <OutputTextBig cols='12' name='PassportName' main='' value={values.PassportName} />
              <OutputText cols='12' name='Gender' main='' value={values.Gender} />
              <OutputContent
                cols='6'
                name='Hight'
                main=''
                value1={values.Height}
                value2={values.Weight}
                unit1='cm'
                unit2='kg'
              />
              <OutputText cols='12' name='email' main='' value={valContact.email} />
            </Col>
            <Col sm='3'>
              <FileBase64 type='file' multiple={false} onDone={({ base64 }) => setPhoto({ image: base64 })} />
              <button className='btn' onClick={onSubmitHandler}>
                submit
              </button>
            </Col>
          </Row>
          <Row className={styles.sheettable}>
            <Col className={styles.sidecolumn} sm='2'>
              <h5 className={styles.sidetitle}>
                information
                <br />
                Personal
              </h5>
            </Col>
            <Col sm='3'>
              <OutputDate cols='12' name='Birthday' main='Birthday' value={valContact.birthday} />
              <OutputText cols='12' name='Grade' main='Grade' value={values.currentGrad} />
              <OutputText cols='12' name='Citizenship' main='Citizenship' value={valContact.Nationality} />
            </Col>
            <Col sm='3'>
              <OutputText cols='12' name='CurrentSchool' main='Current School' value={valContact.school} />
              <OutputMonth
                cols='12'
                name='expectedgraduationdate'
                main='High school expected graduation date'
                value={valContact.birthday}
              />
              <OutputText cols='12' name='Residence' main='Passport Name' value={valContact.liveCity} />
            </Col>

            <Col sm='3'>
              <OutputText cols='12' name='PriPosition' main='Position' value={valContact.PriPosition} />
              <OutputText cols='12' name='SecPosition' main='Second Position' value={valContact.SecPosition} />
              <OutputText cols='12' name='LeftRightHand' main='B/T' value={valContact.LeftRightHand} />
            </Col>
          </Row>
          <Row className={styles.sheettable}>
            <Col className={styles.sidecolumn} sm='2'>
              <h5 className={styles.sidetitle}>
                related
                <br />
                Subject
              </h5>
            </Col>
            <Col sm='3'>
              <OutputText cols='12' name='schoolgradesGPA' main='School grades GPA' value={valSubjects.GPA} />
              <OutputText cols='12' name='averagegrades' main='Average grades' value={valSubjects.AVG} />
              <OutputText cols='12' name='TOFEL' main='TOFEL' value={valSubjects.TOFEL} />
            </Col>
            <Col sm='3'>
              <OutputText cols='12' name='IELTS' main='IELTS' value={valSubjects.IELTS} />
              <OutputText cols='12' name='TOEIC' main='TOEIC' value={valSubjects.TOEIC} />
              <OutputText cols='12' name='SAT' main='SAT' value={valSubjects.SAT} />
            </Col>
            <Col sm='3'>
              <OutputText cols='12' name='ACT' main='ACT' value={valSubjects.ACT} />
              <OutputText
                cols='12'
                name='InterestsMajor'
                main='Interests in College Major'
                value={valSubjects.IntentMajor}
              />
            </Col>
          </Row>
          <Row className={styles.sheettable}>
            <Col className={styles.sidecolumn} sm='2'>
              <h5 className={styles.sidetitle}>
                Performance
                <br />
                Baseball
              </h5>
            </Col>
            <Col sm='3'>
              <OutputText cols='12' name='TenYardSplit' main='10 yard sprint(s)' value={valPerformance.TenYardSplit} />
              <div className={styles.bgboarder}>
                <h6> Pitching Performance </h6>
                <OutputText cols='12' name='Throwing' main='Throwing Velocity(mph)' value={valPerformance.Throwing} />
                <OutputText cols='12' name='BlockPitch' main='Block Pitch(s)' value={valPerformance.BlockPitch} />
                <OutputText2 cols='12' name1='ERA' main1='ERA' value1={valPerformance.ERA} name2='ER' main2='ER' value2={valPerformance.ER} />
                <OutputText2 cols='12' name1='gamesP' main1='Games' value1={valPerformance.gamesP} name2='BHR' main2='BHR' value2={valPerformance.BHR} />
                <OutputText2 cols='12' name1='IP' main1='IP' value1={valPerformance.IP} name2='HB' main2='HB' value2={valPerformance.HB} />
                <OutputText2 cols='12' name1='BH' main1='H' value1={valPerformance.BH} name2='BB' main2='BB' value2={valPerformance.BB} />
                <OutputText2 cols='12' name1='BRUN' main1='R' value1={valPerformance.BRUN} name2='K' main2='K' value2={valPerformance.K} />
              </div>
            </Col>
            <Col sm='3'>
              <OutputText
                cols='12'
                name='SixtyYardSplit'
                main='60 yard sprint(s)'
                value={valPerformance.SixtyYardSplit}
              />
              <div className={styles.bgboarder}>
                <h6> Hit performance </h6>
                <OutputText cols='12' name='EXIT' main='Exit Velocity(mph)' value={valPerformance.EXIT} />
                <OutputText2 cols='12' name1='AB' main1='AB' value1={valPerformance.AB} name2='AVG' main2='AVG' value2={valPerformance.AVG} />
                <OutputText2 cols='12' name1='Hit2B' main1='2B' value1={valPerformance.Hit2B} name2='OPS' main2='OPS' value2={valPerformance.OPS} />
                <OutputText2 cols='12' name1='Hit3B' main1='3B' value1={valPerformance.Hit3B} name2='gamesH' main2='Games' value2={valPerformance.gamesH} />
                <OutputText2 cols='12' name1='HR' main1='HR' value1={valPerformance.HR} name2='RUN' main2='R' value2={valPerformance.RUN} />
                <OutputText2 cols='12' name1='BK' main1='K' value1={valPerformance.BK} name2='Hits' main2='H' value2={valPerformance.Hits} />
                <OutputText cols='12' name='BB' main='BB' value={valPerformance.BB} />
              </div>
            </Col>
            <Col sm='3'>
              <OutputText
                cols='12'
                name='latestGameName'
                main='Most recent tournament/competition game name'
                value={valPerformance.latestGameName}
              />
              <OutputDate
                cols='12'
                name='latestGameDate'
                main='Most recent game date'
                value={valPerformance.latestGameDate}
              />
              <div className={styles.bgboarder}>
                <h6> Pitching Performance </h6>
                <OutputText2 cols='12' name1='lERA' main1='ERA' value1={valPerformance.lERA} name2='lER' main2='ER' value2={valPerformance.lER} />
                <OutputText2 cols='12' name1='lIP' main1='IP' value1={valPerformance.lIP} name2='lBHR' main2='HR' value2={valPerformance.lBHR} />
                <OutputText2 cols='12' name1='lBH' main1='H' value1={valPerformance.lBH} name2='lHB' main2='HB' value2={valPerformance.lHB} />
                <OutputText2 cols='12' name1='lBRUN' main1='R' value1={valPerformance.lBRUN} name2='lBB' main2='BB' value2={valPerformance.lBB} />
                <OutputText cols='12' name='lK' main='K' value={valPerformance.lK} />
              </div>
              <div className={styles.bgboarder}>
                <h6> Hitting Performance </h6>
                <OutputText2 cols='12' name1='lAVG' main1='AVG' value1={valPerformance.lAVG} name2='lHit2B' main2='2B' value2={valPerformance.lHit2B} />
                <OutputText2 cols='12' name1='lOPS' main1='OPS' value1={valPerformance.lOPS} name2='lHit3B' main2='3B' value2={valPerformance.lHit3B} />
                <OutputText2 cols='12' name1='lRUN' main1='R' value1={valPerformance.lRUN} name2='lHitHR' main2='HR' value2={valPerformance.lHitHR} />
                <OutputText2 cols='12' name1='lHits' main1='H' value1={valPerformance.lHits} name2='lBK' main2='K' value2={valPerformance.lBK} />

                <OutputText cols='12' name='lBBB' main='BB' value={valPerformance.lBBB} />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Container>
  );
};

export default BaseballPage;

