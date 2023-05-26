import { useEffect, useState } from "react";
import {
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db, storage } from "../../FirebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "./style.css";
import { v4 as uuidv4 } from 'uuid';

export default function AddHomeSlider() {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPerc] = useState(null);

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


  const handleAdd = async (e) => {
    e.preventDefault();
      try {
        const id = uuidv4(); 
        await setDoc(doc(db,"homeslider",id), {
          ...data,
          timeStamp: serverTimestamp(),
        });
      } catch (err) {
        console.log(err);
      }
  };
  
  
  return (
     <div className="insideAddPost">
      <div className="title">
          <h1>Add Home Slider </h1>
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
          <button type="submit">Add post</button>
        </form>
        </div>
  );
}
