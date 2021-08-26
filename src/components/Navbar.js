import React, { useContext, useReducer } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";
import { Icon } from "react-icons-kit";
import { shoppingCart } from "react-icons-kit/feather/shoppingCart";
import { logout } from "./Redux/actions";
import { isAuthReducer, initialState } from "./Redux/Reducer";
import UserContext from "../UserContext";
const Navbar = ({ user,show }) => {
console.log(user)
const [state, dispatch] = useReducer(isAuthReducer, initialState)
const context = useContext(UserContext);
console.log(context)
  const history = useHistory();
  const handleLogout = () => {
    auth.signOut();
    console.log(state)
    dispatch(logout(false));
    localStorage.removeItem("isAuth")
     window.location.replace("/login")
  };
  // if(context){

  //   setTimeout(()=>{
  //     handleLogout();
  //   },8000)
  // }
  return (
    <div>
<nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
         
          <a className="navbar-brand" href="/">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS84t_rsNaIs7cqCPWKOooNePksXX8QwTT4og&usqp=CAU" style={{    width: "65px",
    height: "43px",
    // padding: "2px",
    // // marginTop: "-10px",
    // marginLeft: "27px",
    // marginRight:"-10px"
}}/>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            // aria-controls="navbarSupportedContent"
            // aria-expanded="false"
            // aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse bg-dark  " id="navbarSupportedContent" style={{zIndex:"0", justifyContent:"flex-end"}} >
            {user && show ? (
              <>
              <div className="mx-2">
                  <Link to="/">Home</Link>
                </div>
                <div className="mx-2">
                  <Link to="/profile" >{user}</Link>
                </div>
                <div className="mx-2">
                  <Link to={`/myorders/${context.Id}`} >My Orders</Link>
                </div>
                <div className="mx-2">
                  <Link to="/cart" >
                    {/* <p>item</p> */}
                  <Icon icon={shoppingCart}></Icon>
                  </Link>
                </div>
                <div className="mx-2">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mx-2">
                  <Link to="/login">
                    <button type="button" className="btn btn-danger">
                      Login
                    </button>
                  </Link>
                </div>
                <div className="mx-2">
                  <Link to="/signup">
                    {" "}
                    <button type="button" className="btn btn-danger">
                      Signup
                    </button>
                  </Link>
                </div>
              </>
            )}
          </div>

        </div>
      </nav>
    </div>
  );
};

export default Navbar;
























// import React from 'react'

// const Navbar = () => {
//   return (
//     <div>
//       <nav className="navbar navbar-expand-lg navbar-light bg-light">
//   <div class="container-fluid">
//     <a class="navbar-brand" href="#">Navbar</a>
//     <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
//       <span class="navbar-toggler-icon"></span>
//     </button>
//     <div class="collapse navbar-collapse" id="navbarNavDropdown">
//       <ul class="navbar-nav">
//         <li class="nav-item">
//           <a class="nav-link active" aria-current="page" href="#">Home</a>
//         </li>
//         <li class="nav-item">
//           <a class="nav-link" href="#">Features</a>
//         </li>
//         <li class="nav-item">
//           <a class="nav-link" href="#">Pricing</a>
//         </li>
//         <li class="nav-item dropdown">
//           <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//             Dropdown link
//           </a>
//           <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
//             <li><a class="dropdown-item" href="#">Action</a></li>
//             <li><a class="dropdown-item" href="#">Another action</a></li>
//             <li><a class="dropdown-item" href="#">Something else here</a></li>
//           </ul>
//         </li>
//       </ul>
//     </div>
//   </div>
// </nav>
//     </div>
//   )
// }

// export default Navbar