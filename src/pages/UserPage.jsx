import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import workplaceService from "../services/workplace.service";

function UserPage() {
  const [user, setUser] = useState(null);

  const { id } = useParams();
  /* let currentUser = req.payload_id; */

  const getUser = async () => {
    //Here we get the information

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/${id}`
      );

      setUser(response.data); //setting the state
    } catch (error) {
      console.log(error); //We don't do res.json because it's already the frontend
    }
  };

  useEffect(() => {
    getUser();
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

  const deleteFavorite = async (favoriteId) => {
    try {
      const deleteFavorite = await workplaceService.deleteFavorite(favoriteId);
      console.log(deleteFavorite);
      await getUser();
      // const deleteFavorite = await workplaceService.deleteFavorite(id);
      // console.log(deleteFavorite);
      // navigate("/workplaces");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {user && ( //So that this runs after project
        <>
          <h1>Hello, {user.name}</h1>
        </>
      )}

      <h2>Created:</h2>
      {user &&
        user.createdWorkplaces.map((workplace) => {
          return (
            <Link to={`/workplaces/${workplace._id}`} key={workplace._id}>
              <h3>{workplace.description}</h3>
            </Link>
          );
        })}

      <h2>Favorites:</h2>
      {user &&
        user.favoriteWorkplaces.map((favoriteWorkplaces) => {
          return (
            <div key={favoriteWorkplaces._id}>
              <p>{favoriteWorkplaces.description}</p>
              <button onClick={() => deleteFavorite(favoriteWorkplaces._id)}>
                Delete
              </button>
            </div>
          );
        })}

      <h2>Comments:</h2>
      {user &&
        user.userComments.map((userComments) => {
          return <div key={userComments._id}></div>;
        })}
    </div>
  );
}

export default UserPage;
