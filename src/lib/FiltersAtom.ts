import {atomWithStorage} from 'jotai/utils'

interface Filters {
    category: string | null;
    sort: string | null;
    glass: string | null;
    instructions: string | null;
}

const defaultFilters: Filters = {
    category: null,
    sort: null,
    glass: null,
    instructions: null,
}

export const currentFiltersAtom = atomWithStorage<Filters>('filters',defaultFilters)

// export const resetFilters = atomWithStorage('filters', (get: any, set: any) => set(currentFiltersAtom, defaultFilters));

// export const currentPageAtom = atom<number>(1)