import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../FirebaseConfig";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "./style.css";

export default function Login(props) {
  const [data, setData] = useState([]);
  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };

  const haldleLogin = () => {
    localStorage.setItem("login", JSON.stringify(data));
    window.location.reload();
  };
  return (
    <div className="login">
      <div className="loginFields">
        <h1>Phonex</h1>
        <h3>Signup to your Account </h3>
        <div className="informationfields">
          <h2>Name</h2>
          <input
            type="text"
            onChange={handleInput}
            id="name"
            placeholder="Enter your name"
          />
        </div>
        <div className="informationfields">
          <h2>Number</h2>
          <input
            type="text"
            onChange={handleInput}
            id="phoneno"
            placeholder="Enter your number"
          />
        </div>
        <div className="informationfields">
          <h2>Address</h2>
          <input
            type="text"
            onChange={handleInput}
            id="address"
            placeholder="Enter your address"
          />
        </div>
        <button onClick={haldleLogin}>Submit</button>
      </div>
    </div>
  );
}
