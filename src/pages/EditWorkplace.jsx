import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import workplaceService from "../services/workplace.service";
import service from "../services/service"

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
  order: "order something",
};

// Define the Rating enum
const Rating = {
  stars1: 1,
  stars2: 2,
  stars3: 3,
  stars4: 4,
  stars5: 5,
};

function EditWorkplace() {
  const [typeOfPlace, setTypeOfPlace] = useState(PlaceType.coworkSpace);
  const [rating, setRating] = useState(Rating.stars5);
  const [description, setDescription] = useState("");
  const [paid, setPaid] = useState(Paid.no);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [link, setLink] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  /* const [imageUrl, setImageUrl] = useState(""); */

  const handleDescription = (e) => setDescription(e.target.value);
  const handleRating = (e) => setRating(e.target.value);
  const handleTypeOfPlace = (e) => setTypeOfPlace(e.target.value);
  const handlePaid = (e) => setPaid(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleAddress = (e) => setAddress(e.target.value);
  const handleLink = (e) => setLink(e.target.value);
  
  /* const handleImageUrl = (e) => setImageUrl(e.target.value); */

  const navigate = useNavigate();

   // ******** this method handles the file upload ********
   const handleFileUpload = (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();

    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("imageUrl", e.target.files[0]);

    service
      .uploadImage(uploadData)
      .then((response) => {
        // console.log("response is: ", response);
        // response carries "fileUrl" which we can use to update the state
        setImageUrl(response.fileUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const { id } = useParams();

  const getWorkplace = async () => {
    //Here we get the information

    try {
      const response = await workplaceService.getSingleWorkplace(id);
      //axios.get(
      //   `${import.meta.env.VITE_API_URL}/workplaces/${id}`
      // );

      //setting the state
      setDescription(response.data.description);
      setTypeOfPlace(response.data.typeOfPlace);
      setRating(response.data.rating);
      setName(response.data.name);
      setAddress(response.data.address);
      setLink(response.data.link);
    } catch (error) {
      console.log(error); //We don't do res.json because it's already the frontend
    }
  };

  useEffect(() => {
    getWorkplace();
  }, []);

  /*   const deleteWorkplace = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/workplaces/${id}`);
      console.log(deleteWorkplace);
      navigate("/workplaces");
    } catch (error) {
      console.log(error);
    }
  }; */

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      name,
      address,
      link,
      typeOfPlace,
      rating,
      description,
      paid,
      imageUrl,
      /* imageUrl, */
    }; //this is the information we'll send to the backend - We save on this variable what the user has on the input.
    //typeOfPlace, rating, , paid
    try {
      await workplaceService.updateWorkplace(id, body);
      // axios.put(`${import.meta.env.VITE_API_URL}/workplaces/${id}`, body); //needs the url to post to, and the information to send. - We get the request from projects.
      navigate(`/workplaces/${id}`); //So we go back to that project
    } catch (error) {
      console.log(error);
    }
  };

  return (

    <section>
    <h1>Edit Workplace:</h1>

    <form onSubmit={handleSubmit}>
    <div class="row">
      <div class="col">
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        value={name}
        onChange={handleName}
      />
      </div>
       <div class="col">

      <label htmlFor="address">Address</label>
      <input
        type="text"
        name="address"
        id="address"
        value={address}
        onChange={handleAddress}
      />
       </div>
    </div>

      <label htmlFor="link">Link</label>
      <input
        type="text"
        name="link"
        id="link"
        value={link}
        onChange={handleLink}
      />

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
        <option value={Paid.order}>Order Something</option>
      </select>

      <label htmlFor="rating">Rating</label>
      <select id="rating" name="rating" onChange={handleRating}>
        <option value={Rating.stars1}>1</option>
        <option value={Rating.stars2}>2</option>
        <option value={Rating.stars3}>3</option>
        <option value={Rating.stars4}>4</option>
        <option value={Rating.stars5}>5</option>
      </select>

      <input type="file" onChange={(e) => handleFileUpload(e)} />

      <button type="submit">Edit Workplace</button>
    </form>
  </section>




    // <section>
    //   <h1>Edit Workplace:</h1>

    //   <form onSubmit={handleSubmit}>
    //     <label htmlFor="name">Name</label>
    //     <input
    //       type="text"
    //       name="name"
    //       id="name"
    //       value={name}
    //       onChange={handleName}
    //     />

    //     <label htmlFor="address">Address</label>
    //     <input
    //       type="text"
    //       name="address"
    //       id="address"
    //       value={address}
    //       onChange={handleAddress}
    //     />

    //     <label htmlFor="link">Link</label>
    //     <input
    //       type="text"
    //       name="link"
    //       id="link"
    //       value={link}
    //       onChange={handleLink}
    //     />

    //     <label htmlFor="typeOfPlace">Type of Place</label>
    //     <select
    //       id="typeOfPlace"
    //       name="typeOfPlace"
    //       onChange={handleTypeOfPlace}
    //     >
    //       <option value={PlaceType.coworkSpace}>Cowork Space</option>
    //       <option value={PlaceType.coffeeShop}>Coffee Shop</option>
    //       <option value={PlaceType.library}>Library/Bookstore</option>
    //     </select>

    //     <label htmlFor="description">Description</label>
    //     <input
    //       type="text"
    //       name="description"
    //       id="description"
    //       value={description}
    //       onChange={handleDescription}
    //     />

    //     <label htmlFor="paid">Paid</label>
    //     <select id="paid" name="paid" onChange={handlePaid}>
    //       <option value={Paid.yes}>Yes</option>
    //       <option value={Paid.no}>No</option>
    //       <option value={Paid.order}>Order Something</option>
    //     </select>

    //     <label htmlFor="rating">Rating</label>
    //     <select id="rating" name="rating" onChange={handleRating}>
    //       <option value={Rating.stars1}>1</option>
    //       <option value={Rating.stars2}>2</option>
    //       <option value={Rating.stars3}>3</option>
    //       <option value={Rating.stars4}>4</option>
    //       <option value={Rating.stars5}>5</option>
    //     </select>

    //     <button type="submit">Edit Workplace</button>
    //   </form>
    // </section>
    //-----------------

    // {/*
    //       <form onSubmit={handleSubmit}>
    //         <label htmlFor="description">Description</label>
    //         <input
    //           type="text"
    //           name="description"
    //           id="description"
    //           value={description}
    //           onChange={handleDescription}
    //         />

    //         <label htmlFor="typeOfPlace">TypeOfPlace</label>
    //         <input
    //           type="text"
    //           name="typeOfPlace"
    //           id="typeOfPlace"
    //           value={typeOfPlace}
    //           onChange={handleTypeOfPlace}
    //         />

    //         <label htmlFor="rating">Rating</label>
    //         <input
    //           type="text"
    //           name="rating"
    //           id="rating"
    //           value={rating}
    //           onChange={handleRating}
    //         />

    //         <label htmlFor="paid">Paid</label>
    //         <input
    //           type="text"
    //           name="paid"
    //           id="paid"
    //           value={paid}
    //           onChange={handlePaid}
    //         /> */}

  );
}

export default EditWorkplace;
