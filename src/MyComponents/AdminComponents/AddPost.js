// import "./new.scss";
// import Sidebar from "../../components/sidebar/Sidebar";
// import Navbar from "../../components/navbar/Navbar";
// import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db, storage } from "../../FirebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "./style.css";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';

export default function AddPost() {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPerc] = useState(null);
  const [colors, setColors] = useState(["#000000", "#FFFFFF"]);
  const [rom, setRom] = useState(["32 GB", "64 GB"]);
  const [ram, setRam] = useState(["3 GB", "4 GB" ,"8 GB"]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [clicked, setClicked] = useState(false);

  const brand = ["Samsung", "Iphone", "Realme","Readme","Vivo"];
  const catagory = ["Budget SmartPhones", "Free Shipping", "Samsung","Iphone","Vivo","Oneplus"];

  const handleCategorySelect = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedBrand(e.target.value)
  };
  const handleBrandSelect = (e) => {
    setSelectedBrand(e.target.value)
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
        await setDoc(doc(db,"post",id), {
          ...data,
          category:selectedCategory,
          brand:selectedBrand,
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
  
  const handleRAMClick = (e) => {
    e.preventDefault();
    setData({ ...data, ram: ram });
  };  
  const handleROMClick = (e) => {
    e.preventDefault();
    setData({ ...data, rom: rom });
  };
  
  return (
    <div className=" displayPost">
      <div  className="addpost">
     <div className="insideAddPost">
      <div className="title">
          <h1>Add post </h1>
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
          <div className="input">
            <p>
              Quantity<span>*</span>
            </p>
            <input
              id="quantity"
              type="text"
              placeholder="quantity"
              onChange={handleInput}
            />
          </div>
          <div className="input">
            <p>
              2 GB & 32 GB<span>*</span>
            </p>
            <input
              id="twothirtytwo"
              type="text"
              placeholder="2 GB & 32 GB"
              onChange={handleInput}
            />
          </div>
          <div className="input">
            <p>
              3 GB & 32 GB<span>*</span>
            </p>
            <input
              id="threethirtytwo"
              type="text"
              placeholder="3 GB & 32 GB"
              onChange={handleInput}
            />
          </div>
          <div className="input">
            <p>
              3 GB & 64 GB<span>*</span>
            </p>
            <input
              id="threesixtyfour"
              type="text"
              placeholder="3 GB & 64 GB"
              onChange={handleInput}
            />
          </div>
          <div className="input">
            <p>
              4 GB & 32 GB<span>*</span>
            </p>
            <input
              id="fourthirtytwo"
              type="text"
              placeholder="4 GB & 32 GB"
              onChange={handleInput}
            />
          </div>
          <div className="input">
            <p>
              4 GB & 64 GB<span>*</span>
            </p>
            <input
              id="foursixtyfour"
              type="text"
              placeholder="4 GB & 64 GB"
              onChange={handleInput}
            />
          </div>
          <div className="input">
            <p>
              6 GB & 64 GB<span>*</span>
            </p>
            <input
              id="sixsixtyfour"
              type="text"
              placeholder="6 GB & 64 GB"
              onChange={handleInput}
            />
          </div>
          <div className="input">
            <p>
              6 GB & 128 GB<span>*</span>
            </p>
            <input
              id="sixonehundredtwentyeight"
              type="text"
              placeholder="6 GB & 128 GB"
              onChange={handleInput}
            />
          </div>
          <div className="input">
            <p>
              8 GB & 128 GB<span>*</span>
            </p>
            <input
              id="eightonehundredtwentyeight"
              type="text"
              placeholder="8 GB & 128 GB"
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
    <div>
      <h2>RAM Storage</h2>
      <input
        type="text"
        value={ram.join(",")}
        onChange={(e) => setRam(e.target.value.split(","))}
      />
      <button onClick={handleRAMClick}>Add RAM</button>
    </div>
    <div>
      <h2>ROM Storage</h2>
      <input
        type="text"
        value={rom.join(",")}
        onChange={(e) => setRom(e.target.value.split(","))}
      />
      <button onClick={handleROMClick}>Add ROM</button>
    </div>
    <select id="brand-select" value={selectedBrand} onChange={handleBrandSelect}>
        <option value="">-- Please select Brand --</option>
        {brand.map((brand) => (
          <option key={brand} value={brand}>
            {brand}
          </option>
        ))}
      </select>
      <select id="category-select" value={selectedCategory} onChange={handleCategorySelect}>
        <option value="">-- Please select Catagory--</option>
        {catagory.map((catagory) => (
          <option key={catagory} value={catagory}>
            {catagory}
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
