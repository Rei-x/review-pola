import {atomWithStorage} from 'jotai/utils'

export const favouritesAtom = atomWithStorage<string[]>('favourites',[]);