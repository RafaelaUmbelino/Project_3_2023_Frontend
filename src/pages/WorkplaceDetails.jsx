import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import workplaceService from "../services/workplace.service";

function WorkplaceDetails() {
  const [workplace, setWorkplace] = useState(null);

  const { id } = useParams();

  const navigate = useNavigate();

  const getWorkplace = async () => {
    //Here we get the information

    try {
      const response = await workplaceService.getSingleWorkplace(id);

      setWorkplace(response.data); //setting the state
    } catch (error) {
      console.log(error); //We don't do res.json because it's already the frontend
    }
  };

  useEffect(() => {
    getWorkplace();
  }, []); //Dependency array []

  const deleteWorkplace = async () => {
    try {
      const deleteWorkplace = await workplaceService.deleteWorkplace(id);
      console.log(deleteWorkplace);
      navigate("/workplaces");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {workplace && ( //So that this runs after workplace
      <>
          <h3>Description: {workplace.description}</h3>
          <p>Type: {workplace.typeOfPlace}</p>
          <p>Paid: {workplace.paid}</p>
          <p>Rating: {workplace.rating}</p>
        </>
      )}

      <p>Comments:</p>
      {workplace &&
        workplace.comments.map((comments) => {
          return (
            <div key={comments._id}>
              <p>{comments.description}</p>
            </div>
          );
        })}

      {workplace && (
        <Link to={`/workplaces/edit/${workplace._id}`}>Edit Workplace</Link>
      )}

      <button onClick={deleteWorkplace}>Delete</button>
    </div>
  );
}

export default WorkplaceDetails;
