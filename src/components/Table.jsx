import React, { useContext, useEffect } from 'react';
import FilterContext from '../context/FilterContext';

function Table() {
  const { fetchStarWarsApi, planets,
    isFetching, filterByName, filterByNumericValues,
    uploadFilter } = useContext(FilterContext);

  useEffect(() => {
    fetchStarWarsApi();
    return () => {
      console.log(planets);
    };
  }, []);

  useEffect(() => {
    if (filterByNumericValues.length !== 0) {
      const { column, value, comparison } = filterByNumericValues[0];
      console.log(column);
      console.log(value);
      console.log(comparison);
      switch (comparison) {
      case 'maior que':
        uploadFilter(planets.planets.filter((item) => item[column] > Number(value)));
        break;
      case 'menor que':
        uploadFilter(planets.planets.filter((item) => item[column] < Number(value)));
        break;
      case 'igual a':
        uploadFilter(planets.planets.filter((item) => item[column] === value));
        break;
      default:
        console.log('falhoooou');
      }
    }
  }, [filterByNumericValues]);

  return (
    <div>
      {isFetching
        && (
          <table>
            {console.log(planets)}
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
