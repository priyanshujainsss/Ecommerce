import React from 'react'

const OrderSummay = ({orders}) => {
    return (
        <div>
            <div class="card">
          <div
            class="card-body"
            style={{ maxHeight: "50px", display: "flex", flexDirection: "row" }}
          >
            <p class="col-5">Product</p>
            <p class="col-5">Quantity</p>
            <p class="col-5">Prize</p>
          </div>
        </div>


         {
             orders.map(order=>{
                 return(
                    <div class="card">
                    <div
                      class="card-body"
                      style={{ maxHeight: "50px", display: "flex", flexDirection: "row" }}
                    >
                         <div  className="col-5">
                             <img src={order.ProductImg} width="40"style={{maxWidth:"40px"}} alt="product img" />
                          </div>
                      <p class="col-5">{order.ProductQty}</p>
                      <p class="col-5">{order.ProductPrize}</p>
                    </div>
                    <div
                     style={{ display: "flex", flexDirection: "row" }}>
                      <p class="col-4 mt-3">{order.ProductName}</p>
                    
                    <p
                      className="col-4"
                      style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                        }}
                        >
                      {order.date_time}
                    </p>
                        </div>
                  </div>
          
          
                 )
             })
         }
        </div>
    )
}

export default OrderSummay
