import {atomWithStorage} from 'jotai/utils'

export const searchAtom = atomWithStorage<string>('search','');