//package imports
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import workplaceService from "../services/workplace.service";


//css

//components

function Workplaces() {
  const [workplaces, setWorkplaces] = useState([]);

  const getWorkplaces = async () => {
    //Here we get the information

    try {
      const response = await workplaceService.getAllWorkplaces();
      // axios.get( `${import.meta.env.VITE_API_URL}/api/projects` ); - We replace the previous, import.meta for the one we created on services.

      console.log(response.data); //To check what we're getting.

      setWorkplaces(response.data); //setting the state
    } catch (error) {
      console.log(error); //We don't do res.json because it's already the frontend
    }
  };

  useEffect(() => {
    getWorkplaces(); //Here we call the function.
  }, []);

  return (
    <section>
      <h1 id="workplaces-title">Workplaces</h1>
      
      <div className="container-fluid px-4 px-sm-5">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          {workplaces.map((workplace) => (
            <div className="card h-100">
              <img
                src={workplace.imageUrl}
                className="card-img-top"
                alt={workplace.name}
              />
              <div className="card-body">
                <h5 className="card-title">{workplace.name}</h5>
                <p className="card-text">{workplace.address}</p>
                <a
                  href={`/workplaces/${workplace._id}`}
                  className="btn btn-primary"
                >
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

//accepts a function and an array - We want to call this function when we mount the component - Load the page, get projects and never get them again unless we edit or delete.

export default Workplaces;