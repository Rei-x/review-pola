"use client"
import {currentFiltersAtom} from "@/lib/FiltersAtom";
import {useAtom} from "jotai";
import {DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,} from "@/components/ui/dropdown-menu";
import React, {useEffect, useState} from "react";
import {FetchWithLocalStorage} from "@/lib/api";
import {Checkbox} from "@/components/ui/checkbox";
import {Skeleton} from "@/components/ui/skeleton";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Button} from "@/components/ui/button";
import {RESET} from 'jotai/utils'

const FilterList = () => {

    const [currentFilters, setCurrentFilters] = useAtom(currentFiltersAtom);
    const [categories, setCategories] = useState<string[]>([])
    const [glassesTypes, setGlassesTypes] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const {storedData: localCategories,
        data: fetchedCategories,
        isPending: isPendingCategories,
        error: errorCategories,
    } = FetchWithLocalStorage('categories', 'categoriesKey', undefined, 'cocktails/categories')

    // console.log('IIIIIII',isPendingCategories)

    const {storedData: localGlasses,
        data: fetchedGlasses,
        isPending: isPendingGlasses,
        error: errorGlasses} = FetchWithLocalStorage('glasses', 'glassesKey', undefined, 'cocktails/glasses')

    // console.log(localGlasses, fetchedGlasses, isPendingGlasses, errorGlasses)

    useEffect(() => {
        if (fetchedCategories) setCategories(fetchedCategories.data);
        else if (localCategories) setCategories(localCategories);
    },[fetchedCategories, localCategories])

    useEffect(() => {
        if (fetchedGlasses) setGlassesTypes(fetchedGlasses.data);
        else if (localGlasses) setGlassesTypes(localGlasses);
    },[fetchedGlasses, localGlasses])

    useEffect(() => {
        if (!isPendingCategories && !isPendingGlasses && categories && glassesTypes) setIsLoading(false);
    }, [isPendingGlasses, isPendingCategories, categories, glassesTypes]);

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

    if (isLoading){
        console.log("TRUE")
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
                    {list.map((value: string) =>
                        <DropdownMenuItem key={value}>
                            <div className="flex space-x-2">
                                <Checkbox id={label} checked={isChecked(ItemKey,value)}
                                          onCheckedChange={() => handleCheckboxChange(ItemKey, value)} />
                                <label
                                    htmlFor="terms"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    {value}
                                </label>
                            </div>
                        </DropdownMenuItem>
                    )}</ScrollArea>
            </div>
        )
    }



    return (
        <div className="flex-col flex">
            <FilterItem label={"Categories"} list={categories} ItemKey={'category'}/>
            <FilterItem label={"Glass types"} list={glassesTypes} ItemKey={'glass'}/>
            <DropdownMenuItem>
                <Button className={"bg-background pt-3 w-full"} onClick={() => setCurrentFilters((RESET))}>Reset</Button>
            </DropdownMenuItem>
        </div>
    )

}





export default FilterList;