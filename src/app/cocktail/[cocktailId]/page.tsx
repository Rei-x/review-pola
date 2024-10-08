"use client"
import CocktailDetails from "@/components/CocktailDetails";
import {Suspense} from "react";

export default function Home() {


    return (
        <Suspense fallback={<div>Loading...</div>}>
        <div className="page">
            <CocktailDetails/>
        </div>
        </Suspense>
    );
}

