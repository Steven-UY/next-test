import { Card, CardHeader, CardTitle} from "@/components/ui/card"
import { useState, useEffect} from "react"

interface pokemon{
    name:string;
    url:string;
}

interface details {
  name:string;
  sprites: {
    front_default:string;
    back_default:string;
  }
}

export default function CardList() {
    const [pokemons, setPokemons] = useState<pokemon[]>([]);
    const [details, setDetails] = useState<details[]>([]);


    useEffect(() => { 
      // Fetch the pokemon from the API
      async function fetchPokemons() {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
        const data = await response.json()
        setPokemons(data.results);
      }
      fetchPokemons();
    }, []);

    useEffect(() => {
      const fetchDetails = async () => {
        const pokemonDetailsPromises = pokemons.map(async (pokemon) => {
          const response = await fetch(pokemon.url);
          return await response.json();
        });

        const allPokemonData = await Promise.all(pokemonDetailsPromises);

        setDetails(allPokemonData);
      };
      if (pokemons.length > 0) {
        fetchDetails();
      }
    }, [pokemons]);
    
    const pokemonList = details.map(pokemonDetails => (
      <Card key={pokemonDetails.name} className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="p-4 flex justify-center bg-gray-50">
          <img
          src={pokemonDetails.sprites.front_default}
          alt={pokemonDetails.name}
          className="h-40 object-contain"
          />
        </div>
          <CardTitle>{pokemonDetails.name}</CardTitle>
      </Card>
    ))


    return(
      <div>
        <div className="grid grid-cols-3 gap-4">
          {pokemonList}
        </div>
      </div>
    )}
