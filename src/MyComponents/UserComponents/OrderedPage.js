import React, { useEffect, useState } from 'react'
import Header from './Header';
import { Link } from 'react-router-dom';
import Login from './Login';

export default function OrderedPage() {
    const [checkedItems,setCheckedItems] = useState([])
    useEffect(() => {
        const storedCheckedItems = localStorage.getItem("checkedItems");
        if (storedCheckedItems) {
          setCheckedItems(JSON.parse(storedCheckedItems));
        }
      }, []);
    
      const handleScrollToTop = () => {
        window.scrollTo(0, 0);
      };
      const updateQuantity = (itemId, newQuantity) => {
        if (newQuantity < 1) {
          newQuantity = 1;
        }
        
        const updatedCart = checkedItems.map((item) => {
          if (item.id === itemId) {
            return { ...item, quantity: newQuantity };
          }
          return item;
        });
        setCheckedItems(updatedCart);
      };

      const handleCheckboxChange = (event, itemId, item) => {
        const isChecked = event.target.checked;
        if (isChecked) {
          setCheckedItems((prevCheckedItems) => [...prevCheckedItems, { id: itemId, item: item}]);
        } else {
          setCheckedItems((prevCheckedItems) =>
            prevCheckedItems.filter((checkedItem) => checkedItem.id !== itemId)
          );
        }
      };

      const [user,setUser] = useState(true)
  return (
    <>
   <Header/>
   <div className='yourCartSummary'>
        <div className='yourCart'>
      {
        checkedItems && checkedItems.map((items)=>{
            const orderData = [items.item]
            return(
                <div key={items.id}>
                    {orderData && orderData.map((item)=>{
                         return (
                            <div className='yourCartOne' key={item.id}>
                              <Link to={`/${item.category}/${item.id}`} onClick={handleScrollToTop} className='yourCartOneImg'>
                                <img src={item.img} alt="" />
                              </Link>
                              <div className='yourCartOneDesc'>
                                <div className='yourCartOneNameQuantityCheckBox'>
                                  <Link to={`/${item.category}/${item.id}`} onClick={handleScrollToTop} className='yourCartOneNameQuantityCheckBoxDesc'>
                                    {item.desc && item.desc.slice(0,30)}
                                    {item.desc.slice(0,30) && <>...</>}
                                  </Link>
                                  <div className='yourCartQuantityCheckBox'>
                                    <div className="yourCartQuantity">
                                      <h3>{item.quantity}</h3>
                                      <div className="yourCartQuantityButton">
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                          --
                                        </button>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                      </div>
                                    </div>
                                    <input
                                          type="checkbox"
                                          checked={checkedItems.some((checkedItem) => checkedItem.id === item.id)}
                                          onChange={(e) => handleCheckboxChange(e, item.id, item)}
                                        />
              
                                  </div>
                                </div>
                                <Link to={`/${item.category}/${item.id}`} className='yourCartOneDescP' onClick={handleScrollToTop}>
                                  {item.battery} {item.charging} {item.ramdesc} {item.romdesc} {item.frontcamera} {item.gpu}
                                </Link>
                              </div>
                            </div>
                          );
                        })}
                </div>
            )
        })
      }
      </div>
        <div className='OrderSummary'>
          <div className='summary'>
            <h1>Order Summary</h1>
            <div className='subTotal'>
            <div className='subTotalOne'>
            <h2>Sub Total ({checkedItems.length} product)</h2>
            <h2>Rs 29999</h2>
            </div>
            <div className='subTotalOne'>
            <h2>Shipping Charges</h2>
            <h2>Rs 100</h2>
            </div>
            <button onClick={()=>setUser(false)}>Submit</button>
            {
                  !user && <Login data={checkedItems} setUser={setUser}/> 
                }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
