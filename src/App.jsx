import { useState, useRef, useEffect } from "react";
import "./App.css";

import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Workplaces from "./pages/Workplaces";
import WorkplaceDetails from "./pages/WorkplaceDetails";
import AddWorkplace from "./pages/AddWorkplace";
import EditWorkplace from "./pages/EditWorkplace";
import UserPage from "./pages/UserPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Private from "./components/Private";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";


function App() {

  return (
    <div className="App">

      <Navbar />

      <div className="center">
      

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/workplaces"
          element={
            <Private>
            <Workplaces />
            </Private>
          }
        />

        <Route path="/workplaces/:id" element={<Private>{<WorkplaceDetails />}</Private>} />
        <Route path="/workplaces/new" element={<Private>{<AddWorkplace />}</Private>} />
        <Route path="/workplaces/edit/:id" element={<Private>{<EditWorkplace />} </Private> }/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/:id" element={<Private>{<UserPage />}</Private>} />
      </Routes>

      </div>
    </div>
  );
}

export default App;
