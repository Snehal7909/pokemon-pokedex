import { useState } from "react";
import axios from "axios";

function App() {

  const [search, setSearch] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);

  const getPokemon = async () => {

    if (!search) return;

    try {

      setLoading(true);

      const response = await axios.get(
        `http://localhost:5000/api/pokemon/${search.toLowerCase()}`
      );

      setPokemon(response.data.data);

    } catch (error) {

      alert("Pokemon not found");

    } finally {

      setLoading(false);

    }
  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#f2f2f2",
        padding: "40px",
        fontFamily: "Arial"
      }}
    >

      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
          color: "#222"
        }}
      >
        Pokemon Search Engine
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px"
        }}
      >

        <input
          type="text"
          placeholder="Enter pokemon name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "12px",
            width: "300px",
            borderRadius: "8px",
            border: "1px solid gray",
            fontSize: "16px"
          }}
        />

        <button
          onClick={getPokemon}
          style={{
            padding: "12px 20px",
            border: "none",
            background: "#ff3d3d",
            color: "white",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          Search
        </button>

      </div>

      {loading && (

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            color: "#333"
          }}
        >
          Loading...
        </p>

      )}

      {pokemon && (

        <div
          style={{
            background: "white",
            maxWidth: "500px",
            margin: "40px auto",
            padding: "30px",
            borderRadius: "15px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)"
          }}
        >

          <img
            src={pokemon.image}
            alt={pokemon.name}
            style={{
              width: "250px",
              display: "block",
              margin: "0 auto"
            }}
          />

          <h2
            style={{
              textAlign: "center",
              textTransform: "capitalize",
              color: "#222",
              fontSize: "32px",
              marginTop: "10px"
            }}
          >
            {pokemon.name}
          </h2>

          <div
            style={{
              marginTop: "20px",
              color: "#333",
              fontSize: "18px",
              lineHeight: "1.8"
            }}
          >

            <p>
              <strong>Height:</strong> {pokemon.height}
            </p>

            <p>
              <strong>Weight:</strong> {pokemon.weight}
            </p>

            <p>
              <strong>Types:</strong>
              {" "}
              {pokemon.types.join(", ")}
            </p>

          </div>

          <h3
            style={{
              marginTop: "20px",
              color: "#222"
            }}
          >
            Abilities
          </h3>

          <ul
            style={{
              color: "#444",
              fontSize: "18px"
            }}
          >

            {pokemon.abilities.map((ability) => (

              <li key={ability}>
                {ability}
              </li>

            ))}

          </ul>

        </div>

      )}

    </div>

  );
}

export default App;