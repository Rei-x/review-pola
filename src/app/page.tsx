"use client"
import FilterMenu from "@/components/FilterMenu";
import CocktailList from "@/components/CocktailList";
import SortMenu from "@/components/SortMenu";
import {Suspense} from "react";


export default function Home() {


  return (
    <div className="page">
        <Suspense fallback={<div>Loading...</div>}>
            <FilterMenu/>
            <SortMenu/>
            <CocktailList/>
        </Suspense>
    </div>
  );
}

