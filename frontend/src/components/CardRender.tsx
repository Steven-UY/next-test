import { Card, CardTitle} from "@/components/ui/card"

// what data does the card need?

interface CardProps{
    key: number;
    name: string;
    sprites: {
        front_default: string;
    }
}

export default function({ name, sprites, key }: CardProps) {
    return(
        <Card key={key} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-4 flex justify-center bg-gray-50">
                <img
                src={sprites.front_default}
                alt={name}
                className="h-40 object-contain"
                />
            </div>
            <CardTitle>{name}</CardTitle>
        </Card>
    );
}
