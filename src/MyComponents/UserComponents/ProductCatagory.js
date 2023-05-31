import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { db } from '../../FirebaseConfig';
import Header from "./Header"

export default function ProductCatagory() {
  window.scrollTo(0,0)
    const [data, setData] = useState([]);
    const location = useLocation()
    const [loading, setLoading] = useState(true);
    const [catagory,setCatagory]= useState("")

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
      const q = query(collection(db, 'post'), where('category', '==', catagory));
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
    }, [catagory]);

    console.log("data",data)
  return (
    <div>
      <Header/>
      <div className="systemNavigation">
        <Link className="systemnavigationone" to="/">
          Home
        </Link>{" "}
        <i class="fa-solid fa-angle-right"></i>
        <Link className="systemnavigationone" to={`/${data.category}`}>
          {data.category}
        </Link>
      </div>
      {
       data.map((items)=>(
            <div key={items.id}>
                <p>{items.desc}</p>
            </div>
        ))
      }
      {
        loading && <p>Loading ...</p>
      }
    </div>
  )
}
