import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";


import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBCollapse,
} from "mdb-react-ui-kit";

function Navbar() {
  const { loggedIn, user, logout } = useContext(AuthContext);
  const [showNavColor, setShowNavColor] = useState(false);

  return (
    <MDBNavbar expand="lg" dark bgColor="dark">
      <MDBContainer fluid>
        <MDBNavbarBrand href="/">TITLE</MDBNavbarBrand>
        <MDBNavbarToggler
          type="button"
          data-target="#navbarColor02"
          aria-controls="navbarColor02"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowNavColor(!showNavColor)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse show={showNavColor} navbar>
          <MDBNavbarNav className="me-auto mb-2 mb-lg-0">
            <MDBNavbarItem className="active">
              <MDBNavbarLink aria-current="page" href="/home">
                Home
              </MDBNavbarLink>
            
            </MDBNavbarItem>
            {/* <MDBNavbarItem>
              <MDBNavbarLink>{`Hello ${user.name}`}</MDBNavbarLink>
            </MDBNavbarItem> */}
            <MDBNavbarItem>
              <MDBNavbarLink href="/workplaces">Workplaces</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href="/workplaces/new">
                Add Workplaces
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href="/">Profile</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink  onClick={logout} >Logout</MDBNavbarLink>
            </MDBNavbarItem>
           
           <MDBNavbarItem>
              <MDBNavbarLink href="/signup">Signup</MDBNavbarLink>
            </MDBNavbarItem>
           <MDBNavbarItem>
              <MDBNavbarLink href="/login">Login</MDBNavbarLink>
            </MDBNavbarItem>
           
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}


export default Navbar;


    
    {/* function Navbar() {
     const { loggedIn, user, logout } = useContext(AuthContext);
    
     return (
       <nav >
         <Link to="/"> Home </Link>
    
         {loggedIn ? (
           <>
             <span>Hello {user.name}</span>
             <Link to="/workplaces"> Workplaces </Link>
             <Link to="/workplaces/new"> Add Workplace </Link>
             <Link to={`/user/${user._id}`}> User </Link>
             <button onClick={logout}>Logout</button>
           </>
         ) : (
           <>
             <Link to="/signup"> Signup </Link>
             <Link to="/login"> Login </Link>
           </>
         )}
       </nav>
     );
   } */}