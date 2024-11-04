const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3001;
const cors = require('cors');

app.use(cors());

app.get('/bff/pokemon', async (req, res) => {

  const limit = parseInt(req.query.limit) || 20; 
  const offset = parseInt(req.query.offset) || 0; 

  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);

  
    const pokemons = response.data.results.map(pokemon => ({
      name: pokemon.name,
    }));

    res.json({
      pokemons,
      next: response.data.next, 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/bff/pokemon/:name', async (req, res) => {
  const { name } = req.params;
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const { order, base_experience, height, abilities } = response.data;
    res.json({
      name,
      order,
      base_experience,
      height,
      abilities: abilities.map(ability => ability.ability.name),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`BFF running on http://localhost:${PORT}`);
});
