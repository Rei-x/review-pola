'use client'
import {searchAtom} from "@/atoms/searchAtom";
import {useAtom} from "jotai";
import {Input} from "@/components/ui/input";
import React from "react";
import {useSetSearchParams} from "@/lib/searchParamsManager";


const SearchInput = ({className}:{className : string}) => {
    const [search, setSearch] = useAtom(searchAtom);
    const setParams = useSetSearchParams();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setParams({page: '1'}, '/')
        setSearch(event.target.value);
    }

    return (
        <Input
            id={search}
            className={className}
            type={'text'}
            placeholder={'Search for a cocktail...'}
            value={search}
            onChange={handleChange} />
    )
}

export default SearchInput;
