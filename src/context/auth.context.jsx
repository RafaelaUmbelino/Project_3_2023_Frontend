import React from "react";
import { useState, useEffect, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

function AuthWrapper(props) {
  const [loggedIn, setLoggedIn] = useState(false); //This always starts as false.
  const [user, setUser] = useState(null); //Starts as null because it's an object.
  const [loading, setLoading] = useState(true); //Always starts as true, when get reply we change to false.

  //functions and methods for the token.

  const authenticateUser = async () => {
    //check for a token

    const storedToken = localStorage.getItem("authToken"); // Checks if there's a token and stores it in a variable

    //if token exists

    if (storedToken) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/verify`,
          {
            //the route we want to enter.
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
       

        //Here we know that the response is ok, so we can update the states.

        setLoggedIn(true);
        setUser(response.data); //Inside response.data we get what the API sends us, the user Info.
        setLoading(false);
      } catch (error) {
        // If there's an error it's safer to not login.

        console.log(error);

        //Here we know we got an error.

        setLoggedIn(false);
        setUser(null);
        setLoading(false);
      }
    } else {
      //Copy/Paste from error in the catch, should happen the same.

      setLoggedIn(false);
      setUser(null);
      setLoading(false);
    }
  };

  //This makes it so that the session stays active, user loggedin

  const logout = () => {
    localStorage.removeItem("authToken");
    authenticateUser();
  };

  useEffect(() => {
    authenticateUser();
  }, []);


  const tokenUpdate = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/updateToken`,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );
      console.log("tokenUpdate", response);
    } catch (error) {
      console.log(error);
    }
  };


  //Grabs the context and provides it through the whole app.

  return (
    <AuthContext.Provider
      value={{ loggedIn, user, loading, authenticateUser, logout, tokenUpdate }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthWrapper };
