import { collection, onSnapshot, query, where } from 'firebase/firestore';
import  {React, useEffect, useState } from 'react'
import { db } from '../FirebaseConfig';

export default function CatagoryA() {
    const [data, setData] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'post'), where('category', '==', 'Category B'));
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
  return (
    <div>
      {
        data && data.map((items)=>(
            <div>
                <p>{items.price}</p>
                <p>{items.name}</p>
            </div>
        ))
      }
    </div>
  )
}
