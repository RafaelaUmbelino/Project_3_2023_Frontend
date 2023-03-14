import axios from "axios";

class WorkplaceService {
  constructor() {
    //We don't pass anything in the parenthesis because we know what we want to pass

    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || "http://localhost:5005",
    });

    //Here we intercept every request that uses this api and call a middleware function.

    this.api.interceptors.request.use((config) => {
      //inside this middleware function the first thing we do is get the token from the localstorage.

      const storedToken = localStorage.getItem("authToken"); //check if there's a token, and if yes, send the token.

      //if there is a token we're going to add it to the headers of the request

      if (storedToken) {
        //Here we pass to the heards an object with Authorization and the bearer token.

        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  //Here we can create the methods to connect to the API

  // Get all Projects

  getAllWorkplaces = () => {
    return this.api.get("/workplaces");
    //
    //the return above is the same as: axios.get(`${import.meta.env.VITE_API_URL/api/projects}`)
  };

  //Create a project
  //body refers to the object with title and description

  createWorkplace = (body) => {
    return this.api.post("/workplaces/new", body); //It's post because we're creating!
  };

  //To get a single project

  getSingleWorkplace = (id) => {
    return this.api.get(`/workplaces/${id}`);
  };

  //Edit workplace
  updateWorkplace = (id, body) => {
    return this.api.put(`/workplaces/${id}`, body);
  };

  //Delete
  deleteWorkplace = (id) => {
    return this.api.delete(`/workplaces/${id}`);
  };

  //Favorite
  addFavorite = (workplaceId) => {
    console.log(workplaceId);
    return this.api.put(`/users/${workplaceId}/favorites`);
  };
}

const workplaceService = new WorkplaceService();

export default workplaceService; //Here we export the object not the class, so, lowercase.
