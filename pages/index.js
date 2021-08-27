import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Button, Card, Form } from 'react-bootstrap';
import { useState, useEffect, useReducer, createContext } from "react";
import {Container } from 'react-bootstrap'



export default function Home() {
  return (
    <Container  className={styles.container }>
    
      <h1>Hello World</h1>
    </Container>
  )
}
