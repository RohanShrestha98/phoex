import React, { useEffect, useState } from 'react'
import "./style.css"
import Header from './Header'

export default function CartPage() {
  const [cartLocalStorage,setCartLocalStorage] = useState()
useEffect(() => {
  const storedCartData = localStorage.getItem("myCart");
  if (storedCartData) {
    const parsedCartData = JSON.parse(storedCartData);
    setCartLocalStorage(parsedCartData);
  }
}, [localStorage.getItem("myCart")]);

const handleScrollToTop = () => {
  window.scrollTo(0, 0);
};
  return (
    <div>
      <Header/>
      <div className=''>
        {
          cartLocalStorage && cartLocalStorage.map((items)=>(
            <div key={items.id}>
               <img src={items.img} alt="" />
              <p>{items.desc}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}
