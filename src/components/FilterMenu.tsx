import {MixerHorizontalIcon} from "@radix-ui/react-icons";
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import React from "react";
import FilterList from "@/components/FilterList";
import {Suspense} from "react";

const FilterMenu = () => {
    const handleClick = (event: React.MouseEvent) => {
        event.preventDefault();

    }
    return (
        <div className="fixed right-1 sm:right-10">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant={'ghost'}
                        aria-label={'Toggle menu'}
                        onClick={handleClick}
                    >
                        <div className={'flex items-center justify-center w-16 h-16 bg-foreground rounded-full'}>
                            <MixerHorizontalIcon className={'h-6 w-6 text-background'}/>
                        </div>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <Suspense fallback={<div>Loading...</div>}>
                        <FilterList />
                    </Suspense>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )

}

export default FilterMenu;