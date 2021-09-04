import Link from 'next/link';
import { Navbar, Button, Tabs, Tab, Container, Nav } from 'react-bootstrap';
import styles from '../styles/Nav.module.css';
import { useState, useEffect, useReducer, useContext } from 'react';
import { Context } from './stores';
import { useRouter } from 'next/router';
const NavSwap = () => {
  const router = useRouter();

  const handleButtonClick = (event, path) => {
    // console.log(event);
    // console.log(path);
    event.preventDefault();
    router.push(path);
  };

  const { member, setMember, sportItem, setSportItem } = useContext(Context);
  if (sportItem === 'baseball') {
    return (
      <Button
        size='sm'
        variant='light'
        onClick={(e) => handleButtonClick(e, '/baseball')}
        className={member === '' ? 'disabled' : 'disabled:false'}
      >
        <span>
          成績及運動表現 <br></br>Physical Performance
        </span>
      </Button>
    );
  }
  if (sportItem === 'shooting') {
    return (
      <Button
        size='sm'
        variant='light'
        onClick={(e) => handleButtonClick(e, '/shooting')}
        className={member === '' ? 'disabled' : 'disabled:false'}
      >
        <span>
          射擊成績 <br></br>Shooting
        </span>
      </Button>
    );
  }
  return;
};

export default NavSwap;
