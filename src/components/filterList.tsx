"use client"
import {currentFiltersAtom} from "@/lib/FiltersAtom";
import {useAtom} from "jotai";
import {MixerHorizontalIcon} from "@radix-ui/react-icons";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import React, {useEffect, useState} from "react";
import {FetchWithLocalStorage} from "@/lib/api";
import {Checkbox} from "@/components/ui/checkbox";
import {Skeleton} from "@/components/ui/skeleton";
import {Label} from "@/components/ui/label";
import {ScrollArea} from "@/components/ui/scroll-area";

const FilterList = () => {

    const [currentFilters, setCurrentFilters] = useAtom(currentFiltersAtom);
    const [categories, setCategories] = useState<string[]>([])
    const [glassesTypes, setGlassesTypes] = useState<string[]>([]);

    const {storedData: localCategories,
        data: fetchedCategories,
        isPending: isPendingCategories,
        error: errorCategories} = FetchWithLocalStorage('categories', 'categoriesKey', undefined, 'cocktails/categories')

    console.log(localCategories, fetchedCategories, isPendingCategories, errorCategories)

    const {storedData: localGlasses,
        data: fetchedGlasses,
        isPending: isPendingGlasses,
        error: errorGlasses} = FetchWithLocalStorage('glasses', 'glassesKey', undefined, 'cocktails/glasses')

    console.log(localGlasses, fetchedGlasses, isPendingGlasses, errorGlasses)

    useEffect(() => {
        if (fetchedCategories) setCategories(fetchedCategories.data);
        else if (localCategories) setCategories(localCategories);
    },[localCategories, fetchedCategories])

    useEffect(() => {
        if (fetchedGlasses) setGlassesTypes(fetchedGlasses.data);
        else if (localGlasses) setGlassesTypes(localGlasses);
    },[localGlasses, localGlasses])

    const handleCheckboxChange = (type: keyof typeof currentFilters, value: string | boolean) => {
        setCurrentFilters((prev) => ({
            ...prev,
            [type]: prev[type] === value ? null : value,
        }))
    }

    if (errorCategories || errorGlasses) {
        return (
        <div>Something went wrong</div>
    )}

    if (isPendingCategories || isPendingGlasses){
        return (
            <div>
                <DropdownMenuItem>
                    <Skeleton/>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Skeleton/>
                </DropdownMenuItem>
            </div>
        )
    }

    console.log('QQQQQQQQQ', categories)
    console.log('YYYYYYY', localCategories)

    const isChecked = () => {

    }


    return (
        <div className="flex-col flex">
            <DropdownMenuLabel>Categories</DropdownMenuLabel>
            <DropdownMenuSeparator/>
            <ScrollArea className={'h-16'}>
            {categories.map((category: string) =>
                <DropdownMenuItem>
                    <div className="flex space-x-2">
                        <Checkbox id="terms" key={category} checked={currentFilters.category === category}
                                  onCheckedChange={() => handleCheckboxChange('category', category)} />
                        <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            {category}
                        </label>
                    </div>
                </DropdownMenuItem>
            )}</ScrollArea>
            <DropdownMenuLabel>Glass types</DropdownMenuLabel>
            <DropdownMenuSeparator/>
            <ScrollArea className={'h-16'}>
                {glassesTypes.map((type: string) =>
                    <DropdownMenuItem>
                        <div className="flex space-x-2">
                            <Checkbox id="terms" key={type} checked={currentFilters.glass === type}
                                      onCheckedChange={() => handleCheckboxChange('glass', type)} />
                            <label
                                htmlFor="terms"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {type}
                            </label>
                        </div>
                    </DropdownMenuItem>
                )}</ScrollArea>

        </div>



)

}



export default FilterList;