import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import Login from "./Login";
import ForYouProduct from "./ForYouProduct";

export default function ProductDescription(props) {
  
  console.log("data", props.data);
  const discount = 10;
  const date = props.data.timeStamp;
  const actualDate = date.toDate();
  const formattedDate = actualDate.toLocaleDateString();
  const formattedTime = actualDate.toLocaleTimeString();
  const sellingPrice = Math.floor(
    parseInt(props.data.price) - (discount / 100) * parseInt(props.data.price)
  );
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    if (quantity <= 1) {
      setQuantity(1);
    }
  }, [quantity]);

  const [description, setDescription] = useState(true);

  const addtoCart = () => {
    const storedCartData = localStorage.getItem("myCart");
    const existingCartData = storedCartData ? JSON.parse(storedCartData) : [];
    const updatedCart = Array.isArray(existingCartData)
  ? [...existingCartData, { ...props.data, quantity: quantity }]
  : [{ ...props.data, quantity: quantity ,checked:false }];

  
    const updatedCartData = JSON.stringify(updatedCart);
    localStorage.setItem("myCart", updatedCartData);
    setAddCart("Remove from Cart"); // Update addcart state
    console.log("addtoCart", updatedCartData);
  };
  

  const deleteFromCart = () => {
    const storedCartData = localStorage.getItem("myCart");
    const existingCartData = storedCartData ? JSON.parse(storedCartData) : [];
  
    const itemIndex = existingCartData.findIndex((item) => item.id === props.data.id);
    if (itemIndex !== -1) {
      existingCartData.splice(itemIndex, 1);
    }
  
    const updatedCartData = JSON.stringify(existingCartData);
    localStorage.setItem("myCart", updatedCartData);
    setAddCart("Add to Cart"); // Update addcart state
    console.log("deleteFromCart", updatedCartData);
  };
  
  

  const [data, setData] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'post'), where('category', '==', props.data.category));
    const unsub = onSnapshot(
      q,
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
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

  console.log(data);

  const descriptionData = [
    {
      id: "1",
      title: "Battery",
      desc: props.data.battery,
    },
    {
      id: "1",
      title: "Charging",
      desc: props.data.charging,
    },
    {
      id: "1",
      title: "Chipset",
      desc: props.data.chipset,
    },
    {
      id: "1",
      title: "CPU",
      desc: props.data.cpu,
    },
    {
      id: "1",
      title: "Display",
      desc: props.data.display,
    },
    {
      id: "1",
      title: "Front camera",
      desc: props.data.frontcamera,
    },
    {
      id: "1",
      title: "Frontcamera Video",
      desc: props.data.frontcameravideo,
    },
    {
      id: "1",
      title: "Rare camera",
      desc: props.data.rarecamera,
    },
    {
      id: "1",
      title: "Rarecamera Video",
      desc: props.data.rarecameravideo,
    },
    {
      id: "1",
      title: "GPU",
      desc: props.data.gpu,
    },
    {
      id: "1",
      title: "Processer",
      desc: props.data.processer,
    },
    {
      id: "1",
      title: "RAM",
      desc: props.data.ramdesc,
    },
    {
      id: "1",
      title: "ROM",
      desc: props.data.romdesc,
    },
    {
      id: "1",
      title: "Security Patten",
      desc: props.data.securitypatten,
    }
  ];

  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const paymentShippingInfo =[
    {
      id:1,
      title:"Secure Shopping",
      desc:"Your data is always protected."
    },
    {
      id:1,
      title:"Payment Method",
      desc:"Cash on Delivery/Esewa/Khalti."
    },
    {
      id:1,
      title:"Shipping Delivery",
      desc:"Charge Amount Rs.250."
    },
    {
      id:1,
      title:"Estimated Delivery Time",
      desc:"Kathmandu Valley: Within 24hrs"
    }
  ]

  const [user,setUser] = useState(true)
  const [img, setImg] = useState(props.data.img);

  useEffect(() => {
    setImg(props.data.img);
  }, [props.data.img]);

  const copyUrl = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl)
      .then(() => {
        console.log('URL copied!');
      })
      .catch((error) => {
        console.error('Failed to copy URL:', error);
      });
  };

  const [cartLocalStorage,setCartLocalStorage] = useState()
useEffect(() => {
  const storedCartData = localStorage.getItem("myCart");
  if (storedCartData) {
    const parsedCartData = JSON.parse(storedCartData);
    setCartLocalStorage(parsedCartData);
  }
}, [localStorage.getItem("myCart")]);

console.log("cartLocalStorage",cartLocalStorage)

  const [addcart,setAddCart] = useState("Add to Cart")
  
  useEffect(() => {
    cartLocalStorage && cartLocalStorage.map((item) => {
      if (item.id === props.data.id) {
        setAddCart("Remove from Cart");
      } else {
        setAddCart("Add to Cart");
      }
      return null; 
    });
  }, [props.data.id, cartLocalStorage]);
  

  return (
    <>
      <Header />
      <div className="systemNavigation">
        <Link className="systemnavigationone" to="/">
          Home
        </Link>{" "}
        <i class="fa-solid fa-angle-right"></i>
        <Link className="systemnavigationone" to={`/${props.data.category}`}>
          {props.data.category}
        </Link>
        <i class="fa-solid fa-angle-right"></i>
        <Link
          className="systemnavigationone"
          to={`/${props.data.category}/${props.data.id}`}
        >
          {props.data.desc}
        </Link>
      </div>
      <div className="FullProductDescription">
        <div className="productDescHalf">
          <div className="inideproductDescHalf">
            <div className="productImage">
              <div className="productImageOne">
                <img src={img} alt="" />
              </div>
              <img style={{width:"100px",border:img===props.data.img2?"1px solid black":"none"}} onClick={()=>setImg(props.data.img2)}  src={props.data.img2} alt="" />
              <img style={{width:"100px",border:img===props.data.img?"1px solid black":"none"}} onClick={()=>setImg(props.data.img)} src={props.data.img} alt="" />
            </div>
            <div className="productdescription">
              <p className="productCatagory">{props.data.category}</p>
              <p className="productName">{props.data.desc}</p>
              <p className="availability">
                Availability: <span>In stock</span>{" "}
              </p>
              <div className="productPrice">
                <p className="productSellingPrice">Rs {sellingPrice}</p>
                <p className="productMarkedPrice">Rs {props.data.price}</p>
              </div>
              <div className="productColor">
                <p>Available Colors : </p>
                <div className="productColorOne">
                  {props.data.colors &&
                    props.data.colors.map((color, index) => {
                      console.log("index",index)
                      return(
                      <li key={index} style={{ backgroundColor: color ,cursor:"pointer"}} onClick={() => {
                        if (index === 0) {
                          setImg(props.data.img2 ? props.data.img2 :props.data.img);
                        }else if(index === 1){
                          setImg(props.data.img);
                        }
                      }}></li>
                    )})}
                </div>
              </div>
              <div className="productColor">
                <p>RAM : </p>
                <div className="productRamOne">
                  {props.data.ram &&
                    props.data.ram.map((ram, index) => (
                      <li key={index}>
                        <p></p>
                        {ram}
                      </li>
                    ))}
                </div>
              </div>
              <div className="productColor">
                <p>Storage Capacity : </p>
                <div className="productRamOne">
                  {props.data.rom &&
                    props.data.rom.map((rom, index) => (
                      <li key={index}>
                        <p></p>
                        {rom}
                      </li>
                    ))}
                </div>
              </div>
              <div className="productColor">
                <p>Brand : </p>
                <div className="productRamOne">
                  <p>{props.data.brand}</p>
                </div>
              </div>
              <div className="productColor">
                <p>Free Shipping : </p>
                <div className="productRamOne">
                  <p>{props.data.shipping}</p>
                </div>
              </div>
              <button onClick={copyUrl}>Copy Link</button>
              <div className="border"></div>

              <div className="productColor">
                <p>Quantity </p>

                <div className="quantity">
                  {quantity}
                  <div className="quantityButton">
                    <button onClick={() => setQuantity(quantity - 1)}>
                      --
                    </button>
                    <button onClick={() => setQuantity(quantity + 1)}>+</button>
                  </div>
                </div>
              </div>

              <div className="BuyAddCart">
                <button >Buy Now</button>
               <button onClick={addcart === "Add to Cart" ? addtoCart : () => deleteFromCart(props.data)}>{addcart}</button>

              </div>

              {/* <p>{formattedDate}</p>
      <p>{formattedTime}</p>
     
     
        Shipping
        <p>{props.data.shipping}</p> */}
            </div>
          </div>
          <div className="descriptionTitle">
            <p
              onClick={() => setDescription(true)}
              className={description === true ? "descriptionTitleOne" : ""}
            >
              Description
            </p>
            <p
              onClick={() => setDescription(false)}
              className={description === false ? "descriptionTitleOne" : ""}
            >
              Review
            </p>
          </div>
          {description ? (
            <div className="descriptionBox">
              {descriptionData.map((items) => (
                <div className="descriptionBoxOne" key={items.id}>
                  <p>{items.title} : </p>
                  <p>{items.desc && items.desc.slice(0, 32)}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="descriptionBox">Review</div>
          )}
        </div>

        <div className="recommendedProducts">
          <div className="paymentShippingInfo">
            {
              paymentShippingInfo.map((items)=>(
                <div key={items.id}>
                 <p> <b>{items.title}</b>
                  {items.desc}</p>
                </div>
              ))
            }
          </div>
          <div className="recommendedProductsList">
            <p>Recommended Products</p>
            <div className="border"></div>
            {
              data && data.slice(0,4).map((items)=>(
                <Link to={`/${items.category}/${items.id}`} onClick={handleScrollToTop} key={items.id}  className="recommendedProductsListOne">
                  <div className="recommendedProductsListOneImg">
                  <img src={items.img} alt="" />
                  </div>
                  
                  <div className="recommendedProductsListOneTitle">
                  <h4>{items.desc && items.desc.slice(0,50)}</h4>
                  <h5>{items.price}</h5>
                  </div>
                  
                </Link>
              ))
            }
          </div>
        </div>
      </div>
      <ForYouProduct display={"10"}/>
    </>
  );
}
