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
      // Fetch the Pokemon data from the API    
        fetch("https://pokeapi.co/api/v2/pokemon/")
          .then(res => {
            return res.json();
          })
          .then(data => {
            setPokemons(data.results);
            console.log('Pokemon data:', data);
          })
    }, []);

    useEffect(() => {
      const promises = pokemons.map(pokemon => {
        return fetch(pokemon.url)
         .then(res => res.json());
      });

      Promise.all(promises).then(allPokemonData => {
        setDetails(allPokemonData);
      })
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