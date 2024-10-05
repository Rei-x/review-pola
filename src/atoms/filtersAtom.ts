import {atomWithStorage} from 'jotai/utils'

interface Filters {
    category: string | null;
    sort: string | null;
    glass: string | null;
    ingredients: string | null;
}

const defaultFilters: Filters = {
    category: null,
    sort: null,
    glass: null,
    ingredients: null,
}

export const currentFiltersAtom = atomWithStorage<Filters>('filters',defaultFilters)

