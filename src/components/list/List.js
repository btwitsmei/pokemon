import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./listStyle.css";

function List() {
  const [pokeList, setPokeList] = useState([]); 
  const [offset, setOffset] = useState(0); 

  const fetchPokeList = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/bff/pokemon?limit=20&offset=${offset}`);
      const pokemons = response.data.pokemons;

      if (Array.isArray(pokemons)) {
        setPokeList(prevPokeList => [...prevPokeList, ...pokemons]);
      } else {
        console.error('La respuesta no contiene un arreglo de pokemons');
      }
    } catch (error) {
      console.error("Error al cargar la lista:", error);
    }
  };


  useEffect(() => {
    fetchPokeList(); 
  }, []); 


  const loadMore = () => {
    setOffset(prevOffset => prevOffset + 20); 
    fetchPokeList(); 
  };

  return (
    <div className="list">
      <h1 className="listTitle">Pokémon List</h1>
      <ul>
        {pokeList.map((pokemon, index) => (
          <li key={index} className="listItem">
            <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
          </li>
        ))}
      </ul>
      <button className="buttonMore" onClick={loadMore}>More Pokémons...</button>
    </div>
  );
}

export default List;
