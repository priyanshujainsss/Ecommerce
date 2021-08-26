import React from "react";

const Placeorderhome = ({
  handlePayment,
  payment,
  value,
  totalCartValue,
  confirmOrder,
  enablebtn,
  context,
}) => {
  return (
    <div>
      <form onSubmit={confirmOrder}>
        <label>Add a Delivery address</label>
        <textarea
          placeholder="Write delivery Address"
          defaultValue={context.Address}
          required
        />
        <h5>Payment Method</h5>

        <form action="#" onSubmit={(e) => console.log(e.target.value)}>
          <p>
            <label>
              <input
                class="with-gap"
                name="group1"
                type="radio"
                value="card"
                onClick={(e) => handlePayment(e.target.value)}
              />
              <span>Credit/Debit Card</span>
            </label>
          </p>

          {payment === true && value === "card" && (
            <div>
              <p>
                <input
                  type="integer"
                  width="10px"
                  style={{ width: "40px", marginLeft: "6px" }}
                  minLength="4"
                  maxLength="4"
                  required

                />
                <input
                  type="integer"
                  width="10px"
                  style={{ width: "40px", marginLeft: "7px" }}
                  minLength="4"
                  maxLength="4"
                  required

                />
                <input
                  type="integer"
                  width="10px"
                  style={{ width: "40px", marginLeft: "6px" }}
                  minLength="4"
                  maxLength="4"
                  required

                />
                <input
                  type="integer"
                  width="10px"
                  style={{ width: "40px", marginLeft: "6px" }}
                  minLength="4"
                  maxLength="4"
                  required

                />
              </p>
              <p>
                <input
                  type="integer"
                  minLength="3"
                  maxLength="3"
                  style={{ width: "35px", margin: "1px 2px 3px 6px" }}
                  placeholder="CVV"
                  required
                />
                <input
                  type="integer"
                  minLength="4"
                  maxLength="4"
                  style={{ width: "55px", margin: "1px 9px 3px 6px" }}
                  placeholder="MM/YY"
                />
              </p>
            </div>
          )}
          <p>
            <label>
              <input
                class="with-gap"
                name="group1"
                type="radio"
                value="netbanking"
                onClick={(e) => handlePayment(e.target.value)}
                required
              />
              <span>Net Banking</span>
            </label>
          </p>
          {value === "netbanking" && payment === true && (
            <div style={{ maxWidth: "200px", marginLeft: "10px" }}>
              <input type="email" placeholder="NetBanking userId" />
              <input type="password" placeholder="Password" />
            </div>
          )}

          <p>
            <label>
              <input
                class="with-gap"
                name="group1"
                type="radio"
                value="upi"
                  required
                  onClick={(e) => handlePayment(e.target.value)}
              />
              <span>UPI</span>
            </label>
          </p>
          {value === "upi" && payment === true && (
            <div style={{ maxWidth: "200px", marginLeft: "10px" }}>
              <input type="text" placeholder="UPI id" 
                  required
                  />
            </div>
          )}
          <p>
            <label>
              <input
                class="with-gap"
                name="group1"
                type="radio"
                value="cod"
                onClick={(e) => handlePayment(e.target.value)}
              />
              <span>Cash On Delivery</span>
            </label>
          </p>
        </form>
        {value === "cod" && <h5>Pay {totalCartValue} at time of delivery </h5>}

        <button
          class="waves-effect waves-light btn-small"
          type="submit"
          disabled={!enablebtn}
        >
          Confirm Order
        </button>
      </form>
    </div>
  );
};

export default Placeorderhome;
