'use client'
import {useRouter, useSearchParams} from "next/navigation";

export const useSetSearchParams = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    return (params: Record<string, string>) => {
        const currentQueryParams = new URLSearchParams(searchParams.toString());

        Object.entries(params).forEach(([paramName, value]) => {
            if (value === '') currentQueryParams.delete(paramName, value);
            else currentQueryParams.set(paramName, value);


        })
        const newURL = `/?${currentQueryParams.toString()}`;
        router.push(newURL);
    };
}

export const useGetSearchParams = () => {
    const searchParams = useSearchParams();

    return (paramName: string) => {
        return searchParams.get(paramName)?.toString() || null
    }
}

export const useIsSearchParams = () => {
    const searchParams = useSearchParams();
    return (paramName: string, value: string) => {
        const currentValue = searchParams.get(paramName)?.toString() || 'home'
        return currentValue === value;
    };
}