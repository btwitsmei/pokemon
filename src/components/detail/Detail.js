import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./detailStyle.css"

function Detail() {
  const { name } = useParams();
  const [pokeData, setPokeData] = useState(null);
  const history = useNavigate();

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((response) => {
        setPokeData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [name]);

  if (!pokeData) {
    return <div className='loading'>Loading...</div>;
  }

  const goBackToList = () => {
    history('/');
  };

  return (
    <div className="detail">
      <h1 className="pokeTitle">{pokeData.name}</h1>
      <p className="pokeData">Order: {pokeData.order}</p>
      <p className="pokeData">Base Experience: {pokeData.base_experience}</p>
      <p className="pokeData">Height: {pokeData.height}</p>
      <h2 className="pokeAbilities">Abilities:</h2>
      <ul>
        {pokeData.abilities.map((ability, index) => (
          <li key={index} className="pokeData">
            <span className="pokeData">{ability.ability.name}</span>
          </li>
      ))}
      </ul>
      <button className="buttonBack" onClick={goBackToList}>Back to List</button>
    </div>

  );
}

export default Detail;
