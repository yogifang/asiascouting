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
const initialFValues = {
  _id: '',
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
  member: '',
};
const optionsPosition = [
  { value: 'P', label: '投手' },
  { value: 'C', label: '捕手' },
  { value: '1B', label: '一壘手' },
  { value: '2B', label: '二壘手' },
  { value: '3B', label: '三壘手' },
  { value: 'SS', label: '游擊手' },
  { value: 'LF', label: '左外野手' },
  { value: 'CF', label: '中外野手' },
  { value: 'RF', label: '右外野手' },
  { value: 'DH', label: '指定打擊' },
];

const optionsHands = [
  { value: 'LPLH', label: '左投左打' },
  { value: 'RPRH', label: '右投右打' },
  { value: 'LPRH', label: '左投右打' },
  { value: 'RPLH', label: '右投左打' },
];

const optionsGrads = [
  { value: 'G1', label: '小學一年級' },
  { value: 'G2', label: '小學二年級' },
  { value: 'G3', label: '小學三年級' },
  { value: 'G4', label: '小學四年級' },
  { value: 'G5', label: '小學五年級' },
  { value: 'G6', label: '小學六年級' },
  { value: 'G7', label: '國中一年級' },
  { value: 'G8', label: '國中二年級' },
  { value: 'G9', label: '國中三年級' },
  { value: 'G10', label: '高中一年級' },
  { value: 'G11', label: '高中二年級' },
  { value: 'G12', label: '高中三年級' },
  { value: 'G13', label: '大學' },
];

const BasicInfo = () => {
  const { member, setMember } = useContext(Context);
  const [radioGenger, setRadioGender] = useState('Male');
  const [selPriPosition, setSelPriPosition] = useState(optionsPosition[0]);
  const [selSecPosition, setSelSecPosition] = useState(optionsPosition[1]);
  const [selHands, setSelHands] = useState(optionsHands[0]);
  const [selGrads, setSelGrads] = useState(optionsGrads[0]);
  const [dateGrad, setDateGrad] = useState(new Date());
  const [loaded, setLoaded] = useState(false);
  const findIndexByValue = (options, value) => {
    const index = options.findIndex((options) => options.value === value);
    return index;
    //console.log(options[4].label);
  };

  useEffect(() => {
    const getBasicInfo = async () => {
      try {
        const url = process.env.HOST_URI + `api/baseballInfo/${member}`;
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const Data = await res.json();
        console.log(Data);
        let field;
        let nValues = {};
        for (field in values) {
          //  console.log(field);
          console.log(Data.data[field]);
          nValues[field] = Data.data[field];
          // setValues(field, Data.data[field]);
        }
        console.log(nValues);
        setValues(nValues);
        let index = findIndexByValue(optionsPosition, nValues.PriPosition);
        setSelPriPosition(optionsPosition[index]);
        index = findIndexByValue(optionsPosition, nValues.SecPosition);
        setSelSecPosition(optionsPosition[index]);
        index = findIndexByValue(optionsHands, nValues.LeftRightHand);
        setSelHands(optionsHands[index]);
        index = findIndexByValue(optionsGrads, nValues.currentGrad);
        setSelGrads(optionsGrads[index]);
        setRadioGender(nValues.Gender);
        setDateGrad(new Date(nValues.GradDate));
        setLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    if (!loaded) {
      getBasicInfo();
    }
  }, []);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ('ChineseName' in fieldValues) temp.ChineseName = fieldValues.ChineseName ? '' : '此欄位不得空白。';
    if ('PassportName' in fieldValues) temp.PassportName = fieldValues.PassportName ? '' : '此欄位不得空白。';
    if ('Height' in fieldValues) temp.Height = fieldValues.Height ? '' : '此欄位不得空白。';
    if ('Weight' in fieldValues) temp.Weight = fieldValues.Weight ? '' : '此欄位不得空白。';
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

  const handleRadioGender = (e) => {
    setRadioGender(e.target.name);
    //console.log(e.target);
    values.Gender = e.target.value;
  };

  const handleSetDate = (e) => {
    // console.log(e);
    values.GradDate = e;
    setDateGrad(e);
  };

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
        <Row>
          <p className={styles.textorange}>若以下資料有不便回答者 可填入N</p>
          <Col lg='5'>
            <Form.Label htmlFor='ChineseName' className={styles.colLeftMain}>
              *中文姓名
              <p className={styles.colLeftSub}>*Preferred Name</p>
            </Form.Label>{' '}
          </Col>
          <Col lg='7'>
            <FormControl
              id='ChineseName'
              type='text'
              className={styles.colRightMain}
              name='ChineseName'
              onChange={handleInputChange}
              value={values.ChineseName}
            />
            <Form.Label className={styles.colRightSub}>{errors.ChineseName}</Form.Label>{' '}
          </Col>

          <Col lg='5'>
            <Form.Label htmlFor='PassportName' className={styles.colLeftMain}>
              *護照英文名
              <p className={styles.colLeftSub}>*First Name and Last Name</p>
            </Form.Label>{' '}
          </Col>
          <Col lg='7'>
            <FormControl
              id='PassportName'
              type='text'
              className={styles.colRightMain}
              name='PassportName'
              onChange={handleInputChange}
              value={values.PassportName}
            />
            <Form.Label className={styles.colRightSub}>{errors.PassportName}</Form.Label>{' '}
          </Col>

          <Col lg='5'>
            <Form.Label type='radio' className={styles.colLeftMain}>
              *性別
              <p className={styles.colLeftSub}>*Sex</p>
            </Form.Label>
          </Col>
          <Col lg='7'>
            <Form>
              <div key={`inline-radio`} className='mb-3' id='genderSel'>
                <Form.Check
                  inline
                  label='男'
                  name='Male'
                  type={'radio'}
                  id={`inline-radio-1`}
                  checked={radioGenger === 'Male'}
                  onChange={handleRadioGender}
                />
                <Form.Check
                  inline
                  label='女'
                  name='Female'
                  type={'radio'}
                  id={`inline-radio-2`}
                  checked={radioGenger === 'Female'}
                  onChange={handleRadioGender}
                />
                <Form.Check
                  inline
                  label='其它'
                  name='Others'
                  type={'radio'}
                  id={`inline-radio-3`}
                  checked={radioGenger === 'Others'}
                  onChange={handleRadioGender}
                />
              </div>
            </Form>
          </Col>

          <Col lg='5'>
            <Form.Label htmlFor='Height' className={styles.colLeftMain}>
              身高(公分)
              <p className={styles.colLeftSub}>Height (cm)</p>
            </Form.Label>{' '}
          </Col>
          <Col lg='7'>
            <FormControl
              id='Height'
              type='number'
              className={styles.colRightMain}
              name='Height'
              onChange={handleInputChange}
              value={values.Height}
            />
            <Form.Label className={styles.colRightSub}>{errors.Height}</Form.Label>{' '}
          </Col>
          <Col lg='5'>
            <Form.Label htmlFor='Weight' className={styles.colLeftMain}>
              體重(公斤)
              <p className={styles.colLeftSub}>Weight(kg)</p>
            </Form.Label>{' '}
          </Col>
          <Col lg='7'>
            <FormControl
              id='Weight'
              type='number'
              className={styles.colRightMain}
              name='Weight'
              onChange={handleInputChange}
              value={values.Weight}
            />
            <Form.Label className={styles.colRightSub}>{errors.Weight}</Form.Label>{' '}
          </Col>
          <Col lg='5'>
            <Form.Label htmlFor='currentGrad' className={styles.colLeftMain}>
              年級
              <p className={styles.colLeftSub}>School Grad Year</p>
            </Form.Label>{' '}
          </Col>
          <Col lg='7'>
            <Select
              placeholder='Select Grad'
              className={styles.rightSelect}
              name='currentGrad'
              value={selGrads}
              autosize={true}
              id='currentGrad'
              options={optionsGrads}
            />
          </Col>
          <Col lg='5'>
            <Form.Label htmlFor='GradDate' className={styles.colLeftMain}>
              高中預計畢業日期(年月)
              <p className={styles.colLeftSub}>High School Expected Graduation Date</p>
            </Form.Label>{' '}
          </Col>
          <Col lg='7'>
            <DatePicker
              id='GradDate'
              className={styles.rightSelect}
              selected={dateGrad}
              onChange={handleSetDate}
              name='GradDate'
              dateFormat='MM/yyyy'
              showMonthYearPicker
            />
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
    </Container>
  );
};

export default BasicInfo;
