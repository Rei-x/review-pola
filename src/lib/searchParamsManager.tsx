'use client'
import {useRouter, useSearchParams} from "next/navigation";

export const useSetSearchParams = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const updateCurrentParams = (paramName: string, value: string) => {
        const currentQueryParams = new URLSearchParams(searchParams.toString());
        if (value === '') currentQueryParams.delete(paramName, value);
        else currentQueryParams.set(paramName,value);
        const newURL = `${window.location.pathname}?${currentQueryParams.toString()}`;
        router.push(newURL);
    }

    return updateCurrentParams;
}