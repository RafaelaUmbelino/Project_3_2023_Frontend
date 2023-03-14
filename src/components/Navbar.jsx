import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

/* import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'; */

function Navbar() {
  const { loggedIn, user, logout } = useContext(AuthContext);

  return (
    <nav>
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
}

//We just pass the fragment above, we use the ternary to say that if the user is loggedin,
//we show projects and add Project, if it's not, we just show signup and login.

export default Navbar;

/*     <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
          {loggedIn ? (
            <Nav.Link to="/">Home</Nav.Link>
              <span>Hello {user.name}</span>
            <Nav.Link to="/workplaces">Workplaces</Nav.Link>
            <Nav.Link to="/workplaces/new">Add Workplaces</Nav.Link>
            <Nav.Link to={`/user/${user._id}`}>User</Nav.Link>
            <button onClick={logout}>Logout</button>
            ) : (
            <Nav.Link to="/login">Log In</Nav.Link>
            <Nav.Link to="/signup">Sign Up</Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
      </> */
