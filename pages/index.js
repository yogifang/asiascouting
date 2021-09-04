import styles from '../styles/Contant.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import Login from '../components/login';
import Create from '../components/create';
import { Button, Grid, Form, Nav, Row, Col, Container, Spinner, ButtonGroup } from 'react-bootstrap';
import { useState, useEffect, useReducer, useContext } from 'react';
import { Context } from '../components/stores';
import Navbar from '../components/Navbar';

export default function Home() {
  const [login, setLogin] = useState(false);
  const [typeLogin, setTypeLogin] = useState('');
  const { member, setMember } = useContext(Context);
  const handleCreate = () => {
    setLogin(true);
    setTypeLogin('create');
  };

  const handleLogin = () => {
    setLogin(true);
    setTypeLogin('login');
  };

  const handleGoogleLogin = () => {
    setLogin(true);
    setTypeLogin('google');
  };

  const switchRender = () => {
    console.log(typeLogin);
    switch (typeLogin) {
      case 'login':
        console.log('switch....login....');
        return <Login />;
        break;
      case 'create':
        return <Create />;
        break;
      case 'google':
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
            <Button variant='secondary' onClick={handleGoogleLogin}>
              Google Login
            </Button>{' '}
          </Col>
        </Row>
      ) : (
        <>{switchRender()}</>
      )}
    </Container>
  );
}
