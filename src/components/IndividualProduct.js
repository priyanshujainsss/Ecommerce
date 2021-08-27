import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import {fs,auth} from './firebase';
const IndividualProduct = ({ products,user }) => {
  // console.log(products)
  const history=useHistory()
  const [addedProduct, setaddedProduct] = useState([]);
  const handleAddToCart=(product)=>{
//  console.log(product);
//  console.log(user)
if(user){
 fs.collection(`Cart ${user}`).add({
     ProductName:product.title,
     ProductPrize:product.prize,
     ProductDesc:product.description,
     ProductQty:1,
     ProductImg:product.url

 })
  .then(()=>{
      console.log("product added")
  })
  .catch(err=>{
      console.log(err)
  })

 

}
  else{
      window.location.replace("/login")

  }
  }

  return (
    
    <div className="row row-cols-1 row-cols-md-4 row-cols-sm-2  g-4" style={{ margin:"0px 5% 0px 5%"}} >
      {products.map((product) => {
          return (
          <div className="col" key={product.url} >
            <div className="card h-100 " style={{maxHeight:"350px"}} >
              <img src={product.url} className="card-img-top" alt="..." style={{height:"50%"}}/>
              <div className="card-body h-30" style={{float:"inline-end"}}>
                <h5 className="card-title">{product.title}</h5> 
                <p className="card-text">
                  {product.description}
                </p>
                <h4>${product.prize}</h4>
                <button type="button" className="btn btn-primary" onClick={()=>handleAddToCart(product)} >Add To Cart</button>
              </div>
            </div>
        </div>)
      })}
      </div>

  );
};

export default IndividualProduct;
