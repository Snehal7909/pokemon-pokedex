const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { LRUCache } = require("lru-cache");

const app = express();

app.use(cors());

const cache = new LRUCache({
  max: 50,
  ttl: 1000 * 60 * 10
});

app.get("/api/pokemon/:name", async (req, res) => {

  const name = req.params.name.toLowerCase();

  try {

    if (cache.has(name)) {

      return res.json({
        source: "cache",
        data: cache.get(name)
      });

    }

    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );

    const pokemon = {
      name: response.data.name,

      image:
        response.data.sprites.other[
          "official-artwork"
        ].front_default,

      height: response.data.height,

      weight: response.data.weight,

      types: response.data.types.map(
        (type) => type.type.name
      ),

      abilities: response.data.abilities.map(
        (ability) => ability.ability.name
      )
    };

    cache.set(name, pokemon);

    res.json({
      source: "api",
      data: pokemon
    });

  } catch {

    res.status(404).json({
      message: "Pokemon not found"
    });

  }

});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});