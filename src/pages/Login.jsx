import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function Login() {
  //Pieces of state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Handles

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const { authenticateUser } = useContext(AuthContext); //Deconstruct authenticate user.

  //Handle for the submit button

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        { email, password }
      ); //We need to send the necessary info.

      localStorage.setItem("authToken", response.data.authToken); //This stores the users login.

      authenticateUser();

      console.log(response.data.authToken); //This is just to check if user is being created, if yes, add navigate.
      navigate("/workplaces");
    } catch (error) {
      console.log(error);
    }
  };

  //To be redirected to login after signup

  const navigate = useNavigate();

  return (
    <section>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleEmail}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handlePassword}
        />

        <button type="submit">Login</button>
      </form>

      <p>Don't have an account?</p>
      <Link to="/signup">Signup</Link>
    </section>
  );
}

export default Login;
