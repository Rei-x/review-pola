import {CaretSortIcon} from "@radix-ui/react-icons";
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import React from "react";
import SortList from "@/components/SortList";

const SortMenu = () => {
    const handleClick = (event: React.MouseEvent) => {
        event.preventDefault();

    }
    return (
        <div className="fixed right-20 sm:right-28">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant={'ghost'}
                        aria-label={'Toggle menu'}
                        onClick={handleClick}
                    >
                        <div className={'flex items-center justify-center w-16 h-16 bg-foreground rounded-full'}>
                            <CaretSortIcon className={'h-6 w-6 text-background'}/>
                        </div>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <SortList />
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )

}

export default SortMenu;