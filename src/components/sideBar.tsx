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
    options: IOption[];
}

const SideBar = ({options}: ISideBar) => {
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
                            <React.Fragment key={option.value}><DropdownMenuItem>
                                <Option isCurrent={option.isCurrent} onClick={option.onClick} paramName={option.paramName}
                                        value={option.value} style={option.customStyle}>
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