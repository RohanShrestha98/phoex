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
import "./style.css"

export default function AddPost() {
  const [file, setFile] = useState("");
  const [file2, setFile2] = useState("");
  const [data, setData] = useState({});
  const [per, setPerc] = useState(null);
  const [colors, setColors] = useState(["#000000", "#FFFFFF"]);
  const [rom, setRom] = useState(["32 GB", "64 GB"]);
  const [ram, setRam] = useState(["3 GB", "4 GB" ,"8 GB"]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [clicked, setClicked] = useState(false);

  const brand = ["Samsung", "Iphone", "Realme","Redmi","Vivo","Oneplus"];
  const catagory = ["Budget SmartPhones", "Free Shipping", "Samsung","Iphone","Vivo","Oneplus","Redmi"];

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
  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file2.name;

      console.log(name);
      const storageRef = ref(storage, file2.name);
      const uploadTask = uploadBytesResumable(storageRef, file2);

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
            setData((prev) => ({ ...prev, img2: downloadURL }));
          });
        }
      );
    };
    file2 && uploadFile();
  }, [file2]);

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
          <div className="fileImg2">
            <img style={{width:"100px"}}
              src={
                file2
                  ? URL.createObjectURL(file2)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
            <div className="formInput">
              <label htmlFor="file2">Upload post</label>
              <input
                type="file"
                id="file2"
                onChange={(e) => setFile2(e.target.files[0])}
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
              RAM<span>*</span>
            </p>
            <input
              id="ramdesc"
              type="text"
              placeholder="RAM"
              onChange={handleInput}
            />
          </div>
          <div className="input">
            <p>
              ROM<span>*</span>
            </p>
            <input
              id="romdesc"
              type="text"
              placeholder="ROM"
              onChange={handleInput}
            />
          </div>
          <div className="input">
            <p>
              Display<span>*</span>
            </p>
            <input
              id="display"
              type="text"
              placeholder="Display"
              onChange={handleInput}
            />
          </div>
          <div className="input">
            <p>
              Refresh Rate<span>*</span>
            </p>
            <input
              id="refreshrate"
              type="text"
              placeholder="Refresh Rate"
              onChange={handleInput}
            />
          </div>
          <div className="input">
            <p>
              Processer<span>*</span>
            </p>
            <input
              id="processer"
              type="text"
              placeholder="Processer"
              onChange={handleInput}
            />
          </div>
          <div className="input">
            <p>
              Rare Camera <span>*</span>
            </p>
            <input
              id="rarecamera"
              type="text"
              placeholder="Rare Camera"
              onChange={handleInput}
            />
          </div>
          <div className="input">
            <p>
              Rare Camera Video<span>*</span>
            </p>
            <input
              id="rarecameravideo"
              type="text"
              placeholder="Rare Camera Video"
              onChange={handleInput}
            />
          </div>
          <div className="input">
            <p>
              Front Camera <span>*</span>
            </p>
            <input
              id="frontcamera"
              type="text"
              placeholder="Front Camera"
              onChange={handleInput}
            />
          </div>
          <div className="input">
            <p>
              Front Camera Video<span>*</span>
            </p>
            <input
              id="frontcameravideo"
              type="text"
              placeholder="Rare Camera Video"
              onChange={handleInput}
            />
          </div>
          <div className="input">
            <p>
              Battery<span>*</span>
            </p>
            <input
              id="battery"
              type="text"
              placeholder="Battery"
              onChange={handleInput}
            />
          </div>
          <div className="input">
            <p>
              Security Patten<span>*</span>
            </p>
            <input
              id="securitypatten"
              type="text"
              placeholder="Battery"
              onChange={handleInput}
            />
          </div>
          <div className="input">
            <p>
              CPU<span>*</span>
            </p>
            <input
              id="cpu"
              type="text"
              placeholder="CPU"
              onChange={handleInput}
            />
          </div>
          <div className="input">
            <p>
              GPU<span>*</span>
            </p>
            <input
              id="gpu"
              type="text"
              placeholder="GPU"
              onChange={handleInput}
            />
          </div>
          <div className="input">
            <p>
              Charging<span>*</span>
            </p>
            <input
              id="charging"
              type="text"
              placeholder="Charging"
              onChange={handleInput}
            />
          </div>
          <div className="input">
            <p>
              Chipset<span>*</span>
            </p>
            <input
              id="chipset"
              type="text"
              placeholder="Chipset"
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
