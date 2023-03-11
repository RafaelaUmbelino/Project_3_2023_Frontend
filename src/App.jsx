import { useState, useRef, useEffect } from 'react'
import './App.css'

import {Routes, Route} from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Workplaces from './pages/Workplace';
import WorkplaceDetails from './pages/WorkplaceDetails';
import AddWorkplace from './pages/AddWorkplace';
import EditWorkplace from './pages/EditWorkplace';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Private from './components/Private';


function App() {
  
//  const autoCompleteRef = useRef();
//  const inputRef = useRef();
//  const options = {
//   componentRestrictions: { country: "PT" },
//   fields: ["address_components", "geometry", "icon", "name"],
//   types: ["establishment"]
//  };
//  useEffect(() => {
//   autoCompleteRef.current = new window.google.maps.places.Autocomplete(
//    inputRef.current,
//    options
//   );
//  }, []);


 return (
   <div className="App">
{/* //        <label>enter address :</label>
//   <input ref={inputRef} /> */}
  
  
  <Navbar />
  
  <Routes>

  <Route path="/" element = {<Home />} />
  
  <Route path="/projects" element = {

  <Private>

     <Workplaces />

  </Private>

  } 

  />
  

  <Route path="/projects/:id" element={<WorkplaceDetails />} />
  <Route path="/projects/new" element={<AddWorkplace />} /> 
  <Route path="/projects/edit/:id" element={<EditWorkplace />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/login" element={<Login />} />

 </Routes>
   </div>
 )

}

export default App
