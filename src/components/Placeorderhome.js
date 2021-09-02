import React, { useRef, useState } from "react";

const Placeorderhome = ({
  handlePayment,
  payment,
  value,
  totalCartValue,
  confirmOrder,
  enablebtn,
  context,
  pvalue
}) => {

  const upiref = useRef(null);
  const netbankingid = useRef(null);
  const netbankingpass = useRef(null);
  const c1 = useRef(null)
  const c2 = useRef(null)
  const c3 = useRef(null)
  const c4 = useRef(null)
  const cvv = useRef(null)
  const date = useRef(null)

    const [errormsgcard, seterrormsgcard] = useState(null);
    const [errormsgbank, seterrormsgbank] = useState(null);
    const [errormsgupi, seterrormsgupi] = useState(null);
    




const handleCredentials=(e)=>{
 e.preventDefault();
 if(pvalue==="netbanking"){
   if(netbankingid.current.value & netbankingpass.current.value){
     confirmOrder();
   }
   else{
     seterrormsgbank("Please Enter Credentials")
     seterrormsgcard("");
     seterrormsgupi("")
  
   }
 }
 
 else if(pvalue==="upi"){
  if(upiref.current.value){
    confirmOrder();
  }
  else{
    seterrormsgupi("Please Enter valid upi id")
    seterrormsgbank("")
    seterrormsgcard("");
 
  }
 }

else if(pvalue==="card"){
  if(c1.current.value & c2.current.value & c3.current.value & c4.current.value & cvv.current.value & date.current.value){
    confirmOrder();
  }
  else{
    seterrormsgcard("Please Enter Complete Details");
    seterrormsgbank("")
    seterrormsgupi("")
  }
}
else{
  confirmOrder();

}

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

        {/* <form action="#" onSubmit={(e) => console.log(e.target.value)} required> */}
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
                  ref={c1}
                />
                <input
                  type="integer"
                  width="10px"
                  style={{ width: "40px", marginLeft: "7px" }}
                  minLength="4"
                  maxLength="4"
                  required
                  ref={c2}


                />
                <input
                  type="integer"
                  width="10px"
                  style={{ width: "40px", marginLeft: "6px" }}
                  minLength="4"
                  maxLength="4"
                  required
                  ref={c3}

                />
                <input
                  type="integer"
                  width="10px"
                  style={{ width: "40px", marginLeft: "6px" }}
                  minLength="4"
                  maxLength="4"
                  required
                  ref={c4}

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
                  ref={cvv}

 />
                <input
                  type="integer"
                  minLength="4"
                  maxLength="4"
                  style={{ width: "55px", margin: "1px 9px 3px 6px" }}
                  placeholder="MM/YY"
                  ref={date}

                />
              </p>
              {errormsgcard  && <p style={{color:"red", fontSize:"16px"}} >{errormsgcard}</p>}

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
              <input type="email" placeholder="NetBanking userId"  ref={netbankingid} />
              <input type="password" placeholder="Password" ref={netbankingpass} />
              {errormsgbank  && <p style={{color:"red", fontSize:"16px"}} >{errormsgbank}</p>}
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
                  required ref={upiref}
                  />
                  {errormsgupi && <p style={{color:"red", fontSize:"16px"}} >{errormsgupi}</p>}
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
        {/* </form> */}
        {value === "cod" && <h5>Pay {totalCartValue} at time of delivery </h5>}

        <button
          class="waves-effect waves-light btn-small"
          type="submit"
          disabled={!enablebtn}
          onClick={(e)=>handleCredentials(e)}
        >
          Confirm Order
        </button>
      </form>
    </div>
  );
};

export default Placeorderhome;
