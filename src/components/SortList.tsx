"use client"
import {currentSortAtom} from "@/atoms/sortAtom";
import {useAtom} from "jotai";
import {DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,} from "@/components/ui/dropdown-menu";
import React from "react";
import {Checkbox} from "@/components/ui/checkbox";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Button} from "@/components/ui/button";
import {RESET} from 'jotai/utils'
import {useSetSearchParams} from "@/lib/searchParamsManager";
import {Switch} from "@/components/ui/switch";

const SortList = () => {

    const [currentSort, setCurrentSort] = useAtom(currentSortAtom);
    const setParam = useSetSearchParams()



    const handleCheckboxChange = (type: keyof typeof currentSort, value: string) => {
        setParam({page: '1'}, '/')
        setCurrentSort((prev) => ({
            ...prev,
            [type]: prev[type] === value ? null : value,
        }))
    }

    function isChecked<T>(key: keyof typeof currentSort, value: T): boolean {
        return currentSort[key] === value;
    }

    type FilterItemProps = {
        label: string;
        list: string[];
        ItemKey: keyof typeof currentSort
        handleCheckboxChange: (ItemKey: keyof typeof currentSort, value: string) => void;
    }


    const handleReset = () => {
        setParam({page: '1'}, '/')
        setCurrentSort((RESET))
    }


    const SortItem: React.FC<FilterItemProps> = ({label,list,ItemKey, handleCheckboxChange}) => {
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
                        )
                    })}</ScrollArea>
            </div>
        )
    }
   const handleCheckChange = (isChecked : boolean) => {
       setParam({page: '1'}, '/')
       const value = isChecked ? '+' : '-'
       setCurrentSort((prev) => ({
           ...prev,
           ['order']: prev['order'] = value
       }))
   }



    return (
        <div className="flex-col flex">
            <SortItem label={"Sort by"} list={list} ItemKey={'sort'} handleCheckboxChange={handleCheckboxChange}/>
            <DropdownMenuItem className={'space-x-8'}>
                <label>Descending</label>
                <Switch checked={currentSort.order === '+'} onCheckedChange={handleCheckChange}/>
                <label>Ascending</label>
            </DropdownMenuItem>

            <DropdownMenuItem>
                <Button className={"bg-background pt-3 w-full"} onClick={() => handleReset()}>Reset</Button>
            </DropdownMenuItem>
        </div>
    )

}

const list: string[] = ['id', 'name', 'instructions', 'alcoholic', 'category', 'glass',  'createdAt', 'updatedAt']






export default SortList;