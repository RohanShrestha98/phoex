import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { db } from '../../FirebaseConfig';
import Header from "./Header"
import "./style.css"

export default function ProductCatagory() {
  window.scrollTo(0,0)
    const [data, setData] = useState([]);
    const location = useLocation()
    const [loading, setLoading] = useState(true);
    const [category,setCatagory]= useState("")

    useEffect(()=>{
        if(location.pathname === "/Iphone"){
            setCatagory("Iphone")
        }else if(location.pathname === "/Samsung"){
          setCatagory("Samsung")
        }else if(location.pathname === "/Realme"){
          setCatagory("Realme")
        }else if(location.pathname === "/Readme"){
          setCatagory("Readme")
        }else if(location.pathname === "/Vivo"){
          setCatagory("Vivo")
        }
    },[location])

    useEffect(() => {
      const q = query(collection(db, 'post'), where('category', '==', category));
      const unsub = onSnapshot(
        q,
        (snapShot) => {
          let list = [];
          snapShot.docs.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() });
          });
          setLoading(false)
          setData(list);
        },
        (error) => {
          console.log(error);
        }
      );
  
      return () => {
        unsub();
      };
    }, [category]);
    console.log("catagory",category)

    console.log("data",data)

    const handleScrollToTop = () => {
      window.scrollTo(0, 0);
    };
  return (
    <div>
      <Header/>
      <div className="systemNavigation">
        <Link className="systemnavigationone" to="/">
          Home
        </Link>{" "}
        <i class="fa-solid fa-angle-right"></i>
        <Link className="systemnavigationone" to={`/${category}`}>
          {category}
        </Link>
      </div>
      <div className='category'>
        <div className='categoryLeft'>

        </div>
        <div className='categoryRight'>
      {
       data.map((items)=>{
        const markedprice = Math.floor(parseInt(items.price) - 0.14 * parseInt(items.price));
        const discountamount = Math.floor(items.price - markedprice)
        return(
        <Link
        key={items.id}
        to={`/${items.category}/${items.id}`}
        className="flashsaleone categoryRightOne" onClick={handleScrollToTop}
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
        )})
      }
      {
        loading && <p>Loading ...</p>
      }
       </div>
       </div>
    </div>
  )
}
