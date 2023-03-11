import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'


function WorkplaceDetails() {
    const [workplace, setWorkplace] = useState(null);

    const {id} = useParams()

    const getWorkplace = async () => {
        //Here we get the information
    
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/projects/${id}`);
    
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

    {workplace && ( //So that this runs after project
        <>
    
    <h1>{workplace.title}</h1>
    <p>{workplace.description}</p>

    </>
    )}

     <h2>Comments:</h2>
     {workplace && workplace.comments.map((comments) => {
        return (
            <div key={comments._id}>

            <p>{comments.description}</p>

            </div>
        )
     })}

     {workplace &&  <Link to={`/projects/edit/${project._id}`}>Edit Project</Link>}

    </div>
  );
}

export default WorkplaceDetails