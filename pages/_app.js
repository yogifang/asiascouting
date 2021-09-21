// add bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import Context from "../components/stores";
import { useState, useEffect, useReducer, useContext } from "react";

function MyApp({ Component, pageProps }) {
  const [member, setMember] = useState("");
  const [sportItem, setSportItem] = useState("baseball");
  const [stage , setStage] = useState(0) ;
  // stage means create step  0 for create 1 basic info 2 performance 3 contacts 4 subject etc.....


  return (
    <>
      <Context.Provider value={{ member, setMember, sportItem, setSportItem ,stage , setStage  }}>
        <Component {...pageProps} />
      </Context.Provider>
    </>
  );
}

export default MyApp;
