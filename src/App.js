import "./App.css";
import AddPost from "./MyComponents/AdminComponents/AddPost";
import CatagoryA from "./MyComponents/CatagoryA";
import FetchPost from "./MyComponents/FetchPost";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import SearchBar from "./MyComponents/SearchBar";
import AddHomeSlider from "./MyComponents/AdminComponents/AddHomeSlider";
import AddFlashSale from "./MyComponents/AdminComponents/AddFlashSale";
import Home from "./MyComponents/UserComponents/Home";
import ProductDescription from "./MyComponents/UserComponents/ProductDescription";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./FirebaseConfig";
import ProductCatagory from "./MyComponents/UserComponents/ProductCatagory";
import Login from "./MyComponents/UserComponents/Login";
import CartPage from "./MyComponents/UserComponents/CartPage";
import OrderedPage from "./MyComponents/UserComponents/OrderedPage";
import TrackOrder from "./MyComponents/UserComponents/TrackOrder";
import PlacedOrder from "./MyComponents/AdminComponents/PlacedOrder";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "post"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setLoading(false);
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

 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addpost" element={<AddPost />} />
        <Route path="/addhomeslider" element={<AddHomeSlider />} />
        <Route path="/yourcart" element={<CartPage />} />
        <Route path="/yourorder" element={<OrderedPage />} />
        <Route path="/trackorder" element={<TrackOrder />} />
        <Route path="/placedorder" element={<PlacedOrder />} />
        <Route path="/addflashsale" element={<AddFlashSale />} />
        <Route path="/fetchpost" element={<FetchPost />} />
        {data.map((items) => (
          <>
          <Route path={`${items.category}/${items.id}`} element={<ProductDescription data={items}/>} />
          <Route path={`/${items.category}`} element={<ProductCatagory/>}/>
          </>
        ))}
        <Route path="/fetchpostcatagorya" element={<CatagoryA />} />
        <Route path="/searchbar" element={<SearchBar />} />
      </Routes>
    </Router>
  );
}

export default App;
