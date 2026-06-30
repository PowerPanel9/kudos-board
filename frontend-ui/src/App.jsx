import {BrowserRouter} from 'react-router-dom';
import { useState } from 'react';
import Header from '../Components/Header';
import Filter from '../Components/Filter';
import './App.css';



const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState('All');
  return (
    <BrowserRouter>
    <Header 
    setSearchTerm={setSearchTerm} 
    searchTerm={searchTerm}
    />
    <Filter
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
    </BrowserRouter>

  );
}


export default App;