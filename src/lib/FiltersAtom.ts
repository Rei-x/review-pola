import {atom} from "jotai";

interface Filters {
    category: string | null;
    alcoholic: boolean | null;
    sort: string | null;
    glass: string | null;
    name: string | null;
    instructions: string | null;
}

const defaultFilters: Filters = {
    category: null,
    alcoholic: null,
    sort: null,
    glass: null,
    name: null,
    instructions: null,
}

export const currentFiltersAtom = atom<Filters>(defaultFilters)

export const resetFilters = atom(null, (get, set) => set(currentFiltersAtom, defaultFilters));

export const currentPageAtom = atom<number>(1)