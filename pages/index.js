import styles from '../styles/Contant.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import Login from '../components/login';
import Create from '../components/create';
import { Button, Grid, Form, Nav, Row, Col, Container, Spinner, ButtonGroup } from 'react-bootstrap';
import { useState, useEffect, useReducer, useContext } from 'react';
import { Context } from '../components/stores';
import Navbar from '../components/Navbar';
import GoogleLogin from 'react-google-login';
import { useRouter } from "next/router";

export default function Home() {
  const [login, setLogin] = useState(false);
  const [typeLogin, setTypeLogin] = useState('');

  const router = useRouter();
  const { member, setMember, sportItem, setSportItem } = useContext(Context);

  const validate = (fieldValues = values) => { };
  const handleCreate = () => {
    setLogin(true);
    setTypeLogin('create');
  };

  const handleLogin = () => {
    setLogin(true);
    setTypeLogin('login');
  };

  const checkExistMember = async (
    member
  ) => {
    const params = member + `&` + 'Google';
    const url = process.env.HOST_URI + `api/members/` + params;
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const record = await res.json();
      if (record.success === false) {
        setLogin(false);
        // alert("帳號不存在或密碼錯誤！！");
        setMember(member);
        router.push("/createSocial");
        return;
      }
      setMember(record.data.email);
      setSportItem(record.data.sportItem);
      router.push("/basicinfo");
    } catch (err) {
      alert("讀取錯誤！請檢查連線！");
      console.log(err);
      return;
    }
  };



  const responseGoogle = (response) => {
    // console.log(response);
    // console.log(response)  console.log(response.Ws.Ht);
    setLogin(true);
    checkExistMember(response.Ws.Ht);
  }

  const responseGoogleFailure = () => {
    setLogin(false);
  }

  const switchRender = () => {
    //  console.log(typeLogin);
    switch (typeLogin) {
      case 'login':
        //  console.log('switch....login....');
        return <Login />;
        break;
      case 'create':
        return <Create />;
        break;
      default:
        break;
    }
  };
  return (
    <Container className={styles.container}>
      <Navbar />
      {!login ? (
        <Row>
          <Col>
            <Button
              justification='right'
              variant='secondary'
              className={styles.btnAppCreate}
              onClick={handleCreate}
            ></Button>{' '}
          </Col>
          <Col>
            <Button
              justification='left'
              variant='secondary'
              className={styles.btnAppLogin}
              onClick={handleLogin}
            ></Button>{' '}
          </Col>
          <Col>
            <GoogleLogin
              clientId="21388016179-jbj4asio15vq3n5g7ict9k0ph5gj6oqo.apps.googleusercontent.com"
              icon={false}
              onSuccess={responseGoogle}
              onFailure={responseGoogleFailure}
              buttonText=""
              className={styles.btnGoogleLogin}
              cookiePolicy={'single_host_origin'}
            />
          </Col>
        </Row>

      ) : (
        <>{switchRender()}</>
      )}
    </Container>
  );
}
