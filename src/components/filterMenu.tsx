import {currentFiltersAtom} from "@/lib/FiltersAtom";
import {useAtom} from "jotai";
import {MixerHorizontalIcon} from "@radix-ui/react-icons";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import React, {useState} from "react";
import {FetchWithLocalStorage} from "@/lib/api";
import FilterList from "@/components/filterList";

const FilterMenu = () => {
    return (
        <div className="fixed md: right-14 sm:right-10">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant={'ghost'}
                        aria-label={'Toggle menu'}
                    >
                        <div className={'flex items-center justify-center w-16 h-16 bg-foreground rounded-full'}>
                            <MixerHorizontalIcon className={'h-6 w-6 text-background'}/>
                        </div>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>
                        <FilterList />
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )

}

export default FilterMenu;