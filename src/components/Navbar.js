// import React, { useContext, useReducer } from "react";
// import { Link, useHistory } from "react-router-dom";
// import { auth } from "./firebase";
// import { Icon } from "react-icons-kit";
// import { shoppingCart } from "react-icons-kit/feather/shoppingCart";
// import { logout } from "./Redux/actions";
// import UserContext from "../UserContext";
// const Navbar = ({ user, show }) => {
//   // console.log(user);

//   const context = useContext(UserContext);
//   // console.log(context);
//   const history = useHistory();
//   const handleLogout = () => {
//     auth.signOut();

//     window.location.replace("/login");
//   };
//   // if(context){

//   //   setTimeout(()=>{
//   //     handleLogout();
//   //   },8000)
//   // }


//   return (
//     <div style={{maxHeight:"150px", display:"inline"}}>
//       <nav className="navbar navbar-expand-sm navbar-light bg-light" >
//         <div className="container-fluid">
//           <a className="navbar-brand" href="/">
//             <img
//               src="https://www.logopik.com/wp-content/uploads/edd/2018/07/Ecommerce-Logo-Vector.png"
//               style={{
//                 width: "75px",
//                 // height: "43px",
//                 maxHeight:"40px"
//                 // padding: "2px",
//                 // // marginTop: "-10px",
//                 // marginLeft: "27px",
//                 // marginRight:"-10px"
//               }}
//             />
//           </a>
//           <button
//             className="navbar-toggler navbar-toggler-right"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarSupportedContent"
//             aria-controls="navbarSupportedContent"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//             style={{marginTop:"-20px"}}
//           >
//             <span className="navbar-toggler-icon" style={{marginTop:"-4px"}} ></span>
//           </button>
//           <div
//             className="collapse navbar-collapse bg-dark"
//             id="navbarSupportedContent"
//             style={{ zIndex: "1", justifyContent: "flex-end" }} 
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarSupportedContent"
//           >
//             {user && show ? (
//               <>
//                 <div className="mx-2">
//                   <Link to="/">Home</Link>
//                 </div>
//                 <div className="mx-2">
//                   <Link to="/profile">{user}</Link>
//                 </div>
//                 <div className="mx-2">
//                   <Link to={`/myorders/${context.Id}`}>My Orders</Link>
//                 </div>
//                 <div className="mx-2">
//                   <Link to="/cart">
//                     {/* <p>item</p> */}
//                     <Icon icon={shoppingCart}></Icon>
//                   </Link>
//                 </div>
//                 <div className="mx-2">
//                   <button
//                     type="button"
//                     className="btn btn-danger"
//                     onClick={handleLogout}
//                   >
//                     Logout
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <div className="mx-2">
//                   <Link to="/login">
//                     <button type="button" className="btn btn-danger">
//                       Login
//                     </button>
//                   </Link>
//                 </div>
//                 <div className="mx-2">
//                   <Link to="/signup">
//                     {" "}
//                     <button type="button" className="btn btn-danger">
//                       Signup
//                     </button>
//                   </Link>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Navbar;

import React, { useContext, useState } from 'react'
import { Link} from 'react-router-dom';
import "./Navbar.css";
import UserContext from "../UserContext";
import { auth } from './firebase';



const Navbar = ({user,show}) => {
  const context = useContext(UserContext);
  const handleLogout = () => {
    auth.signOut();
    window.location.replace("/login");
  };
  
  
 
  const [isMobile, setisMobile] = useState(false)


  return (
    <div>
      <div className="navbar1" >
      <a href="/" className="logo"><img  className="logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUVSxbETkWutHOuav5vb4dZ5VGD1ERFXZcIXVl7WWlkrU0Sc2EvsMKYURuV_eaz_cTgik&usqp=CAU" alt="logo"/></a>

       <ul className={isMobile ? "nav-links-mobile":"nav-links"} 
       onClick={()=>setisMobile(false)}>
         {
           user && show ?(
             <>
              <Link to="/" className="links" >
          <li>Home</li>
        </Link>
        <Link to="/profile" className="links" >
          <li>Profile</li>
        </Link>
        <Link to="/cart" className="links" >
          <li><i class=" material-icons">shopping_cart</i></li>
        </Link>
        <Link to={`/myorders/${context.Id}`} className="links" >
          <li>My Orders</li>
        </Link>
        <Link to="/login" className="links" >
          <li onClick={handleLogout} >Logout</li>
        </Link>
             </>
           ):
           <>
           <Link to="/login" className="links" >
          <li>Login</li>
        </Link>
        <Link to="/signup" className="links" >
          <li>Signup</li>
        </Link>
           </>
                   }
       
       </ul>
       <button className="mobile-menu-icon" onClick={()=>setisMobile(!isMobile)}> 
        {isMobile ?(<i class=" material-icons">clear</i>):(<i className="material-icons">menu</i>)}
       </button>
       
      </div>
    </div>
  )
}

export default Navbar
