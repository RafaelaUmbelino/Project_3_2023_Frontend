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
            {loggedIn && (
              <>
                <MDBNavbarItem>
                  <MDBNavbarLink href="/workplaces" style={{ color: "white" }}>
                    Workplaces
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink
                    href="/workplaces/new"
                    style={{ color: "white" }}
                  >
                    Share Workplace
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink
                    href={`/user/${user._id}`}
                    style={{ color: "white" }}
                  >
                    User Page
                  </MDBNavbarLink>
                </MDBNavbarItem>

                <MDBNavbarItem>
                  <MDBNavbarLink
                    href=""
                    style={{ color: "white" }}
                    onClick={logout}
                  >
                    Logout
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </>
            )}
            {!loggedIn && (
              <>
                <MDBNavbarItem>
                  <MDBNavbarLink href="/signup" style={{ color: "white" }}>
                    Signup
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink href="/login" style={{ color: "white" }}>
                    Login
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </>
            )}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default Navbar;

{
  /* function Navbar() {
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
   } */
}
