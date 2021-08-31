import React, { useEffect, useState } from "react";
import { fs } from "./firebase";
import OrderSummay from "./OrderSummay";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { useParams } from "react-router-dom";
import Notfound from "./Notfound";

const Myorders = ({ userid }) => {
  const {id}=useParams();
  const [orders, setorders] = useState([]);
  const [loader, setloader] = useState(true)
  const getOrdersList = async () => {
    try {
      const products = await fs.collection(`Orders ${userid}`).get();
      const ProductArray = [];
      for (var snap of products.docs) {
        const data = snap.data();
        ProductArray.push({ ...data, data });
      }
      setloader(false)
      await setorders(ProductArray);
    } catch (err) {
      console.log("error on fetching cart products", err);
    }
  };
  useEffect((props) => {
    getOrdersList()
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if(id!==userid){
    return <Notfound />
  }
  return (
    <div>
      <div className="container" style={{ maxWidth: "600px" }}>
      {
          loader &&  <div style={{ textAlign:"center", margin:"20%"}} ><Loader 
          type="Grid"
          color="#00BFFF"
          height={100}
          width={100}
        />
        </div>
        }
        {orders.length < 1 && !loader && <h4>No Orders</h4>}

        {
            orders.length>0 && <OrderSummay orders={orders} />
        }

      </div>
    </div>
  );
};

export default Myorders;



