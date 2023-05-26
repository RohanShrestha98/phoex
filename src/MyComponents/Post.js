import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { auth, db, storage } from "../FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";

export default function Post() {
  const [eye, setEye] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
 
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPerc] = useState(null);

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);


  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!data.name) {
      setError("Name Field is required");
    } else if (!data.password) {
      setError("Password is required");
    } else if (data.password !== data.conformpassword) {
      setError("Password doesnot match");
    } else {
      try {
        const res = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
        await setDoc(doc(db, "user", res.user.uid), {
          ...data,
          timestamp: serverTimestamp()
        });

        toast.success("Data Regester to our System");
        navigate("/userlogin");
      } catch (err) {
        toast.error("Data is already in our system");
        console.log(err);
      }
    }
  };

  return (
    <>
      <div>
        <form className="PhoneNumberLogin">
          <div id="recaptcha-container"></div>
          <div className="logo">
            <img src="img/logo.png" alt="" />
          </div>
            <>
              <p>Name</p>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                onChange={handleInput}
              />

              <p>Email Address</p>
              <input
                id="email"
                type="text"
                placeholder="Enter your email address"
                onChange={handleInput}
              />
              <p>Password</p>
              <div className="password">
                <input
                  type={eye ? "password" : "text"}
                  id="password"
                  onChange={handleInput}
                  placeholder="Enter your password"
                />
                <i
                  class="fa-solid fa-eye"
                  onClick={(e) => setEye((prev) => !prev)}
                ></i>
              </div>
              <p>Conform Password</p>
              <div className="password">
                <input
                  type={eye ? "password" : "text"}
                  id="conformpassword"
                  onChange={handleInput}
                  placeholder="Retype your password"
                />
                <i
                  class="fa-solid fa-eye"
                  onClick={(e) => setEye((prev) => !prev)}
                ></i>
              </div>
              <span>{error}</span>
            </>
          
            <button onClick={handleAdd}>Submit</button>
          
          <Link to="/userlogin" className="alreadyhaveacc">
            <p>Already have Account</p>{" "}
          </Link>
        </form>
      </div>
    </>
  );
}
