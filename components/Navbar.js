import { Navbar, Button, ButtonGroup, Container, Nav } from "react-bootstrap";
import styles from "../styles/Nav.module.css";
import { Context } from "./stores";
import { useState, useEffect, useReducer, useContext } from "react";
import NavSwap from "./NavSwap";
import { useRouter } from "next/router";

const AppNavbar = () => {
  const { member, setMember, sportItem, setSportItem } = useContext(Context);
  const router = useRouter();
  //console.log(member);
  //console.log('Nav-----------');
  //console.log(sportItem);

  const handleButtonClick = (event, path) => {
    // console.log(event);
    // console.log(path);
    event.preventDefault();
    router.push(path);
  };

  return (
    <>
      <ButtonGroup className={styles.navbar}>
        <Button
          size="sm"
          id="login"
          variant="light"
          onClick={(e) => handleButtonClick(e, "/")}
        >
          <span>
            帳號建立<br></br>Sign Up for Free
          </span>
        </Button>
        <Button
          size="sm"
          variant="light"
          onClick={(e) => handleButtonClick(e, "/")}
          className={member === "" ? "disabled" : "disabled:false"}
        >
          <span>
            基本資料 <br></br>Basic Info
          </span>
        </Button>
        <NavSwap />
        <Button
          size="sm"
          variant="light"
          onClick={(e) => handleButtonClick(e, "/contacts")}
          className={member === "" ? "disabled" : "disabled:false"}
        >
          <span>
            聯繫資料 <br></br>Contact
          </span>
        </Button>
        <Button
          size="sm"
          variant="light"
          onClick={(e) => handleButtonClick(e, "/subjects")}
          className={member === "" ? "disabled" : "disabled:false"}
        >
          <span>
            學科相關成績 <br></br>Academic Achievements
          </span>
        </Button>
        <Button
          size="sm"
          variant="light"
          onClick={(e) => handleButtonClick(e, "/confirm")}
          className={member === "" ? "disabled" : "disabled:false"}
        >
          <span>
            確認送出 <br></br>Submit
          </span>
        </Button>
      </ButtonGroup>
    </>
  );
};

export default AppNavbar;
