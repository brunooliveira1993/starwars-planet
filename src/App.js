import React from 'react';
import './App.css';
import FilterProvider from './context/FilterProvider';
import Table from './components/Table';
import Filter from './components/Filter';

function App() {
  return (
    <FilterProvider>
      <Filter />
      <Table />
    </FilterProvider>
  );
}

export default App;
