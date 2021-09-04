// add bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import Context from '../components/stores';
import { useState, useEffect, useReducer, useContext } from 'react';
import { AppWrapper } from '../components/AppContext'; // import based on where you put it

function MyApp({ Component, pageProps }) {
  const [member, setMember] = useState('');
  const [sportItem, setSportItem] = useState('baseball');
  console.log('appjs============');
  return (
    <>
      <Context.Provider value={{ member, setMember, sportItem, setSportItem }}>
        <Component {...pageProps} />
      </Context.Provider>
    </>
  );
}

export default MyApp;
