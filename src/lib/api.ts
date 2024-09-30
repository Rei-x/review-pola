import {useQuery} from '@tanstack/react-query'


export const API_URL = 'https://cocktails.solvro.pl/api/v1'

export const fetchSomeData = async (endpoint: string) => {
    const response = await fetch(`${API_URL}/${endpoint}`)
    if (!response.ok) {
        throw new Error(`Cocktails fetch failed with status ${response.status}`)
    }
    return response.json()

}

export const FetchWithLocalStorage = <T>(
    queryKey: string,
    localStorageKey: string,
    fetchFunction?: () => Promise<T>,
    endpoint?: string,
) => {

    const fetch = fetchFunction || (endpoint ? () => fetchSomeData(endpoint) : undefined)

    if (fetch === undefined) {
        console.error('The fetch function was not defined')
        return {
            storedData: null,
            data: null,
            isPending: null,
            error: null
        }
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {isPending, error, data} = useQuery({
        queryKey: [queryKey],
        queryFn: fetch,
        staleTime: Infinity
    })

    if (data) {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem(localStorageKey, JSON.stringify(data))
        }
    }

    const storedData = () => typeof window !== 'undefined' ? JSON.parse(window.localStorage.getItem(localStorageKey) || 'null') : null
    if (error) console.error(error)

    return {
        storedData,
        data,
        isPending,
        error,
    }

}
