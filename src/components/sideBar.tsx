import {IOption} from "@/components/longbar";
import {
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import React from "react";
import Option from "@/components/option";


interface ISideBar {
    isCurrent: (category: string) => boolean;
    options: IOption[];
    onClick: (category: string) => void;
}

const SideBar = ({isCurrent, options, onClick}: ISideBar) => {
    return (
        <div className="flex-col" >
                {options.map((option) => (
                    <React.Fragment key={option.category}><DropdownMenuItem>
                        <Option isCurrent={isCurrent} onClick={onClick} pathname={option.pathname} category={option.category}>
                            {option.label}
                        </Option></DropdownMenuItem>
                    </React.Fragment>
                ))}
        </div>
    )

}

export default SideBar;