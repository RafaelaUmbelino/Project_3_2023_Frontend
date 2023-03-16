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

  const deleteWorkplace = async () => {
    try {
      const deleteWorkplace = await workplaceService.deleteWorkplace(id);
      console.log(deleteWorkplace);
      navigate("/workplaces");
    } catch (error) {
      console.log(error);
    }
  };

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
      history.push(`/workplaces/${id}`)
      // navigate(0);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(workplace);
  return (
    <div>
      {workplace && ( //So that this runs after workplace
        <>
          <a href={workplace.link} target="_blank" rel="noreferrer">
            <h3>Name: {workplace.name}</h3>
          </a>
          <h3>Description: {workplace.description}</h3>
          <p>Address: {workplace.address}</p>
          <p>Type: {workplace.typeOfPlace}</p>
          <p>Paid: {workplace.paid}</p>
          <p>Rating: {workplace.rating}</p>
          <img src={workplace.imageUrl} alt="workplace" width="200" />
        </>
      )}

      

      <p>Comments:</p>
      {workplace &&
        workplace.comments.map((comments) => {
          return (
            <div key={comments._id}>
              <p>{comments.description}</p>
              <p>{comments.user.email}</p>
              <hr />
            </div>
          );
        })}

      {workplace && (
        <>
          <Link to={`/workplaces/edit/${workplace._id}`}>Edit Workplace</Link>
          <button onClick={addFavorite}>Add to Favorites</button>
          <button onClick={deleteWorkplace}>Delete</button>
        </>
      )}

      <form onSubmit={handleSubmit}>
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
  );
}
export default WorkplaceDetails;
