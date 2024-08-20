import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../authcontext/authContext";
import "./navBar.css";

export const NavBar = () => {
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()
    const isAdmin = user?.isAdmin

    //signout
    const signout= () => {
        console.log('clicked')
        navigate('/')
    return localStorage.removeItem("accessToken");

    }

    //navigate to purchases
    const navPurchases = () => {
        navigate('/purchasePage')
    }

    //navigate to homePage
    const navHome = () => {
      navigate("/homePage");
    };

    //navigate to adminPage
    const navAdmin = () => {
        navigate("/adminPage")
    }

    
    return (
      <div className="nav-container">
        <div>
          <span>Film Page</span>
        </div>
        <div className="nav-routes">
        
          <span onClick={navHome}>
            Home
          </span>
          {
          isAdmin === true ? 
          <span onClick={navAdmin}>
            Admin
          </span> 
          : null
          }
          <span onClick={navPurchases}>
            Purchases
          </span>
          <span onClick={signout} 
                style={{cursor: "pointer"}}>
                    SignOut
          </span>
        </div>
      </div>
    );
}