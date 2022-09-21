import React, { useState, useContext } from 'react';
import FilterContext from '../context/FilterContext';

function Filter() {
  const [filterName, setFilterName] = useState({
    name: '',
  });
  const [filterNumericValues, setfilterByNumericValues] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });
  const { createFilter, createNumericalFilter } = useContext(FilterContext);

  const onImputChange = (event) => {
    setFilterName({
      name: event.target.value,
    });
    createFilter(event.target.value);
  };

  const sendFilter = () => {
    createNumericalFilter(filterNumericValues);
  };

  const handleChange = ({ target }) => {
    setfilterByNumericValues((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        onChange={ onImputChange }
        name="filterByName"
        value={ filterName.name }
      />
      <br />
      <select
        value={ filterNumericValues.column }
        name="column"
        data-testid="column-filter"
        onChange={ handleChange }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        value={ filterNumericValues.comparison }
        name="comparison"
        data-testid="comparison-filter"
        onChange={ handleChange }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        data-testid="value-filter"
        type="number"
        onChange={ handleChange }
        name="value"
        value={ filterNumericValues.value }
      />
      <button
        data-testid="button-filter"
        type="submit"
        onClick={ sendFilter }
      >
        FILTRO

      </button>
    </div>

  );
}

export default Filter;
