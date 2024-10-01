"use client"
import { Button } from '@/components/ui/button'
import {currentFiltersAtom} from "@/lib/FiltersAtom";
import {useAtom} from "jotai";
import FilterMenu from "@/components/filterMenu";


export default function Home() {
  const [currentFilters, setCurrentFilters] = useAtom(currentFiltersAtom);

  return (
    <div className="page">
      <FilterMenu/>
    </div>
  );
}

