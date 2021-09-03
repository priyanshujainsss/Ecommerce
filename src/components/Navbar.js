import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import UserContext from "../UserContext";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./Redux/actions";
import logo from '../assets/shopping-bag.png'
const Navbar = ({ user, show }) => {
  const context = useContext(UserContext);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.cartLengthReducer);
  const handleLogout = async () => {
    try {
      await auth.signOut();
      dispatch(logout(false));
      window.location.replace("/login");
    } catch (err) {
      console.log("failed to logout", err);
    }
  };

  const [isMobile, setisMobile] = useState(false);

  return (
    <div>
      <div className="navbar1">
        <a href="/" className="px-8 ">
          <img
            className="logo"
            src={logo}
           
            // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUVSxbETkWutHOuav5vb4dZ5VGD1ERFXZcIXVl7WWlkrU0Sc2EvsMKYURuV_eaz_cTgik&usqp=CAU"
            alt="logo"
          />
        </a>

        <ul
          className={isMobile ? "nav-links-mobile" : "nav-links"}
          onClick={() => setisMobile(false)}
        >
          {user && show ? (
            <>
              <Link to="/" className="links" style={{ marginTop: "10px" }}>
                <li>Home</li>
              </Link>
              <Link
                to="/profile"
                className="links"
                style={{ marginTop: "10px" }}
              >
                <li>Profile</li>
              </Link>
              <Link to="/cart" className="links">
                {isMobile ? (
                  <li>Cart</li>
                ) : (
                  <li
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      lineHeight: "10px",
                      padding: "0px",
                      overflowY: "visible",
                    }}
                  >
                    <p
                      style={{
                        marginBottom: "-7px",
                        color: "red",
                        fontWeight: "bold",
                        border: "2px solid black",
                        borderRadius: "20px",
                        backgroundColor: "white",
                        height: "25px",
                        maxWidth: "20px",
                        padding: "5px 2px 0 2px",
                        marginLeft: "2px",
                      }}
                    >
                      {state}
                    </p>

                    <i className=" material-icons">shopping_cart</i>
                  </li>
                )}
              </Link>
              <Link
                to={`/myorders/${context.Id}`}
                className="links"
                style={{ marginTop: "10px" }}
              >
                <li>My Orders</li>
              </Link>
              <Link to="/login" className="links" style={{ marginTop: "10px" }}>
                <li onClick={handleLogout}>Logout</li>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="links">
                <li>Login</li>
              </Link>
              <Link to="/signup" className="links">
                <li>Signup</li>
              </Link>
            </>
          )}
        </ul>
        <button
          className="mobile-menu-icon"
          onClick={() => setisMobile(!isMobile)}
        >
          {isMobile ? (
            <i className=" material-icons">clear</i>
          ) : (
            <i className="material-icons">menu</i>
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
