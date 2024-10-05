"use client"
import FilterMenu from "@/components/FilterMenu";
import CocktailList from "@/components/CocktailList";
import SortMenu from "@/components/SortMenu";




export default function Home() {


  return (
    <div className="page">
        <FilterMenu/>
        <SortMenu/>
        <CocktailList/>
    </div>
  );
}

