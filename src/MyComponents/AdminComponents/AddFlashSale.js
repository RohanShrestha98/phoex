import { useEffect, useState } from "react";
import {
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db, storage } from "../../FirebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "./style.css";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';

export default function AddFlashSale() {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPerc] = useState(null);
  const [colors, setColors] = useState(["#000000", "#FFFFFF"]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [clicked, setClicked] = useState(false);

  const categories = ["Samsung", "Iphone", "Realme","Redmi","Vivo"];

  const handleCategorySelect = (e) => {
    setSelectedCategory(e.target.value);
  };
  const [shipping,setShipping]=useState("No")

  const handleShipping =()=>{
    setClicked(!clicked)
    if(clicked){
        setShipping("Yes")
    }else{
        setShipping("No")
    }
  }

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;

      console.log(name);
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  console.log(data);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };
 

  const handleAdd = async (e) => {
    e.preventDefault();
      try {
        const id = uuidv4(); 
        await setDoc(doc(db,"flashsale",id), {
          ...data,
          category:selectedCategory,
          shipping: shipping,
          timeStamp: serverTimestamp(),
        });
        toast.success("Post Added Successfully")
        window.location.reload()
      } catch (err) {
        console.log(err);
      }
  };
  const handleColorClick = (e) => {
    e.preventDefault();
    setData({ ...data, colors: colors });
  };
  
  
  return (
    <div className=" displayPost">
      <div  className="addpost">
     <div className="insideAddPost">
      <div className="title">
          <h1>Add Flash Sale </h1>
        </div>
        <form onSubmit={handleAdd} className="form">
        <div className="fileImg2">
            <img style={{width:"100px"}}
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
            <div className="formInput">
              <label htmlFor="file">Upload post</label>
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
          </div>
          <div className="input">
            <p>
              Name with description<span>*</span>
            </p>
            <input
              id="desc"
              type="text"
              placeholder="Description about post"
              onChange={handleInput}
            />
          </div>
          <div className="input">
            <p>
             Price<span>*</span>
            </p>
            <input
              id="price"
              type="text"
              placeholder="Description about post"
              onChange={handleInput}
            />
          </div>
          <div>
      <h2>My Colors</h2>
      <ul>
        {colors.map((color, index) => (
          <li key={index} style={{ backgroundColor: color }}>
            {color}
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={colors.join(",")}
        onChange={(e) => setColors(e.target.value.split(","))}
      />
      <button onClick={handleColorClick}>Add Colors</button>
    </div>
    <select id="category-select" value={selectedCategory} onChange={handleCategorySelect}>
        <option value="">-- Please select --</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <br />
      {shipping}
      <p onClick={handleShipping}>Free Shipping</p>
     
          <button type="submit">Add post</button>
        </form>
        </div>
      </div>
      </div>
  );
}
