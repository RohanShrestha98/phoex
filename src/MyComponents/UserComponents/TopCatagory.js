import React from 'react'
import "./style.css"
import { Link } from 'react-router-dom'

export default function TopCatagory() {
  const catagoryName = [
    {
      id:"1",
      name:"Samsung",
      link:"/Samsung",
      img:"img/slider1.png"
    },
    {
      id:"1",
      name:"Samsung",
      link:"/Samsung",
      img:"img/slider1.png"
    },
    {
      id:"1",
      name:"Samsung",
      link:"/Samsung",
      img:"img/slider1.png"
    },
    {
      id:"1",
      name:"Samsung",
      link:"/Samsung",
      img:"img/slider1.png"
    },
    {
      id:"1",
      name:"Samsung",
      link:"/Samsung",
      img:"img/slider1.png"
    },
    {
      id:"1",
      name:"Samsung",
      link:"/Samsung",
      img:"img/slider1.png"
    },
    {
      id:"1",
      name:"Samsung",
      link:"/Samsung",
      img:"img/slider1.png"
    }
  ]
  return (
    <div>
      <div className='topcatagories'>
        <h3>Shop From <span>Top Categories</span> </h3>
      </div>

      <div className='CatagoryNameImage'>
        {
          catagoryName.map((items)=>(
            <Link key={items.id} to={items.link} className='NameImageCatagory'>
              <div className='catagoryImage'>
              <img src={items.img} alt="" />
              </div>
              
              <p>{items.name}</p>
            </Link>
          ))
        }
      </div>
    </div>
  )
}
