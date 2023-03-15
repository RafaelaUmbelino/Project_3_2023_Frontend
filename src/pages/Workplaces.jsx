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
      <h1>Workplaces</h1>
      <div class="container-fluid px-4 px-sm-5">
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          {workplaces.map((workplace) => (
            <div class="card h-100">
              <img
                src="https://mdbcdn.b-cdn.net/img/new/standard/nature/184.webp"
                class="card-img-top"
                alt="Fissure in Sandstone"
              />
              <div class="card-body">
                <h5 class="card-title">{workplace.name}</h5>
                <p class="card-text">{workplace.description}</p>
                <a
                  href={`/workplaces/${workplace._id}`}
                  class="btn btn-primary"
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