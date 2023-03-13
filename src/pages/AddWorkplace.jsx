import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import workplaceService from "../services/workplace.service";

// Define the PlaceType enum
const PlaceType = {
  coworkSpace: "cowork space",
  coffeeShop: "coffee shop",
  library: "library/bookstore",
};

// Define the Paid enum
const Paid = {
  yes: "yes",
  no: "no",
  //  order: "order something",
};

// Define the Rating enum
const Rating = {
  stars1: 1,
  stars2: 2,
  stars3: 3,
  stars4: 4,
  stars5: 5,
};

function AddWorkplace() {
  const [typeOfPlace, setTypeOfPlace] = useState(PlaceType.coworkSpace);
  const [rating, setRating] = useState(Rating.stars5);
  const [description, setDescription] = useState("");
  const [paid, setPaid] = useState(Paid.no);

  const handleDescription = (e) => setDescription(e.target.value);
  const handleRating = (e) => setRating(e.target.value);
  const handleTypeOfPlace = (e) => setTypeOfPlace(e.target.value);
  const handlePaid = (e) => setPaid(e.target.value);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { typeOfPlace, rating, description, paid }; //this is the information we'll send to the backend - We save on this variable what the user has on the input.

    try {
      const createdWorkplace = await workplaceService.createWorkplace({
        typeOfPlace,
        rating,
        description,
        paid,
      });
      console.log(createdWorkplace);
      // We replace: axios.post(`${import.meta.env.VITE_API_URL}/api/projects`, body) for the one above //needs the url to post to, and the information to send. - We get the request from projects.
      navigate("/workplaces");

      /* const storedToken = localStorage.getItem("authToken");

      await axios.post(
        `${import.meta.env.VITE_API_URL}/workplaces/new`,
        { typeOfPlace, rating, description, paid },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );

      setTypeOfPlace(PlaceType.coworkSpace);
      setRating(Rating.stars5);
      setDescription("");
      setPaid(Paid.no);

      navigate(`/workplaces`); */
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <h1>Create Workplace:</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="typeOfPlace">Type of Place</label>
        <select
          id="typeOfPlace"
          name="typeOfPlace"
          onChange={handleTypeOfPlace}
        >
          <option value={PlaceType.coworkSpace}>Cowork Space</option>
          <option value={PlaceType.coffeeShop}>Coffee Shop</option>
          <option value={PlaceType.library}>Library/Bookstore</option>
        </select>

        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          value={description}
          onChange={handleDescription}
        />

        <label htmlFor="paid">Paid</label>
        <select id="paid" name="paid" onChange={handlePaid}>
          <option value={Paid.yes}>Yes</option>
          <option value={Paid.no}>No</option>
          {/*  <option value={Paid.order}>Order Something</option> */}
        </select>

        <label htmlFor="rating">Rating</label>
        <select id="rating" name="rating" onChange={handleRating}>
          <option value={Rating.stars1}>1</option>
          <option value={Rating.stars2}>2</option>
          <option value={Rating.stars3}>3</option>
          <option value={Rating.stars4}>4</option>
          <option value={Rating.stars5}>5</option>
        </select>

        <button type="submit">Add Workplace</button>
      </form>
    </section>
  );
}

export default AddWorkplace;
