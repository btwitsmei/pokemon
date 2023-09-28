import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./listStyle.css"


function List() {
  const [pokeList, setPokeList] = useState([]);
  const [nextUrl, setNextUrl] = useState('');

  const fetchPokeList = async () => {
    try {
      const response = await axios.get(nextUrl || 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
      setPokeList([...pokeList, ...response.data.results]);
      setNextUrl(response.data.next);
    } catch (error) {
      console.error(error);
    }
  };

  const loadMore = () => {
    fetchPokeList();
  };

  useEffect(() => {
    fetchPokeList();
  }, []); 

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
