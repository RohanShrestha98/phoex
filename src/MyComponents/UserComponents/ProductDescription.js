import React, { useEffect, useState } from 'react'
import Header from './Header'
import { Link } from 'react-router-dom'

export default function ProductDescription(props) {
    console.log("data",props.data)
    const discount = 10;
    const date = props.data.timeStamp
    const actualDate = date.toDate()
    const formattedDate = actualDate.toLocaleDateString();
    const formattedTime = actualDate.toLocaleTimeString();
    const sellingPrice = Math.floor(parseInt(props.data.price) - discount/100 * parseInt(props.data.price))
    const [quantity, setQuantity] = useState(1)
    useEffect(()=>{
      if(quantity <= 0){
        setQuantity(0)
      }
    },[quantity])
  return (
    <>
    <Header/>
    <div className='systemNavigation'>
      <Link className='systemnavigationone' to="/">Home</Link> <i class="fa-solid fa-angle-right"></i>
      <Link className='systemnavigationone' to={`/${props.data.category}`}>{props.data.category}</Link><i class="fa-solid fa-angle-right"></i>
      <Link className='systemnavigationone' to={`/${props.data.category}/${props.data.id}`}>{props.data.desc}</Link>
    </div>
    <div className='FullProductDescription'>
      <div className='productImage'>
        <div className='productImageOne'>
        <img src={props.data.img} alt="" />
        </div>
      
      </div>
      <div className='productdescription'>
      <p className='productCatagory'>{props.data.category}</p>
      <p className='productName'>{props.data.desc}</p>
      <p className='availability'>Availability: <span>In stock</span> </p>
      <div className='productPrice'>
      <p className='productSellingPrice'>Rs {sellingPrice}</p>
      <p className='productMarkedPrice'>Rs {props.data.price}</p>
      </div>
      <div className='productColor'>
        <p>Available Colors : </p>
        <div className='productColorOne'>
      {props.data.colors && props.data.colors.map((color, index) => (
          <li key={index} style={{ backgroundColor: color }}>
          </li>
        ))}
        </div>
      </div>
      <div className='productColor'>
        <p>RAM : </p>
        <div className='productRamOne'>
        {
        props.data.ram && props.data.ram.map((ram,index)=>(
          <li key={index}><p></p>{ram}</li>
        ))
      }
        </div>
      </div>
      <div className='productColor'>
        <p>Storage Capacity : </p>
        <div className='productRamOne'>
        {
        props.data.rom && props.data.rom.map((rom,index)=>(
          <li key={index}><p></p>{rom}</li>
        ))
      }
        </div>
      </div>
      <div className='productColor'>
        <p>Brand : </p>
        <div className='productRamOne'>
        <p>{props.data.brand}</p>
        </div>
        </div>
        <div className='border'></div>

        <button onClick={()=>setQuantity(quantity-1)}>Minus</button>
        {quantity}
        <button  onClick={()=>setQuantity(quantity+1)}>Plus</button>
      
      
      <p>{formattedDate}</p>
      <p>{formattedTime}</p>
     
     
        Shipping
        <p>{props.data.shipping}</p>
        </div>
        <div className='recommendedProducts'>

        </div>
    </div>
    </>
  )
}
