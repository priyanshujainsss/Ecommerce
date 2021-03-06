import React from "react";
import { useDispatch } from "react-redux";

import {fs} from './firebase';
import { cartlength } from "./Redux/actions";
const IndividualProduct = ({ products,user }) => {
  // console.log(products)
  
const dispatch = useDispatch();
  const handleAddToCart=(product)=>{
//  console.log(product);
//  console.log(user)
if(user){
 fs.collection(`Cart ${user}`).doc(product.pid).set({
     ProductName:product.title,
     ProductPrize:product.prize,
     ProductDesc:product.description,
     ProductQty:1,
     ProductImg:product.url

 })
  .then(()=>{
      console.log("product added");
      fs.collection(`Cart ${user}`).get().then((total)=>dispatch(cartlength(total.docs.length))).catch(err=>console.log("failed to get length",err))
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
          <div className="col" key={product.url}>
            <div className="card h-100 " style={{maxHeight:"350px", background:"#212529", color:"white", fontWeight:"bold" }} >
              <img src={product.url} className="card-img-top" alt="..." style={{height:"50%"}}/>
              <div className="card-body h-30" style={{float:"inline-end"}}>
                <h5 className="card-title">{product.title}</h5> 
                <p className="card-text">
                  {product.description}
                </p>
                <h4>${product.prize}</h4>
                <button type="button" className="btn btn-primary" onClick={()=>handleAddToCart(product)} style={{height:"auto"}}>Add To Cart</button>
              </div>
            </div>
        </div>)
      })}
      </div>
   
  );
};

export default IndividualProduct;
