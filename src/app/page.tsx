"use client"
import FilterMenu from "@/components/FilterMenu";
import CocktailList from "@/components/CocktailList";




export default function Home() {


  return (
    <div className="page">
      <FilterMenu/>
        <CocktailList/>
    </div>
  );
}

