import PropTypes from 'prop-types';
import React, { useState } from 'react';
import FilterContext from './FilterContext';
import getStarWarsApi from '../services/getStarWarsApi';

function FilterProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [planetsDefaut, setPlanetsDefaut] = useState([]);
  const [newFilter, setnewFilter] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [filterByName, setFilterByName] = useState('');
  const [filterByNumericValues, setfilterByNumericValues] = useState([]);
  const [arr, setArr] = useState(['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water']);
  const [order, setOrder] = useState({
    column: 'population',
    sort: 'ASC',
  });

  const fetchStarWarsApi = async () => {
    try {
      const response = await getStarWarsApi();
      const SORT_NUMBER = -1;
      const planetsReturn = response.results.sort((a, b) => {
        if (Number(a.population) < Number(b.population)) {
          return SORT_NUMBER;
        }
        return true;
      });
      setFilterByName({ name: '' });
      setPlanetsDefaut({
        planetsDefaut: planetsReturn,
      });
      setPlanets({
        planets: planetsReturn,
      });
      setIsFetching(true);
    } catch (error) {
      setPlanets({
        error,
      });
      setIsFetching(true);
    }
  };

  const createFilter = (filterTask) => {
    setFilterByName({
      name: filterTask,
    });
  };

  const createNumericalFilter = (numericalFilter) => {
    setfilterByNumericValues((prevState) => ([
      ...prevState,
      numericalFilter,
    ]));
    setArr((prevState) => [...prevState.filter((i) => i !== numericalFilter.column)]);
  };

  const restoreFilter = (returnedFilter) => {
    setArr((prevState) => [returnedFilter, ...prevState]);
  };

  const updateNumericalFilter = (removeFilter) => {
    setfilterByNumericValues([...removeFilter]);
  };

  const uploadFilter = (uploadPlanets) => {
    setIsFetching(false);
    setPlanets({
      planets: uploadPlanets,
    });
    setIsFetching(true);
    setnewFilter(true);
  };

  const chageOrder = (newOrder) => {
    setOrder((prevState) => ({
      ...prevState,
      column: newOrder.column,
      sort: newOrder.sort,
    }));
  };

  const filterValue = {
    chageOrder,
    order,
    restoreFilter,
    arr,
    planetsDefaut,
    updateNumericalFilter,
    newFilter,
    uploadFilter,
    createNumericalFilter,
    filterByNumericValues,
    planets,
    isFetching,
    fetchStarWarsApi,
    filterByName,
    createFilter,
  };

  return (
    <FilterContext.Provider value={ filterValue }>
      {children}
    </FilterContext.Provider>
  );
}

FilterProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FilterProvider;
