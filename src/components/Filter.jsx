import React, { useState, useContext, useEffect } from 'react';
import FilterContext from '../context/FilterContext';

function Filter() {
  const [filterName, setFilterName] = useState({
    name: '',
  });
  const [refreshFilter, setRefreshFilter] = useState(true);
  const [filterNumericValues, setfilterNumericValues] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });
  const { createFilter, createNumericalFilter, arr,
    chageOrder, order } = useContext(FilterContext);
  const [createOrder, setCreateOrder] = useState({
    column: 'population',
    sort: 'ASC',
  });

  const onImputChange = (event) => {
    setFilterName({
      name: event.target.value,
    });
    createFilter(event.target.value);
  };

  useEffect(() => {
    setfilterNumericValues({
      column: arr[0],
      comparison: 'maior que',
      value: '0',
    });
  }, [arr]);

  useEffect(() => {
    chageOrder(createOrder);
  }, [createOrder]);

  const sendFilter = () => {
    setRefreshFilter(false);
    createNumericalFilter(filterNumericValues);
    setRefreshFilter(true);
  };

  const handleChange = ({ target }) => {
    setfilterNumericValues((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const changeSort = ({ target }) => {
    setCreateOrder((prevState) => ({
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
      {refreshFilter
        && (
          <select
            value={ filterNumericValues.column }
            name="column"
            data-testid="column-filter"
            onChange={ handleChange }
          >
            {arr.map((option, i) => <option key={ i } value={ option }>{option}</option>)}
          </select>
        )}
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
      <button
        data-testid="button-remove-filters"
        type="button"
        onClick={ () => window.location.reload(false) }
      >
        REMOVER FILTROS

      </button>
      <select
        value={ order.column }
        name="column"
        data-testid="column-sort"
        onChange={ changeSort }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <span>
        <input
          type="radio"
          data-testid="column-sort-input-asc"
          value="ASC"
          name="sort"
          onClick={ changeSort }
        />
        Ascendente
      </span>
      <span>
        <input
          type="radio"
          data-testid="column-sort-input-desc"
          value="DESC"
          name="sort"
          onClick={ changeSort }
        />
        Descendente
      </span>
    </div>

  );
}

export default Filter;
