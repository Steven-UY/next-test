import { Card, CardHeader, CardTitle} from "@/components/ui/card"
import { useState, useEffect} from "react"

interface pokemon{
    name:string;
}


export default function CardList() {
    const [pokemon, setPokemon] = useState<pokemon | null>(null);


    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon/pikachu/")
          .then(res => {
            return res.json();
          })
          .then(data => {
            setPokemon(data);

          })
    }, []);

    return(
        pokemon &&(<div className ="grid grid-cols-3 gap-10">
                <Card>
                    <CardTitle>{pokemon.name}</CardTitle>
                </Card>
            </div>
    )
)}