"use client"
import FilterMenu from "@/components/filterMenu";
import CocktailList from "@/components/cocktailList";




export default function Home() {


  return (
    <div className="page">
      <FilterMenu/>
        <CocktailList/>
    </div>
  );
}

