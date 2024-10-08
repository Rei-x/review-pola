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
import {Ingredient} from "@/lib/types";

const FilterList = () => {

    const [currentFilters, setCurrentFilters] = useAtom(currentFiltersAtom);
    const [selectedType, setSelectedType] = useState<string | null>(null);
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

    const {
        data: fetchedIngredients,
        isPending: isPendingIngredients,
        error: errorIngredients,
    } = useFetch('ingredients', undefined, 'ingredients/types')

    const queryParams = new URLSearchParams();
    if (currentFilters.ingredientsType) queryParams.append('type', currentFilters.ingredientsType);

    const {
        data: fetchedIds,
        isPending: isPendingIds,
        error: errorIds,
    } = useFetch('ingredientIds', undefined, 'ingredients', queryParams)

    const handleReset = () => {
        setParam({page: '1'}, '/')
        setCurrentFilters((RESET))
    }


    useEffect(() => {
        if (fetchedIds){
            if (fetchedIds.data && fetchedIds.data.length > 0){
                setParam({page: '1'}, '/')
                const ids = fetchedIds.data.map((obj: Ingredient) => obj.id)

                setCurrentFilters((prev) => ({
                    ...prev,
                    ['ingredients']: prev['ingredients'] === ids ? null : ids,
                }))
            }
    }}, [fetchedIds, selectedType, currentFilters.ingredientsType]);

    if (errorCategories || errorGlasses || errorIngredients || errorIds) {
        handleReset()
        return (
            <div>Something went wrong</div>
        )
    }


    const handleCheckboxChange = (type: keyof typeof currentFilters, value: string) => {
            setParam({page: '1'}, '/')
        setCurrentFilters((prev) => ({
            ...prev,
            [type]: prev[type] === value ? null : value,
        }))
    }

    const handleIngredientTypeChange = (type: keyof typeof currentFilters, value: string) => {
        setParam({page: '1'}, '/')
        setCurrentFilters((prev) => ({
            ...prev,
            [type]: prev[type] === value ? null : value,
        }))
        setSelectedType(value)
    }


    console.log(fetchedIds)


    if (isPendingIds || isPendingCategories || isPendingGlasses || isPendingIngredients){
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
        handleCheckboxChange: (ItemKey: keyof typeof currentFilters, value: string) => void;
    }


    const FilterItem: React.FC<FilterItemProps> = ({label,list,ItemKey, handleCheckboxChange}) => {
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
                                          onCheckedChange={() => handleCheckboxChange(ItemKey, value.toString())}/>
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
            <FilterItem label={"Categories"} list={fetchedCategories.data} ItemKey={'category'} handleCheckboxChange={handleCheckboxChange}/>
            <FilterItem label={"Glass types"} list={fetchedGlasses.data} ItemKey={'glass'} handleCheckboxChange={handleCheckboxChange}/>
            <FilterItem label={"Ingredients"} list={fetchedIngredients.data} ItemKey={'ingredientsType'} handleCheckboxChange={handleIngredientTypeChange}/>
            <DropdownMenuItem>
                <Button className={"bg-background pt-3 w-full"} onClick={() => handleReset()}>Reset</Button>
            </DropdownMenuItem>
        </div>
    )

}






export default FilterList;