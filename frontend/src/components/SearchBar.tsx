import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface SearchBarProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    searchTerm: string;
}

//we are passing the onChange function as a prop to the search bar component here
export default function SearchBar({ onChange, searchTerm}: SearchBarProps) {

    return(
    <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-event-none">
            <Search className="h-4 w" />
        </div>

        <Input
        type="text"
        value = {searchTerm}
        onChange = {onChange} 
        placeholder="Search for a Pokemon..."
        className = "pl-10"
        />
    </div>
    )
}
