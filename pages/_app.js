// add bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import Context from "../components/stores";
import { useState, useEffect, useReducer, useContext } from "react";

function MyApp({ Component, pageProps }) {
  const [member, setMember] = useState("");
  const [sportItem, setSportItem] = useState("baseball");


  return (
    <>
      <Context.Provider value={{ member, setMember, sportItem, setSportItem }}>
        <Component {...pageProps} />
      </Context.Provider>
    </>
  );
}

export default MyApp;
