"use client";

import { Card, CardTitle} from "@/components/ui/card"
import { useState, useEffect} from "react"
import CardRender from "./CardRender";
import SearchBar from "@/components/SearchBar"
import { useSearchParams, usePathname, useRouter } from "next/navigation";

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
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();


    function updateSearchTerm(event: React.ChangeEvent<HTMLInputElement>){
        const params = new URLSearchParams(searchParams);
        const value = event.target.value;

        if (value) {
          params.set('query', value);
        } else {
          params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);

    }

    //Define a function that will filter the pokemon list based on the search term
    function filterPokemons(){
      const query = searchParams.get('query') || '';

      if (query.length > 0){
        const filteredPokemons = details.filter((pokemon) => {
          return pokemon.name.toLowerCase().includes(query.toLowerCase());
        })
        return filteredPokemons;
      } else {
        return details;
      }
    }

    useEffect(() => { 
      // Fetch the pokemon from the API
      async function fetchPokemons() {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=90");
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
        key = {pokemonDetails.id}
      />
    ))

    return(
      <div>
        <SearchBar 
        onChange={updateSearchTerm} 
        value ={searchParams.get('query') || ''}
        />
        <div className="grid grid-cols-3 gap-4">
          {pokemonList}
        </div>
      </div>
    )}

