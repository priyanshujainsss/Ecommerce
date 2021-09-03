import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../UserContext";
import { fs } from "./firebase";
import Placeorderhome from "./Placeorderhome";

const PlaceOrder = ({ userid }) => {
  // console.log(new Date().toLocaleString());
  const context = useContext(UserContext);
  const history = useHistory();
  const [totalCartValue, setTotalCartValue] = useState(0);
  const [payment, setpayment] = useState(false);
  const [value, setvalue] = useState("");
  const [confirmModal, setconfirmModal] = useState(false);
  const [enable, setenable] = useState(false);
  const [processingmodel, setprocessingmodel] = useState(false);
  const getCartValue = async () => {
    try {
      const Products = await fs.collection(`Cart ${userid}`).get();
      let totalCost = 0;
      for (var snap of Products.docs) {
        var data = snap.data();
        totalCost = totalCost + data.ProductPrize * data.ProductQty;
        //   console.log(totalCost)
      }
      setTotalCartValue(totalCost);
    } catch (err) {
      console.log("Getting error on getCart value", err);
    }
  };
  const handlePayment = (pvalue) => {
    setvalue(pvalue);
    setpayment(true);
    setenable(true);
  };

  const clearCart = async () => {
    try {
      const products = await fs.collection(`Cart ${userid}`).get();
      for (var snap of products.docs) {
        const id = snap.id;
        const data = snap.data();
        const addProduct = await fs.collection(`Orders ${userid}`).add({
          ProductName: data.ProductName,
          ProductPrize: data.ProductPrize,
          ProductQty: data.ProductQty,
          ProductImg: data.ProductImg,
          date_time: new Date().toLocaleString(),
        });
        console.log(addProduct);
        await fs.collection(`Cart ${userid}`).doc(id).delete();
      }
    } catch (err) {
      console.log("Error on Clearing cart", err);
    }
  };

  const confirmOrder = () => {
    setprocessingmodel(true);
    setTimeout(() => {
      setprocessingmodel(false);
      setconfirmModal(true);
      console.log(confirmModal);
       clearCart();
      setTimeout(() => {
        history.push("/");
      }, 4000);
    }, 3000);
  };

  useEffect(() => {
    getCartValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      {console.log(context)}
      {!confirmModal && !processingmodel && (
        <Placeorderhome
          handlePayment={handlePayment}
          payment={payment}
          value={value}
          confirmOrder={confirmOrder}
          totalCartValue={totalCartValue}
          enablebtn={enable}
          pvalue={value}
          context={context}
        />
      )}

      {
        processingmodel && (
          <img
            src="https://gifimage.net/wp-content/uploads/2018/11/transparent-loading-gif-free-4.gif"
            alt="loading"
            width="300px"
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              minWidth: "300px",
              marginLeft: "10%",
              marginRight: "10%",
            }}
          />
        )
      }

      {confirmModal && (
        <div class="modal-body container" style={{ maxWidth: "400px", padding: "3rem" }}>
          <img
            src="https://www.teleentrega.net/assets/img/order-placed.gif"
            alt="order placed"
          />
          <h5
            style={{
              textAlign:"center", fontSize:"3.25rem"
            }}
          >
            Order Placed
          </h5>
        </div>
      )}
    </div>
  );
};

export default PlaceOrder;
