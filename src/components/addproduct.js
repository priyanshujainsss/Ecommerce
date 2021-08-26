import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import {fs,storage} from './firebase'
const Addproduct = () => {
  const [productName, setproductName] = useState('');
  const [productDesc, setproductDesc] = useState('');
  const [productImg, setproductImg] = useState(null);
  const [productPrize, setproductPrize] = useState("");
  const [successmsg, setsuccessmsg] = useState("");
  const [errmsg, seterrmsg] = useState("")
  const [imageerr, setimageerr] = useState("")
  const types=['image/jpg','image/jpeg','image/png','image/PNG']
  const handleProductImg=(e)=>{
   let selectedFile=e.target.files[0];
   if(selectedFile){
      if(types.includes(selectedFile.type)){
     console.log(selectedFile)
       setproductImg(selectedFile);
       setimageerr("")
      }
      else{
        setimageerr("Choose correct file Type");
          console.log("Choose correct file")
      }
   }
   else{
    setimageerr("Please Choose Image file")
       console.log("Please select file")
   }
  }

 const handleAddProduct=(e)=>{
     e.preventDefault()
     console.log(productName,productDesc,productPrize)
     console.log(productImg)
    const uploadTask=storage.ref(`product-image/${productImg.name}`).put(productImg);
    uploadTask.on("state_changed",snapshot=>{
        const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        console.log(progress);
    },error=>seterrmsg(error.message),()=>{
        storage.ref("product-image").child(productImg.name).getDownloadURL().then(url=>{
            fs.collection("products").add({
                title:productName,
                description:productDesc,
                prize:productPrize,
                url:url
            }).then(()=>{
                setsuccessmsg("Product Added Successfully");
                seterrmsg("")
                setproductName("");
                setproductDesc("");
                document.getElementById("image").value="";
                setproductPrize("");

            }).catch(err=>{
                console.log(err.message);
                setsuccessmsg("");
                seterrmsg("Failed To upload Product")
            })
        })
    })
      
 }

  return (
    <div>
      {successmsg &&<div className="container col-6 " style={{background:"#b9fabc"}} > <p>{successmsg}</p></div>}

      <form onSubmit={handleAddProduct} >
        <div className=" mt-5 mb-3 container col-6 " style={{border:"2px solid black", height:"250px"}}>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Product name"
            required
            value={productName}
            onChange={(e)=>setproductName(e.target.value)}
          />

          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            placeholder="Product description"
            required
            value={productDesc}
            onChange={(e)=>setproductDesc(e.target.value)}
          ></textarea>
          <input
            type="number"
            className="form-control"
            id="exampleFormControlInput1"
            required
            placeholder="Product Prize"
            value={productPrize}
            onChange={(e)=>setproductPrize(e.target.value)}
          />
          <input
          // accept={'image/jpg','image/jpeg','image/png','image/PNG'}
            type="file"
            className="form-control"
            id="image"
            placeholder="Choose Product Image"
            required
            onChange={handleProductImg}
          />
          {imageerr &&<div style={{background:"#faacca"}} > <p>{imageerr}</p></div>}
          <div className="d-grid gap-2 mt-3">
            <button className="btn btn-primary" type="submit">
              Add Product
            </button>
          </div>
        </div>
      </form>
      {errmsg &&<div className="container col-6 " style={{background:"#faacca"}} > <p>{errmsg}</p></div>}

    </div>
  );
};

export default withRouter(Addproduct);
