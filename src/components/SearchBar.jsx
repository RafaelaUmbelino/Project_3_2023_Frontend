import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import workplaceService from '../services/workplace.service';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Searchbar(props) {
  const { setCategory, setSearch } = props;

  const categories = [
    'All',
    'coffee shop',
    'cowork space',
    'rating',
  
  ];
  

  const handleSearch = (e) => setSearch(e.target.value);
  const handleCategory = (e) => setCategory(e.target.value);
  

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // axios.post {search, filter}

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <select
          required="true"
          name="category"
          id="category"
          onChange={handleCategory}
        >
          {categories.map((filters) => {
            return <option value={filters}>{filters}</option>;
          })}
      
        </select>
        <input type="text" name="search" id="search" onChange={handleSearch} />
      </form>
    </section>
  );
}

export default Searchbar;