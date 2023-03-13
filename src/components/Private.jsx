import React, { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

function Private({ children }) {
  const { loading, loggedIn } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;

  if (!loggedIn) {
    return <Navigate to="/login" />; // Here we send the user back to the login page if it's not logged in.
  } else {
    return children;
  }
}

export default Private;
