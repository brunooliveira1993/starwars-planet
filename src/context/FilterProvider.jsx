import PropTypes from 'prop-types';
import React, { useState } from 'react';
import FilterContext from './FilterContext';
import getStarWarsApi from '../services/getStarWarsApi';

function FilterProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [filterByName, setFilterByName] = useState('');
  const [filterByNumericValues, setfilterByNumericValues] = useState([]);

  const fetchStarWarsApi = async () => {
    try {
      const response = await getStarWarsApi();
      setFilterByName({ name: '' });
      setPlanets({
        planets: response.results,
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
  };

  const uploadFilter = (uploadPlanets) => {
    setIsFetching(false);
    setPlanets({
      planets: uploadPlanets,
    });
    setIsFetching(true);
  };

  const filterValue = {
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
