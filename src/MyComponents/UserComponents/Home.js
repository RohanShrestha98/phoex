import React, { useEffect, useState } from 'react'
import Header from './Header'
import HomeSlider from './HomeSlider'
import { collection, onSnapshot } from 'firebase/firestore';
import FlashSale from './FlashSale';
import { db } from '../../FirebaseConfig';
import TopCatagory from './TopCatagory';
import ForYouProduct from './ForYouProduct';

export default function Home() {
  const [data, setData] = useState([]);
    const[loading,setLoading]=useState(true)
    const [categories, setCategories] = useState([]);
    useEffect(() => {
      const unsub = onSnapshot(
        collection(db,"homeslider" ),
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

    useEffect(() => {
      const uniqueCategories = [...new Set(data.map(item => item.category))];
      setCategories(uniqueCategories);
    }, [data]);

  return (
    <div>
      <Header/>
      <HomeSlider data={data} loading={loading}/>
      <FlashSale/>
      <TopCatagory/>
      <ForYouProduct display={"10"}/>
    </div>
  )
}
