import {IOption} from "@/components/longbar";
import {
    DropdownMenu, DropdownMenuContent,
    DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import React from "react";
import Option from "@/components/option";
import {Button} from "@/components/ui/button";
import {HamburgerMenuIcon} from "@radix-ui/react-icons";


interface ISideBar {
    isCurrent: (category: string) => boolean;
    options: IOption[];
    onClick: (category: string) => void;
}

const SideBar = ({isCurrent, options, onClick}: ISideBar) => {
    return (
        <div className={'md:hidden'}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant={'ghost'}
                        aria-label={'Toggle menu'}
                    >
                        <HamburgerMenuIcon className={'h-6 w-6'}/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <div className="flex-col">
                        {options.map((option) => (
                            <React.Fragment key={option.category}><DropdownMenuItem>
                                <Option isCurrent={isCurrent} onClick={onClick} pathname={option.pathname}
                                        category={option.category}>
                                    {option.label}
                                </Option></DropdownMenuItem>
                            </React.Fragment>
                        ))}
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
)

}

export default SideBar;