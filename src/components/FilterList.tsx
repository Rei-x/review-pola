"use client"
import {currentFiltersAtom} from "@/atoms/filtersAtom";
import {useAtom} from "jotai";
import {DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,} from "@/components/ui/dropdown-menu";
import React, {useEffect, useState} from "react";
import {useFetch} from "@/lib/useFetch";
import {Checkbox} from "@/components/ui/checkbox";
import {Skeleton} from "@/components/ui/skeleton";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Button} from "@/components/ui/button";
import {RESET} from 'jotai/utils'
import {useSetSearchParams} from "@/lib/searchParamsManager";

const FilterList = () => {

    const [currentFilters, setCurrentFilters] = useAtom(currentFiltersAtom);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const setParam = useSetSearchParams()

    const {
        data: fetchedCategories,
        isPending: isPendingCategories,
        error: errorCategories,
    } = useFetch('categories', undefined, 'cocktails/categories')


    const {
        data: fetchedGlasses,
        isPending: isPendingGlasses,
        error: errorGlasses
    } = useFetch('glasses', undefined, 'cocktails/glasses')

    useEffect(() => {
        if (!isPendingCategories && !isPendingGlasses) setIsLoading(false);
    }, [isPendingGlasses, isPendingCategories]);

    const handleCheckboxChange = (type: keyof typeof currentFilters, value: string | boolean) => {
            setParam({page: '1'}, '/')
        setCurrentFilters((prev) => ({
            ...prev,
            [type]: prev[type] === value ? null : value,
        }))
    }

    const handleReset = () => {
        setParam({page: '1'}, '/')
        setCurrentFilters((RESET))
    }

    if (errorCategories || errorGlasses) {
        return (
        <div>Something went wrong</div>
    )}

    if (isLoading){
        return (
            <div>
                <div className="flex flex-col space-y-3">
                    <Skeleton className="h-[125px] w-[250px] rounded-xl"/>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]"/>
                        <Skeleton className="h-4 w-[200px]"/>
                    </div>
                </div>
            </div>
        )

    }

    function isChecked<T>(key: keyof typeof currentFilters, value: T): boolean {
        return currentFilters[key] === value;
    }

    type FilterItemProps = {
        label: string;
        list: string[];
        ItemKey: keyof typeof currentFilters
    }


    const FilterItem: React.FC<FilterItemProps> = ({label,list,ItemKey}) => {
        return (
            <div>
                <DropdownMenuLabel>{label}</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <ScrollArea className={'h-16'}>
                    {list.map((value: string) => {
                        const uniqueId = `${ItemKey}-${value}`
                        return (
                        <DropdownMenuItem key={value}>
                            <div className="flex space-x-2">
                                <Checkbox id={uniqueId} checked={isChecked(ItemKey, value)}
                                          onCheckedChange={() => handleCheckboxChange(ItemKey, value)}/>
                                <label
                                    htmlFor={uniqueId}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    {value}
                                </label>
                            </div>
                        </DropdownMenuItem>
                        )})}</ScrollArea>
            </div>
        )
    }



    return (
        <div className="flex-col flex">
            <FilterItem label={"Categories"} list={fetchedCategories.data} ItemKey={'category'}/>
            <FilterItem label={"Glass types"} list={fetchedGlasses.data} ItemKey={'glass'}/>
            <DropdownMenuItem>
                <Button className={"bg-background pt-3 w-full"} onClick={() => handleReset()}>Reset</Button>
            </DropdownMenuItem>
        </div>
    )

}






export default FilterList;