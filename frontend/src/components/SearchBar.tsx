import { Input } from "@/components/ui/input"

interface SearchBarProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({ onChange }: SearchBarProps) {
    
    return(
        <Input
        type="text" 
        onChange = {onChange} 
        placeholder="Search for a Pokemon..." 
        />
    )
}
