import styles from '../styles/Contant.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import { useForm } from '../components/useForm';
import { Button, Grid, Form, FormControl, Row, Col, Container, Spinner, ButtonGroup } from 'react-bootstrap';
import { Context } from '../components/stores';
import { useState, useEffect, useReducer, useContext } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TextInput from '../components/TextInput';

const textInput = {
  type: 'text',
  main: '最近一次比賽名稱',
  sub: 'Latest Competition Name',
  name: 'latestGameName',
  error: 'errormessage',
};

const initialFValues = {
  _id: '',
  member: '',
  latestGameName: '',
  lastestScore: 0,
  latestGameDate: Date.now(),
  best10M60R: 0,
  best10MLevel: '',
  best10MDate: Date.now(),
  best50M3x40: 0,
  best50M3x40Level: '',
  best50M3x40Date: Date.now(),
  best50M3x20: 0,
  best50M3x20Level: '',
  best50M3x20Date: Date.now(),
  rankNational: 0,
  rankWorld: 0,
  linkISSF: '',
  linkVideo: '',
  bFilled: false,
};

const optionsGameLevel = [
  { value: '1', label: '奧運' },
  { value: '2', label: '奧運資格賽/世錦賽/世界盃/世大運' },
  { value: '3', label: '亞運/亞錦賽/亞洲盃' },
  { value: '4', label: '其他' },
];
const Shooting = () => {
  const [latestGameDate, setLatestGameDate] = useState(new Date());
  const [best10MDate, setBest10MDate] = useState(new Date());
  const [best50M3x40Date, setBest50M3x40Date] = useState(new Date());
  const [best50M3x20Date, setBest50M3x20Date] = useState(new Date());
  const [selBest10MLevel, setSelBest10MLevel] = useState(optionsGameLevel[0]);
  const [selBest50M3x20Level, setSelBest50M3x20Level] = useState(optionsGameLevel[0]);
  const [selBest50M3x40Level, setSelBest50M3x40Level] = useState(optionsGameLevel[0]);

  const findIndexByValue = (options, label) => {
    console.log(label);
    const index = options.findIndex((options) => options.label === label);
    return index;
    //console.log(options[4].label);
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ('rankDomestic' in fieldValues) temp.rankDomestic = fieldValues.rankDomestic ? '' : 'This field is required.';
    if ('englishName' in fieldValues) temp.englishName = fieldValues.englishName ? '' : 'This field is required.';
    if ('email' in fieldValues) temp.email = /$^|.+@.+..+/.test(fieldValues.email) ? '' : 'Email is not valid.';
    if ('mobile' in fieldValues) temp.mobile = fieldValues.mobile.length > 9 ? '' : 'Minimum 10 numbers required.';
    if ('departmentId' in fieldValues)
      temp.departmentId = fieldValues.departmentId.length !== 0 ? '' : 'This field is required.';
    setErrors({
      ...temp,
    });

    if (fieldValues === values) return Object.values(temp).every((x) => x === '');
  };

  const handleTest = (e) => {
    console.log('------------call back');
    console.log(e.target.value);
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } = useForm(
    initialFValues,
    true,
    validate
  );

  const handleClick = async (e) => {
    const url = process.env.HOST_URI + `api/baseballInfo/${member}`;
    values.member = member;
    console.log(values);
    const result = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    const data = await result.json();
    console.log(data);
    alert('Data is Saved!!');
  };

  return (
    <Container className={styles.container}>
      <Navbar />
      <div className={styles.contant}>
        <div className='div-scroll'>
          <Row>
            <TextInput configText={textInput} handleFunc={handleInputChange} values={values} />
            <p className={styles.textpurple}>射擊成績及運動表現</p>
            <p className={styles.textorange}>若以下資料有不便回答者 可填入N</p>
            <Col lg='5'>
              <Form.Label htmlFor='latestGameName' className={styles.colLeftMain}>
                最近一次比賽名稱
                <p className={styles.colLeftSub}>Latest Competition Name</p>
              </Form.Label>{' '}
            </Col>
            <Col lg='7'>
              <FormControl
                id='latestGameName'
                type='text'
                className={styles.colRightMain}
                name='latestGameName'
                onChange={handleInputChange}
                value={values.latestGameName}
              />
              <Form.Label className={styles.colRightSub}>{errors.ChineseName}</Form.Label>{' '}
            </Col>
            <Col lg='5'>
              <Form.Label htmlFor='lastestScore' className={styles.colLeftMain}>
                最近一次比賽成績
                <p className={styles.colLeftSub}>Latest Competition Results</p>
              </Form.Label>{' '}
            </Col>
            <Col lg='7'>
              <FormControl
                id='lastestScore'
                type='text'
                className={styles.colRightMain}
                name='lastestScore'
                onChange={handleInputChange}
                value={values.lastestScore}
              />
              <Form.Label className={styles.colRightSub}>{errors.ChineseName}</Form.Label>{' '}
            </Col>
            <Col lg='5'>
              <Form.Label htmlFor='latestGameDate' className={styles.colLeftMain}>
                比賽日期
                <p className={styles.colLeftSub}>Date</p>
              </Form.Label>{' '}
            </Col>
            <Col lg='7'>
              <DatePicker
                name='latestGameDate'
                className={styles.rightSelect}
                selected={latestGameDate}
                onChange={(date) => {
                  setLatestGameDate(new Date(date));
                  values.latestGameDate = date;
                }}
                showYearDropdown
                dateFormatCalendar='MMMM'
                scrollableYearDropdown
              />
              <Form.Label className={styles.colRightSub}>{errors.ChineseName}</Form.Label>{' '}
            </Col>
            <Col lg='5'>
              <Form.Label htmlFor='best10M60R' className={styles.colLeftMain}>
                10米生涯最佳成績(60發)
                <p className={styles.colLeftSub}>10M Air Rifle Record(60 shots)</p>
              </Form.Label>{' '}
            </Col>
            <Col lg='7'>
              <FormControl
                id='best10M60R'
                type='text'
                className={styles.colRightMain}
                name='best10M60R'
                onChange={handleInputChange}
                value={values.best10M60R}
              />
              <Form.Label className={styles.colRightSub}>{errors.ChineseName}</Form.Label>{' '}
            </Col>
            <Col lg='5'>
              <Form.Label htmlFor='best10MLevel' className={styles.colLeftMain}>
                在哪一層級之賽事達到該成績
                <p className={styles.colLeftSub}>Record Broken in What Level</p>
              </Form.Label>{' '}
            </Col>
            <Col lg='7'>
              <Select
                placeholder='Select Level'
                className={styles.rightSelect}
                name='best10MLevel'
                value={selBest10MLevel}
                autosize={true}
                id='best10MLevel'
                options={optionsGameLevel}
              />
            </Col>
            <Col lg='5'>
              <Form.Label htmlFor='best10MDate' className={styles.colLeftMain}>
                比賽日期
                <p className={styles.colLeftSub}>Date</p>
              </Form.Label>{' '}
            </Col>
            <Col lg='7'>
              <DatePicker
                name='best10MDate'
                className={styles.rightSelect}
                selected={best10MDate}
                onChange={(date) => {
                  setLatestGameDate(new Date(date));
                  values.best10MDate = date;
                }}
                showYearDropdown
                dateFormatCalendar='MMMM'
                scrollableYearDropdown
              />
              <Form.Label className={styles.colRightSub}>{errors.ChineseName}</Form.Label>{' '}
            </Col>
            <Col lg='5'>
              <Form.Label htmlFor='best50M3x40' className={styles.colLeftMain}>
                50米生涯最佳成績(3x40)
                <p className={styles.colLeftSub}>50M Rifle Record (3x40)</p>
              </Form.Label>{' '}
            </Col>
            <Col lg='7'>
              <FormControl
                id='best50M3x40'
                type='text'
                className={styles.colRightMain}
                name='best50M3x40'
                onChange={handleInputChange}
                value={values.best50M3x40}
              />
              <Form.Label className={styles.colRightSub}>{errors.ChineseName}</Form.Label>{' '}
            </Col>
            <Col lg='5'>
              <Form.Label htmlFor='best50M3x40Level' className={styles.colLeftMain}>
                在哪一層級之賽事達到該成績
                <p className={styles.colLeftSub}>Record Broken in What Level</p>
              </Form.Label>{' '}
            </Col>
            <Col lg='7'>
              <Select
                placeholder='Select Level'
                className={styles.rightSelect}
                name='best50M3x40Level'
                value={selBest50M3x40Level}
                autosize={true}
                id='best50M3x40Level'
                options={optionsGameLevel}
              />
            </Col>
            <Col lg='5'>
              <Form.Label htmlFor='best50M3x40Date' className={styles.colLeftMain}>
                比賽日期
                <p className={styles.colLeftSub}>Date</p>
              </Form.Label>{' '}
            </Col>
            <Col lg='7'>
              <DatePicker
                name='best50M3x40Date'
                className={styles.rightSelect}
                selected={best50M3x40Date}
                onChange={(date) => {
                  setLatestGameDate(new Date(date));
                  values.best50M3x40Date = date;
                }}
                showYearDropdown
                dateFormatCalendar='MMMM'
                scrollableYearDropdown
              />
              <Form.Label className={styles.colRightSub}>{errors.ChineseName}</Form.Label>{' '}
            </Col>
            <Col lg='5'>
              <Form.Label htmlFor='best50M3x20' className={styles.colLeftMain}>
                50米生涯最佳成績(3x20)
                <p className={styles.colLeftSub}>50M Rifle Record (3x20)</p>
              </Form.Label>{' '}
            </Col>
            <Col lg='7'>
              <FormControl
                id='best50M3x20'
                type='text'
                className={styles.colRightMain}
                name='best50M3x20'
                onChange={handleInputChange}
                value={values.best50M3x20}
              />
              <Form.Label className={styles.colRightSub}>{errors.ChineseName}</Form.Label>{' '}
            </Col>
            <Col lg='5'>
              <Form.Label htmlFor='best50M3x20Level' className={styles.colLeftMain}>
                在哪一層級之賽事達到該成績
                <p className={styles.colLeftSub}>Record Broken in What Level</p>
              </Form.Label>{' '}
            </Col>
            <Col lg='7'>
              <Select
                placeholder='Select Level'
                className={styles.rightSelect}
                name='best50M3x20Level'
                value={selBest50M3x20Level}
                autosize={true}
                id='best50M3x20Level'
                options={optionsGameLevel}
              />
            </Col>
            <Col lg='5'>
              <Form.Label htmlFor='best50M3x20Date' className={styles.colLeftMain}>
                比賽日期
                <p className={styles.colLeftSub}>Date</p>
              </Form.Label>{' '}
            </Col>
            <Col lg='7'>
              <DatePicker
                name='best50M3x20Date'
                className={styles.rightSelect}
                selected={best50M3x20Date}
                onChange={(date) => {
                  setLatestGameDate(new Date(date));
                  values.best50M3x20Date = date;
                }}
                showYearDropdown
                dateFormatCalendar='MMMM'
                scrollableYearDropdown
              />
              <Form.Label className={styles.colRightSub}>{errors.ChineseName}</Form.Label>{' '}
            </Col>
            <Col lg='5'>
              <Form.Label htmlFor='rankNational' className={styles.colLeftMain}>
                國內排名
                <p className={styles.colLeftSub}>National Rank</p>
              </Form.Label>{' '}
            </Col>
            <Col lg='7'>
              <FormControl
                id='rankNational'
                type='number'
                className={styles.colRightMain}
                name='rankNational'
                onChange={handleInputChange}
                value={values.rankNational}
              />
              <Form.Label className={styles.colRightSub}>{errors.Height}</Form.Label>{' '}
            </Col>
            <Col lg='5'>
              <Form.Label htmlFor='rankWorld' className={styles.colLeftMain}>
                世界排名
                <p className={styles.colLeftSub}>World Rank</p>
              </Form.Label>{' '}
            </Col>
            <Col lg='7'>
              <FormControl
                id='rankWorld'
                type='number'
                className={styles.colRightMain}
                name='rankWorld'
                onChange={handleInputChange}
                value={values.rankWorld}
              />
              <Form.Label className={styles.colRightSub}>{errors.Weight}</Form.Label>{' '}
            </Col>
            <Col lg='5'>
              <Form.Label htmlFor='linkISSF' className={styles.colLeftMain}>
                ISSF 官網選手連結
                <p className={styles.colLeftSub}>ISSF Profile Link</p>
              </Form.Label>{' '}
            </Col>
            <Col lg='7'>
              <FormControl
                id='linkISSF'
                type='text'
                className={styles.colRightMain}
                name='linkISSF'
                onChange={handleInputChange}
                value={values.linkISSF}
              />
              <Form.Label className={styles.colRightSub}>{errors.ChineseName}</Form.Label>{' '}
            </Col>
            <Col lg='5'>
              <Form.Label htmlFor='linkVideo' className={styles.colLeftMain}>
                比賽或訓練影片
                <p className={styles.colLeftSub}>Showcasing Vidoes</p>
              </Form.Label>{' '}
            </Col>
            <Col lg='7'>
              <FormControl
                id='linkVideo'
                type='text'
                className={styles.colRightMain}
                name='linkVideo'
                onChange={handleInputChange}
                value={values.linkVideo}
              />
              <Form.Label className={styles.colRightSub}>{errors.ChineseName}</Form.Label>{' '}
            </Col>
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
