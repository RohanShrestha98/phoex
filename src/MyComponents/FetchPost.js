import  {React, useEffect, useState } from 'react'
import { db } from '../FirebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';

export default function FetchPost() {
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
    console.log(data)
  return (
    <div>
        {
            !loading && <>
        
      {data && data.map((items)=>(
        <div key={items.id}>
            <p>{items.price}</p>
            {items.colors && items.colors.map((color, index) => (
          <li key={index} style={{ backgroundColor: color }}>
            {color}
          </li>
        ))}
        <img src={items.img} alt="" />
        <p>{items.category}</p>
        </div>
      ))}
      </>
    }
    {
        loading && <p> Loading.....</p>
    }
    </div>
  )
}
