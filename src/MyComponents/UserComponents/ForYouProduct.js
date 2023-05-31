import React, { useEffect, useState } from "react";
import "./style.css";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import { Link } from "react-router-dom";

export default function ForYouProduct(props) {

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
  return (
    <div>
       <div className='topcatagories'>
        <h3>Our Products <span>Just For You</span> </h3>
      </div>
      <div className="flashsale">
        {data.slice(0,props.display).map((items) =>{
          const markedprice = Math.floor(parseInt(items.price) - 0.14 * parseInt(items.price));
          const discountamount = Math.floor(items.price - markedprice)
          return (
            <Link
              key={items.id}
              to={`/${items.category}/${items.id}`}
              className="flashsaleone" onClick={handleScrollToTop}
            >
              <div className="flashsaleimg">
                <img src={items.img} alt="" />
              </div>
              <h2>{items.desc && items.desc.slice(0,18)}</h2>
              <div className="flashsaleprice">
                <h3>Rs {markedprice}</h3>
                <h4>Rs{items.price}</h4>
              </div>
              <h5>Save - Rs {discountamount}</h5>
            </Link>
          )
        })}
      </div>
      
    </div>
  )
}
