import {atomWithStorage} from 'jotai/utils'

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

export const currentFiltersAtom = atomWithStorage<Filters>('filters',defaultFilters)

// export const resetFilters = atomWithStorage('filters', (get: any, set: any) => set(currentFiltersAtom, defaultFilters));

// export const currentPageAtom = atom<number>(1)