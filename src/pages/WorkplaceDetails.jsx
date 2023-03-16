import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import workplaceService from "../services/workplace.service";
import { AuthContext } from "../context/auth.context";

function WorkplaceDetails() {
  const [workplace, setWorkplace] = useState(null);
  const { id } = useParams();
  const { tokenUpdate } = useContext(AuthContext);
  //console.log(id);

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

  //Delete Workplace

  // const deleteWorkplace = async () => {
  //   try {
  //     const deleteWorkplace = await workplaceService.deleteWorkplace(id);
  //     console.log(deleteWorkplace);
  //     navigate("/workplaces");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  //Add to Favorites

  const addFavorite = async () => {
    try {
      const addFavorite = await workplaceService.addFavorite(id);
      console.log(workplace);
      console.log(addFavorite);
      navigate("/workplaces");
    } catch (error) {
      console.log(error);
    }
  };

  const [description, setDescription] = useState("");

  const handleComment = (e) => setDescription(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const body = { description, user  }; //this is the information we'll send to the backend - We save on this variable what the user has on the input.

    try {
      const storedToken = localStorage.getItem("authToken");

      const createdComment = await axios.post(
        `${import.meta.env.VITE_API_URL}/comment/${id}`,
        { description },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );
      setDescription("");
      tokenUpdate();
      console.log(createdComment);
      // We replace: axios.post(`${import.meta.env.VITE_API_URL}/api/projects`, body) for the one above //needs the url to post to, and the information to send. - We get the request from projects.
      await getWorkplace();
      history.push(`/workplaces/${id}`);
      // navigate(0);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(workplace);
  return (
    <div>
      {workplace && (
        <section>
          <div className="container-fluid">
            <div className="row row-cols-2 g-2 my-4">
              <div className="card pe-4">
                <img
                  src={workplace.imageUrl}
                  className="card-img-top w-100"
                  alt="Fissure in Sandstone"
                />
                <div className="card-body">
                  <a href={workplace.link} target="_blank" rel="noreferrer">
                    <h5 className="card-title">{workplace.name}</h5>
                  </a>
                  <p className="card-text">
                    <b>Description:</b> {workplace.description}
                  </p>
                  <p className="card-text">
                    <b>Address:</b> {workplace.address}
                  </p>
                  <p className="card-text">
                    <b>Type of Place:</b>
                    {workplace.typeOfPlace}
                  </p>
                  <p className="card-text">
                    <b>Is it paid?</b> {workplace.paid}
                  </p>
                  <p className="card-text">
                    <b>Rating:</b> {workplace.rating}
                  </p>
                  {workplace && (
                    <>
                      <a
                        href={`/workplaces/edit/${workplace._id}`}
                        className="btn btn-primary"
                        id="detailsButtons"
                      >
                        Add Changes
                      </a>
                      <a href="#" onClick={addFavorite} className="btn btn-primary" id="detailsButtons">Add to Favorites</a>
                      {/* <a
                        class="btn btn-primary"
                        href=""
                        id="detailsButtons"
                        onClick={addFavorite}
                      >
                        Add to Favorites
                      </a> */}
                    </>
                  )}
                </div>
              </div>
              <div className="card ps-4">
                <form onSubmit={handleSubmit}>
                  {workplace &&
                    workplace.comments.map((comment) => {
                      return (
                        <div key={comment._id}>
                          <p>{comment.description}</p>
                          {/* <p>{comment.user.name}</p> */}
                          <hr />
                        </div>
                      );
                    })}
                  <label htmlFor="comment">Comment</label>
                  <input
                    type="text"
                    name="comment"
                    id="comment"
                    value={description}
                    onChange={handleComment}
                  />
                  <button type="submit">Add Comment</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
export default WorkplaceDetails;
