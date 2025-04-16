import { Card, CardHeader, CardTitle} from "@/components/ui/card"
import { useState, useEffect} from "react"

interface pokemon{
    name:string;
    id:number;
    sprites:{
        front_default:string;
    }
}

export default function CardList() {
    const [pokemons, setPokemons] = useState<pokemon[]>([]);


    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon/")
          .then(res => {
            return res.json();
          })
          .then(data => {
            setPokemons(data.results);
            console.log('Pokemon data:', data);
          })
    }, []);

    const pokemonList = pokemons.map(pokemon => (
      <Card key={pokemon.id}>
        <CardHeader>
          <CardTitle>{pokemon.name}</CardTitle>
        </CardHeader>
      </Card>
    ))

    return(
      <div>
        <div className="grid grid-cols-3 gap-4">
          {pokemonList}
        </div>
      </div>
    )}