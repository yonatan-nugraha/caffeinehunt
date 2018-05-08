import React from 'react';

const Form = ({ handleGetRestaurants, coordinates, isLoading }) => (
  <div className="input-group search-bar">
    <input type="text" className="form-control" placeholder={`${coordinates.latitude}, ${coordinates.longitude}`} disabled/>
    <span className="search-button">
      <button 
        type="button" 
        className={ isLoading ? "btn btn-secondary disabled" : "btn btn-danger" }
        onClick={handleGetRestaurants}>
        <span className="glyphicon glyphicon-search">Find</span>
      </button>  
    </span>
  </div>
);

export default Form;