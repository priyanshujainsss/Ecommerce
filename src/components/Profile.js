import React, { useContext, useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import UserContext from "../UserContext";
import { fs, storage } from "./firebase";
import Loader from "react-loader-spinner";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import "./profile.css";
// import { arrowUp } from "react-icons-kit/feather/arrowUp";
const Profile = ({ user }) => {
  console.log(user)
  const history=useHistory();
  const context = useContext(UserContext);
  // console.log(context)
  const [pimage, setpimage] = useState(null);

  //   const handleImg = (e) => {
  //     let selectedFile = e.target.files[0];
  //     console.log(selectedFile);

  //     if (selectedFile) {
  //       console.log(URL.createObjectURL(selectedFile));
  //       setpimage(URL.createObjectURL(selectedFile));
  //       document.getElementById("image").style.backgroundImage =
  //         URL.createObjectURL(selectedFile);
  //     }
  //   };

  const updateProfile = async () => {
    try {
       storage.ref(`userImage/${user.Id}`).put(pimage)
        const url=await storage.ref("userImage").child(user.Id).getDownloadURL();
      console.log(url)
      await fs.collection("users").doc(user.Id).update({
        FullName: profile.name,
        Address: profile.address,
        Phone: profile.phone,
        Gender: profile.gender,
        DOB: profile.dob,
        Url:url
      });

      alert("Profile Updated");
      history.push("/")
      console.log("data updated");
    } catch (err) {
      console.log(err);
    }
  };
  const [imageurl, setimageurl] = useState(null);

  const handleClick = () => {
    const file = document.querySelector("#file");
    if (file) {
      file.addEventListener("change", (e) => {
        // Get the selected file

        const [file] = e.target.files;
        // Get the file name and size
        console.log(file)
        if(file){
        setpimage(file)  
        const url = URL.createObjectURL(file);
        console.log(url);
        setimageurl(url);
        const { name: fileName, size } = file;
        // Convert size in bytes to kilo bytes
        const fileSize = (size / 1000).toFixed(2);
        // Set the text content
        // const fileNameAndSize = `${fileName} - ${fileSize}KB`;
        // document.querySelector('.file-name').textContent = fileNameAndSize;
        console.log(file, fileName, fileSize);}
      });
    }
  };

  useEffect(() => {
    if (context) {
      setprofile({
        name: user.FullName,
        email: user.Email,
        phone: user.Phone,
        gender: user.Gender,
        dob: user.DOB,
        address: user.Address,
      });
      if(user.Url){
        setimageurl(user.Url)
      }else{
        setimageurl(
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt5NR3To1fH236wY3CMf5i9ak2Sj22p8VMdMppvtAtZ6T3Jtsw4u62qhaf-0l5tnbcYrw&usqp=CAU"
        );
        
       }
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [profile, setprofile] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    address: "",
  });
  const handleInputChange = (evt) => {
    const value = evt.target.value;
    console.log(evt.target);
    console.log(value);
    setprofile({
      ...profile,
      [evt.target.id]: value,
    });
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    console.log(profile);
    updateProfile();
  };

  return (
    <div>
      {!context && (
        <div style={{ textAlign: "center", margin: "20%" }}>
          <Loader type="Grid" color="#00BFFF" height={100} width={100} />
        </div>
      )}
      {context && (
        <div
          className="container  mt-5 profile"
          style={{ display: "flex", justifyContent: "center"}}
        >
            <form
              onSubmit={handleProfileSubmit}
            >
              {/* <input type="file" className="my-file" onChange={handleImg} /> */}
             {/* profile image div start */}
              <div
                  className="file-input"
                  style={{ display: "flex", flexDirection: "column" }}
                      > 
                  <input type="file" className="file" id="file" />

                    <label htmlFor="file" onClick={handleClick} id="label">
                    <img src={imageurl} width="300" height="300" alt={"profile" }/>
                  </label>
               </div>
               {/* profile image div end */}
              <div>
                <div className="form mb-2" style={{display:"contents"}}>
                  <label htmlFor="floatingInput">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter Your Name"
                    onChange={handleInputChange}
                    value={profile.name}
                    required
                  />
                </div>
                <div className="form mb-2">
                  <label htmlFor="floatingInput"  >Email Id</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter Emai id"
                    onChange={handleInputChange}
                    value={profile.email}
                    // disabled
                  />
                </div>
                <div className="form mb-2">
                  <label htmlFor="floatingPassword">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    placeholder="Phone"
                    onChange={handleInputChange}
                    value={profile.phone}
                  />
                </div>
                <select
                  className="form-select mb-2 "
                  aria-label="Default select example"
                  id="gender"
                  onChange={handleInputChange}
                  value={profile.gender}
                >
                  <option selected>Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <div className="form">
                  <label htmlFor="floatingPassword">Date Of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    id="dob"
                    placeholder="Password"
                    onChange={handleInputChange}
                    value={profile.dob}
                  />
                </div>

                <div className="form mb-3">
                  <label htmlFor="floatingPassword">Address</label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="Enter your address"
                    onChange={handleInputChange}
                    value={profile.address}
                  />
                </div>

                <button type="Submit" className="btn btn-primary container ">
                  Update Profile
                </button>
              </div>
            </form>
          
         
        </div>
      )}
    </div>
  );
};

export default withRouter(Profile);
