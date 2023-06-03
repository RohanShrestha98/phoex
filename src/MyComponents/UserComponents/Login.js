import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { db } from '../../FirebaseConfig';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

export default function Login(props) {
    const [data, setData] = useState({});
    const handleInput = (e) => {
        const id = e.target.id;
        const value = e.target.value;
    
        setData({ ...data, [id]: value });
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
          try {
            const id = uuidv4(); 
            await setDoc(doc(db,"buynow",id), {
              ...data,
              info: props.data,
              timeStamp: serverTimestamp(),
            });
            props.setUser(true)
            toast.success("Post Added Successfully")
          } catch (err) {
            console.log(err);
          }
      };
  return (
    <div className='login'>
      <div className="informationfields">
           <h2>Name</h2>
           <input type="text" onChange={handleInput} id="name" />
            </div>
            <div className="informationfields">
             <h2>Address.</h2>
              <input type="text" onChange={handleInput} id="address" />
             </div>
             <div className="informationfields">
             <h2>Number</h2>
              <input type="text" onChange={handleInput} id="phoneno" />
             </div>
             <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}
