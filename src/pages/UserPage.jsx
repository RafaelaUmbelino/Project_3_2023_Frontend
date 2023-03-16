import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import workplaceService from "../services/workplace.service";

function UserPage() {
  const [user, setUser] = useState(null);
  const [showCreated, setShowCreated] = useState(false);
  const [showFavorite, setShowFavorite] = useState(false);

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

  const deleteWorkplace = async (workplaceId) => {
    try {
      const deleteWorkplace = await workplaceService.deleteWorkplace(
        workplaceId
      );
      console.log(deleteWorkplace);
      await getUser(); // update user state after deleting workplace
      history.push(`/user/${id}`);
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
          <h1 id="user-greeting">Hello, {user.name}</h1>
        </>
      )}

      <section>
        <h2 onClick={() => setShowCreated(!showCreated)}>
          Your Created Workplaces{" "}
          <i className={`fas fa-chevron-${showCreated ? "up" : "down"}`}></i>
        </h2>
        {showCreated && (
          <div class="container-fluid px-4 px-sm-5">
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
              {user &&
                user.createdWorkplaces.map((workplace) => (
                  <div class="card h-100">
                    <img
                      src={workplace.imageUrl}
                      class="card-img-top"
                      alt="Workplace"
                    />
                    <div class="card-body">
                      <h5 class="card-title">{workplace.name}</h5>
                      <p class="card-text">{workplace.description}</p>
                      <a
                        href={`/workplaces/${workplace._id}`}
                        class="btn btn-primary" id="detailsButtons"
                      >
                        View Details
                      </a>
                      <a class="btn btn-primary" href="" id="detailsButtons"
                       onClick={() => deleteWorkplace(workplace._id)}>
                        Delete Workplace </a>
                      
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </section>

      <section>
        <h2 onClick={() => setShowFavorite(!showFavorite)}>
          Your Favorite Workplaces{" "}
          <i className={`fas fa-chevron-${showFavorite ? "up" : "down"}`}></i>
        </h2>
        {showFavorite && (
          <div class="container-fluid px-4 px-sm-5">
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
              {user &&
                user.favoriteWorkplaces.map((favoriteWorkplace) => (
                  <div class="card h-100">
                    <img
                      src={favoriteWorkplace.imageUrl}
                      class="card-img-top"
                      alt="Favorite Workplace"
                    />
                    <div class="card-body">
                      <h5 class="card-title">{favoriteWorkplace.name}</h5>
                      <p class="card-text">{favoriteWorkplace.description}</p>
                      <a
                        href={`/workplaces/${favoriteWorkplace._id}`}
                        class="btn btn-primary" id="detailsButtons"
                      >
                        View Details
                      </a>
                      {/* <button
                        onClick={() => deleteFavorite(favoriteWorkplace._id)}
                      >
                        Delete Favorite
                      </button> */}

                      <a class="btn btn-primary" href="" id="detailsButtons"
                       onClick={() => deleteFavorite(favoriteWorkplace._id)}> Delete Favorite </a>

                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </section>

      {/* <h2>Comments:</h2>
      {user &&
        user.userComments.map((userComments) => {
          return <div key={userComments._id}></div>;
        })} */}
    </div>
  );
}

export default UserPage;