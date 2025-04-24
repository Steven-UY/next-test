import { Card, CardTitle} from "@/components/ui/card"
import { useState, useEffect} from "react"
import CardRender from "./CardRender";
import SearchBar from "@/components/SearchBar"

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
  id: number;
}

export default function CardList() {
    const [pokemons, setPokemons] = useState<pokemon[]>([]);
    const [details, setDetails] = useState<details[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");

    //Need a function that whenever we type in the search bar 
    //it will filter the contents of the pokemon list based on the search term
    function updateSearchTerm(event: React.ChangeEvent<HTMLInputElement>){
        const value = event.target.value;
        setSearchTerm(value);
    }

    //Define a function that will filter the pokemon list based on the search term
    function filterPokemons(){
      if (searchTerm.length > 0){
        const filteredPokemons = details.filter((pokemon) => {
          return pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
        })
        return filteredPokemons;
      } else {
        return details;
      }
    }

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
      // Fetch the details of each pokemon
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

    
    const pokemonList = filterPokemons().map(pokemonDetails => (
      <CardRender 
        name = {pokemonDetails.name}
        sprites = {pokemonDetails.sprites}
        id = {pokemonDetails.id}
      />
    ))
    
    return(
      <div>
        <SearchBar onChange={updateSearchTerm} />
        <div className="grid grid-cols-3 gap-4">
          {pokemonList}
        </div>
      </div>
    )}

