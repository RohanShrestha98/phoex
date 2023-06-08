import React, { useEffect, useState } from "react";
import "./style.css";
import Header from "./Header";
import { Link } from "react-router-dom";
import { db } from "../../FirebaseConfig";
import { collection, onSnapshot, query, where } from "firebase/firestore";

export default function TrackOrder() {
  const [tracking, setTracking] = useState([]);
  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };
  const [loginData, setLoginData] = useState([]);

  useEffect(() => {
    const storedLoginData = localStorage.getItem("login");
    if (storedLoginData) {
      const parsedLoginData = JSON.parse(storedLoginData);
      setLoginData(parsedLoginData);
    }
  }, []);

  useEffect(() => {
    if (loginData.phoneno) {
      const q = query(
        collection(db, "buynow"),
        where("phoneno", "==", loginData.phoneno)
      );
      const unsub = onSnapshot(
        q,
        (snapShot) => {
          let list = [];
          snapShot.docs.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() });
          });
          setTracking(list);
        },
        (error) => {
          console.log(error);
        }
      );

      return () => {
        unsub();
      };
    }
  }, [loginData]);

  console.log("tracking", tracking);

  return (
    <div>
      <Header />
      <div className="yourCartSummary">
        <div className="yourCart">
          {tracking &&
            tracking.map((item) => {
              console.log("status", item.status);
              const info = [item.info];
              console.log("info", info);
              return (
                <React.Fragment key={item.id}>
                  {info &&
                    info.map((items) => {
                      const details = items.map((element) => element.item);
                      console.log("details", details);
                      return (
                        <React.Fragment key={items.id}>
                          {details &&
                            details.map((items2) => {
                              const price = items2.quantity * items2.price;
                              if (items2) {
                                return (
                                  <div className="yourCartOne" key={items2.id}>
                                    <Link
                                      to={`/${items.category}/${items2.id}`}
                                      onClick={handleScrollToTop}
                                      className="yourCartOneImg"
                                    >
                                      <img src={items2.img} alt="" />
                                    </Link>
                                    <div className="yourCartOneDesc">
                                      <div className="yourCartOneNameQuantityCheckBox">
                                        <Link
                                          to={`/${items2.category}/${items2.id}`}
                                          onClick={handleScrollToTop}
                                          className="yourCartOneNameQuantityCheckBoxDesc"
                                        >
                                          {items2.desc &&
                                            items2.desc.slice(0, 30)}
                                          {items2.desc &&
                                            items2.desc.slice(0, 30) && (
                                              <>...</>
                                            )}
                                        </Link>
                                        <p>{item.status}</p>
                                        <p>{items2.quantity}</p>
                                        <div>Rs {price}</div>
                                      </div>
                                      <Link
                                        to={`/${items2.category}/${items2.id}`}
                                        className="yourCartOneDescP"
                                        onClick={handleScrollToTop}
                                      >
                                        {items2.battery} {items2.charging}{" "}
                                        {items2.ramdesc} {items2.romdesc}{" "}
                                        {items2.frontcamera} {items2.gpu}
                                      </Link>
                                    </div>
                                  </div>
                                );
                              }
                              return null;
                            })}
                        </React.Fragment>
                      );
                    })}
                </React.Fragment>
              );
            })}
        </div>
        <div className="OrderSummary">
          <div className="summary">
            <h1>Order Summary</h1>
            <div className="subTotal">
              <div className="subTotalOne">
                <h2>Sub Total {tracking.length} product</h2>
                <h2>Rs 29999</h2>
              </div>
              <div className="subTotalOne">
                <h2>Shipping Charges</h2>
                <h2>Rs 100</h2>
              </div>
              <Link to="/yourorder">Submit</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
