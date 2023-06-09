import React, { useEffect, useState } from "react";
import "./style.css";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import { Link } from "react-router-dom";

export default function FlashSale() {
  const initialCountdown = localStorage.getItem("countdown") || 12 * 60 * 60;
  const [countdown, setCountdown] = useState(initialCountdown);
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 0) {
          return initialCountdown;
        } else {
          return prevCountdown - 1;
        }
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      localStorage.setItem("countdown", countdown);
    };
  }, [initialCountdown]);

  const hours = Math.floor(countdown / 3600);
  const minutes = Math.floor((countdown % 3600) / 60);
  const seconds = countdown % 60;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "post"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setLoading(false);
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };

  let itemsPerRow;
  if (window.innerWidth >= 1200) {
    itemsPerRow = 5;
  } else if (window.innerWidth >= 915) {
    itemsPerRow = 4;
  } else if (window.innerWidth >= 651) {
    itemsPerRow = 3;
  } else {
    itemsPerRow = 2;
  }

  return (
    <>
      <div className="flashsaleheading">
        <h3>Sale for the Day</h3>
        <h1>Flash Sale</h1>
        <div>
          {hours.toString().padStart(2, "0")}:
          {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
        </div>
      </div>
      <div className="flashsale">
        {data.slice(0, itemsPerRow).map((items) => {
          const markedprice = Math.floor(
            parseInt(items.price) - 0.14 * parseInt(items.price)
          );
          const discountamount = Math.floor(items.price - markedprice);
          return (
            <Link
              key={items.id}
              to={`${items.category}/${items.id}`}
              className="flashsaleone"
              onClick={handleScrollToTop}
            >
              <div className="flashsaleimg">
                <img src={items.img} alt="" />
              </div>
              <h2>{items.desc && items.desc.slice(0, 18)}</h2>
              <div className="flashsaleprice">
                <h3>Rs {markedprice}</h3>
                <h4>Rs{items.price}</h4>
              </div>
              <h5>Save - Rs {discountamount}</h5>
            </Link>
          );
        })}
      </div>
    </>
  );
}
