import React, {useState} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'


function Signup() {
    //Pieces of state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //Handles

    const handleName = (e) => setName(e.target.value)
    const handleEmail = (e) => setEmail(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)

    //Handle for the submit button

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, {name, email, password}); //We need to send the necessary info. 
            console.log(response.data); //This is just to check if user is being created, if yes, add navigate.
            navigate("/login");
            
        } catch (error) {
            console.log(error)
        }
    }

    //To be redirected to login after signup

    const navigate = useNavigate()
    


  return (
    <section>
    
    <h1>Signup</h1>
    
    <form onSubmit={handleSubmit}>

    <label htmlFor="name">Name</label>
    <input type="text" name="name" value={name} onChange={handleName}/>

    <label htmlFor="email">Email</label>
    <input type="email" name= "email" id="email" value= {email} onChange= {handleEmail} />
  
    <label htmlFor="password">Password</label>
    <input type="password" name= "password" id="password" value= {password} onChange= {handlePassword} />

    <button type="submit">Create Account</button>

    </form>

    <p>Already have an account?</p>
    <Link to="/login">Login</Link>
    
    </section>

    
  )
}

export default Signup