import React, { useEffect, useState } from "react";
import "../UserComponents/style.css";
import { Link } from "react-router-dom";
import { db } from "../../FirebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import Header from "../UserComponents/Header";
import { doc, updateDoc } from "firebase/firestore";

export default function PlacedOrder() {
  const [tracking, setTracking] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "buynow"),
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
  }, []);

  useEffect(() => {
    let alltotal = 0;
    tracking.forEach((item) => {
      let subtotal = 0;
      item.info.forEach((items) => {
        subtotal += items.item.price * items.item.quantity;
      });
      alltotal += subtotal;
    });
    setTotalPrice(alltotal);
  }, [tracking]);

  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const handleUpdateStatus = async (documentId) => {
    const washingtonRef = doc(db, "buynow", documentId);

    try {
      await updateDoc(washingtonRef, {
        status: "Product packed",
      });
      console.log("Status updated successfully");
    } catch (error) {
      console.log("Error updating status:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="yourCartSummary">
        <div className="yourCart">
          {tracking.map((item) => {
            const info = [item.info];
            return (
              <React.Fragment key={item.id}>
                {info.map((items) => {
                  const details = items.map((element) => element.item);
                  return (
                    <React.Fragment key={items.id}>
                      {details.map((items2) => {
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
                                    {items2.desc && items2.desc.slice(0, 30)}
                                    {items2.desc &&
                                      items2.desc.slice(0, 30) && <>...</>}
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
                                <div>
                                  <p>{item.name}</p>
                                  <p>{item.phoneno}</p>
                                  <p
                                    onClick={() => handleUpdateStatus(item.id)}
                                  >
                                    Update Status
                                  </p>
                                </div>
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

              <div className="subTotalOne">
                <h2>Total Price</h2>
                <h2>Rs {totalPrice}</h2>
              </div>
              <Link to="/yourorder">Submit</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
