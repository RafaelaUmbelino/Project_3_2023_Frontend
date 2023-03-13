import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from '../context/auth.context' 

function WorkplaceDetails() {
  const [workplace, setWorkplace] = useState(null);

  const { id } = useParams();

  const getWorkplace = async () => {
    //Here we get the information

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/workplaces/${id}`,
    
      {
        headers: { Authorization: `Bearer ${storedToken}` },
      }
    );
      

      setWorkplace(response.data); //setting the state
    } catch (error) {
      console.log(error); //We don't do res.json because it's already the frontend
    }
  };

  useEffect(() => {
    getWorkplace();
  }, []); //Dependency array []

  return (
    <div>
      {workplace && ( //So that this runs after workplace
        <>
          <h1>{workplace.paid}</h1>
          <p>{workplace.description}</p>
        </>
      )}

      <h2>Comments:</h2>
      {workplace &&
        workplace.comments.map((comments) => {
          return (
            <div key={comments._id}>
              <p>{comments.description}</p>
            </div>
          );
        })}

      {workplace && (
        <Link to={`/workplaces/${workplace._id}`}>Edit Workplace</Link>
      )}
    </div>
  );
}

export default WorkplaceDetails;
