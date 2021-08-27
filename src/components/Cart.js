import React, { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { fs } from "./firebase";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
const Cart = ({ userid }) => {
  console.log(userid);
  const history=useHistory()
  const [fsproducts, setproducts] = useState([]);
  const [quantity, setquantity] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [loader, setloader] = useState(true)
  const getCartProducts = async () => {
    try {
      const products = await fs.collection(`Cart ${userid}`).get();
      const ProductArray = [];
      let totalItems = 0;
      let totalPrize = 0;
      for (var snap of products.docs) {
        var data = snap.data();
        //  console.log(snap.id)
        totalItems += data.ProductQty;
        totalPrize += parseInt(data.ProductPrize) * data.ProductQty;
        console.log(parseInt(data.ProductPrize));
        ProductArray.push({ ...data, Id: snap.id });
      }
      setTotalCost(totalPrize);
      setquantity(totalItems);
      await setproducts(ProductArray);
      setloader(false)
      //   console.log(fsproducts)
      //   console.log(ProductArray);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCartProducts();  
  }, []);

  const handleRemove = async (id) => {
    try {
      const isdelete = await fs.collection(`Cart ${userid}`).doc(id).delete();
      getCartProducts();
      console.log(isdelete);
    } catch (err) {
      console.log("Error on deleting item", err);
    }
  };

  const handleQty = async (element, quantity) => {
    try {
      console.log(element.Id);
      console.log(quantity);
      if (quantity > 0) {
        await fs.collection(`Cart ${userid}`).doc(element.Id).update({
          // ProductPrize:element.ProductPrize*quantity,
          ProductQty: quantity,
        });
        getCartProducts();
      } else {
        handleRemove(element.Id);
      }
    } catch (err) {
      console.log("Error on handle Quantity", err);
    }
  };

const handlePlaceOrder=(totalCost)=>{
history.push("/placeOrder")
}

  return (
    <div>
      <div className=" w-75 container mt-4 ">
        {
          loader &&  <div style={{ textAlign:"center", margin:"20%"}} ><Loader 
          type="Grid"
          color="#00BFFF"
          height={100}
          width={100}
        />
        </div>
        }
        {(fsproducts.length < 1 && !loader) &&<h4>Cart is Empty</h4>}

        {fsproducts.map((element) => {
          return (
            <div
              className="card-body row row-cols-1 row-cols-md-4  row-cols-sm-2 p-4 mb-2"
              style={{ border: "1px solid black"}}
            >
              <div className="col-md-4">
                <img
                  src={element.ProductImg}
                  style={{ height: "120px", width: "220px" }}
                />
              </div>
              <div className="col-md-4">
                <h5 className="card-title p-4  ">{element.ProductName}</h5>
                <p>{element.ProductDesc}</p>
              </div>
              <div className="col-4">
                <h5 className="p-4">
                  {element.ProductPrize * element.ProductQty}
                </h5>
                <div className="d-flex" style={{ maxHeight: "40px" }}>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleQty(element, element.ProductQty - 1)}
                    id="decrement"
                  >
                    -
                  </button>
                  <h5 className="p-2">{element.ProductQty}</h5>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleQty(element, element.ProductQty + 1)}
                    id="increment"
                  >
                    +
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    style={{ marginLeft: "15px" }}
                    onClick={() => handleRemove(element.Id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {fsproducts.length >0 && 

      <div className="container w-75 row-cols-1 row-cols-md-4  mt-4 mb-4 " >
        <div
          className="card-body d-flex p-4 col-12 mb-2"
          style={{ border: "1px solid black" }}
        >
          <div className="col-6">
            <h5 className="card-title p-4  ">Total Items</h5>
            <h5 className="card-title p-4  ">Total Prize</h5>
          </div>
          <div className="col-6">
            <h5 className="p-4">{quantity}</h5>
            <h5 className="p-4">{totalCost}</h5>
          </div>
        </div>
        <button type="button" className="btn btn-primary " onClick={()=>handlePlaceOrder(totalCost)}>
          Place Order
        </button>
      </div>
}
    </div>
  );
};

export default withRouter(Cart);
