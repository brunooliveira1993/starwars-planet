import React, { useContext, useEffect } from 'react';
import FilterContext from '../context/FilterContext';

function Table() {
  const { fetchStarWarsApi, planets,
    isFetching, filterByName, filterByNumericValues,
    uploadFilter, newFilter, updateNumericalFilter,
    planetsDefaut, restoreFilter } = useContext(FilterContext);

  useEffect(() => {
    fetchStarWarsApi();
  }, []);

  function filterPlanets(planetsFilter) {
    const index = filterByNumericValues.length - 1;
    const { column, value, comparison } = filterByNumericValues[index];
    switch (comparison) {
    case 'maior que':
      uploadFilter(planetsFilter.filter((item) => item[column] > Number(value)));
      break;
    case 'menor que':
      uploadFilter(planetsFilter.filter((item) => item[column] < Number(value)));
      break;
    case 'igual a':
      uploadFilter(planetsFilter.filter((item) => item[column] === value));
      break;
    default:
      console.log('falhoooou');
    }
  }

  function removeFilter({ target }) {
    const index = target.name;
    const filterReturned = target.id;
    restoreFilter(filterReturned);
    filterByNumericValues.splice(index, 1);
    console.log(filterByNumericValues);
    updateNumericalFilter(filterByNumericValues);
    console.log(filterByNumericValues);
    if (filterByNumericValues.length !== 0) {
      filterPlanets(planetsDefaut.planetsDefaut);
    } if (filterByNumericValues.length === 0) {
      fetchStarWarsApi();
    }
  }

  useEffect(() => {
    if (filterByNumericValues.length !== 0) {
      filterPlanets(planets.planets);
    }
  }, [filterByNumericValues]);

  return (
    <div>
      {isFetching
        && (
          <table>
            {newFilter
              && (
                filterByNumericValues.map((filter, index) => (
                  <div key={ index } data-testid="filter">
                    <p name={ index }>
                      {`${filter.column}, ${filter.comparison}, ${filter.value}`}
                    </p>
                    <button
                      name={ index }
                      id={ filter.column }
                      type="button"
                      onClick={ removeFilter }
                    >
                      Excluir

                    </button>
                  </div>
                ))
              )}
            <tr>
              <th>Name</th>
              <th>Rotation Period</th>
              <th>Orbital Period</th>
              <th>Diameter</th>
              <th>Climate</th>
              <th>Gravity</th>
              <th>Terrain</th>
              <th>Surface Water</th>
              <th>Population</th>
              <th>Films</th>
              <th>Created</th>
              <th>Edited</th>
              <th>URL</th>
            </tr>
            {planets.planets.filter((planet) => planet.name.toLowerCase()
              .includes(filterByName.name.toLowerCase()))
              .map((item, index) => (
                <tbody key={ index }>
                  <tr>
                    <th>{item.name}</th>
                    <th>{item.rotation_period}</th>
                    <th>{item.orbital_period}</th>
                    <th>{item.diameter}</th>
                    <th>{item.climate}</th>
                    <th>{item.gravity}</th>
                    <th>{item.terrain}</th>
                    <th>{item.surface_water}</th>
                    <th>{item.population}</th>
                    <th>
                      {item.films.map((film, index2) => (
                        <p key={ index2 }>
                          {film}
                          {' '}
                        </p>
                      ))}

                    </th>
                    <th>{item.created}</th>
                    <th>{item.edited}</th>
                    <th>{item.url}</th>
                  </tr>
                </tbody>
              ))}
          </table>
        )}
    </div>
  );
}

export default Table;
