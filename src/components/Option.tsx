import {Button} from "@/components/ui/button";
import React from "react";

interface IOption {
    isCurrent: (paramName: string, value: string) => boolean;
    onClick: (paramName?: string, value?: string) => void;
    children: string;
    paramName: string;
    value: string;
    style: string;
}


const Option = ({isCurrent,  onClick, children, paramName, value, style}: IOption) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        onClick(paramName, value);
    }
    console.log(value,style)
    return (
            <Button
                variant={'ghost'}
                className={`text-smoky_black font-semibold lg:text-xl p-8 ${isCurrent(paramName, value) ? style : ''}`}
                onClick={handleClick}>
                {children}
            </Button>
    )
}

export default Option;