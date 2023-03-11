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

      setProjects(response.data); //setting the state
    } catch (error) {
      console.log(error); //We don't do res.json because it's already the frontend
    }
  };

  useEffect(() => {
    getWorkplaces(); //Here we call the function.
  }, []);

  return (
    <section>
      <h1>Workplaces</h1> {/*Since Projects is an array, we can map */}
      {workplaces.map((workplaces) => {
        return (
          <Link to={`/projects/${project._id}`} key={workplace._id}>
            <h3>{project.title}</h3>
          </Link>
        );
      })}
    </section>
  );
}

//accepts a function and an array - We want to call this function when we mount the component - Load the page, get projects and never get them again unless we edit or delete.

export default Workplaces;
