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
          棒球運動表現 <br></br> Baseball Performance
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
          射擊成績 <br></br>Shooting Performance
        </span>
      </Button>
    );
  }
  if (sportItem === 'athletics') {
    return (
      <Button
        size='sm'
        variant='light'
        onClick={(e) => handleButtonClick(e, '/athletics')}
        className={member === '' ? 'disabled' : 'disabled:false'}
      >
        <span>
          田徑成績<br></br>Athletics Performance
        </span>
      </Button>
    );
  }
  if (sportItem === 'tennis') {
    return (
      <Button
        size='sm'
        variant='light'
        onClick={(e) => handleButtonClick(e, '/tennis')}
        className={member === '' ? 'disabled' : 'disabled:false'}
      >
        <span>
          網球成績<br></br>Tennis Performance
        </span>
      </Button>
    );
  }
  return;
};

export default NavSwap;
