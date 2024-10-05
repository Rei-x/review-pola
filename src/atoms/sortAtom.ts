import {atomWithStorage} from 'jotai/utils'

interface Sort {
    sort: string | null;
    order: string;
}

const defaultFilters: Sort = {
    sort: null,
    order: '+',
}

export const currentSortAtom = atomWithStorage<Sort>('sort',defaultFilters)

