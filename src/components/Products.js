import React, { useEffect, useState } from "react";
import {fs,auth} from './firebase';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import IndividualProduct from "./IndividualProduct";

const Products = () => {
  const [Products, setProducts] = useState([]);
  useEffect(() => {
    const getproducts = async () => {
      const products = await fs.collection("products").get();
      const productArray = [];
      for (var snap of products.docs) {
        var data = snap.data();
        //   data.ID=snap.id;
        console.log(data);
        productArray.push({ ...data });
      }
      console.log(productArray);
      setProducts(productArray);
    };
    getproducts();
  }, []);

  const [user, setuser] = useState(null);
  const getuserState=async()=>{
    try{

      auth.onAuthStateChanged(function(user){
        if(user){
        setuser(user.uid)
        }
        else{
          setuser(null);
        }
      })
      return user
    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    getuserState();
    // eslint-disable-next-line
  },[])





  return (
    <div className="container">
        {Products.length<1 &&  <div style={{ textAlign:"center", margin:"20%"}} ><Loader 
        type="Grid"
        color="#00BFFF"
        height={100}
        width={100}
      />
      </div>
      }
        {Products.length>0 && <IndividualProduct products={Products} user={user} />}
        
      
    </div>
  );
};

export default Products;