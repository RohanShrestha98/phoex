import React, { useEffect, useState } from 'react'
import "./style.css"
import { Link, useLocation } from 'react-router-dom'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../../FirebaseConfig'

export default function Header() {
  const [sidebar,setSideBar] = useState(false)
  const [cartbar,setCartBar] = useState(false)
  const location = useLocation();
  const [data, setData] = useState([]);
  const[loading,setLoading]=useState(true)

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db,"post" ),
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
  }, []);
  
const navigation = [
  {
    id:1,
    category:"Iphone"
  },
  {
    id:2,
    category:"Samsung"
  },
  {
    id:3,
    category:"Realme"
  },
  {
    id:4,
    category:"Readme"
  },
  {
    id:5,
    category:"Vivo"
  }
]

  return (
    <>
    {
      sidebar &&  
      <div className='sideBar'>
        <p  onClick={()=>setSideBar(false)} >Cross</p>
      </div>
    }

{
      cartbar &&  
      <div className='cartBar'>
        <p  onClick={()=>setCartBar(false)} >Cross</p>
      </div>
    }
   
      <div className='toptracking'>
        <div >
        </div>
        <div className='toptrackingcontent'>
        <Link className='toptrackingone'><img src="/icons/Profile.png" alt="" /> Become DropShipper </Link>
        <Link className='toptrackingone'><img src="/icons/track.png" alt="" /> Track Your Order</Link>
        <Link className='toptrackingone'><img src="/icons/Discount.png" alt="" /> All Offers</Link>
        </div>
        
      </div>
      <div className='logoSearchHeader'>
        <div className='menuName'>
          <img src="/icons/Menu.png" alt="" onClick={()=>setSideBar(true)} />
         <Link to="/" style={{textDecoration:"none"}}><h1>Phonex</h1></Link> 
        </div>
        <div className="searchbar">
          <img src="/icons/Search.png" alt="" />
          <input type="text" placeholder='Search essentials, electronic  products'/>
        </div>
        <div className='registerCart'>
        <Link className='cart'>
          <img src="/icons/Profile.png" alt="" />
          <p>Sign Up/Sign In</p>
        </Link>
       
        <div onClick={()=>setCartBar(true)} className='cart'>
          <img src="/icons/Cart.png" alt="" />
          <p>Cart</p>
        </div>
        </div>
      </div>
      <div className='catagoryName'>
            <Link className={`catagory  ${location.pathname === "/" ? 'selected' : ''}`} to="/">
              <p>Home</p>
            </Link>
        {
          navigation.map((items)=>(
            <Link key={items.id} to={`/${items.category}`} className={`catagory  ${location.pathname ===`/${items.category}`? 'selected' : ''}`} >
              <p>{items.category}</p>
            </Link>
          ))
        }
      </div>
    </>
  )
}