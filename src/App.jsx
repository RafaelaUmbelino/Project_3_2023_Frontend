import { useState, useRef, useEffect } from 'react'
import './App.css'


function App() {
  

  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const options = {
   componentRestrictions: { country: "PT" },
   fields: ["address_components", "geometry", "icon", "name"],
   types: ["establishment"]
  };
  useEffect(() => {
   autoCompleteRef.current = new window.google.maps.places.Autocomplete(
    inputRef.current,
    options
   );
  }, []);

  return (
    <div className="App">
        <label>enter address :</label>
   <input ref={inputRef} />
    </div>
  )
}

export default App
