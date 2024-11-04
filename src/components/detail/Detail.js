import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./detailStyle.css"

const Detail = () => {
  const { name } = useParams();
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/bff/pokemon/${name}`);
        setPokemonDetails(response.data);
      } catch (error) {
        console.error('Error fetching Pokémon details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [name]);

  if (loading) {
    return <div className='loading'>Loading...</div>;
  }

  if (!pokemonDetails) {
    return <div className='loading'>No details available.</div>;
  }

  return (
    <div className='detail'>
      <h1 className='pokeTitle'>{pokemonDetails.name}</h1>
      <p className='pokeData'>Order: {pokemonDetails.order}</p>
      <p className='pokeData'>Base Experience: {pokemonDetails.base_experience}</p>
      <p className='pokeData'>Height: {pokemonDetails.height}</p>
      <h2 className='pokeAbilities'>Abilities:</h2>
      <ul>
        {pokemonDetails.abilities && pokemonDetails.abilities.map((ability, index) => (
          <li className='pokeData' key={index}>{ability}</li>
        ))}
      </ul>
    </div>
  );
};

export default Detail;
