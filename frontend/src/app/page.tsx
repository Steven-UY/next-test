"use client";

import CardList from "@/components/CardList";


export default function Page() {
  return(
    <div className="flex flex-col min-h-screen">
      <div className= "flex justify-center items-center">
        <h1 className="text-4xl font-bold mt-8 pt-4">Pokédex Remastered</h1>
      </div>
      <div className="flex-grow px-6 md:px-12">
        <CardList></CardList>
      </div>
    </div>
  ) 
}
