"use client";

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface SearchBarProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
}

//we are passing the onChange function as a prop to the search bar component here
export default function SearchBar({ onChange, value}: SearchBarProps) {

    return(
    <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <Search className="h-4 w-4" />
        </div>

        <Input
        type="text"
        onChange = {onChange} 
        placeholder="Search for a Pokemon..."
        className = "pl-10"
        value={value}
        />
    </div>
    )
}
