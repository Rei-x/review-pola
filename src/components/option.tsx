import Link from "next/link";
import {Button} from "@/components/ui/button";
import React from "react";

interface IOption {
    isCurrent: (category: string) => boolean;
    onClick: (category: string) => void;
    children: string;
    pathname: string;
    category: string;
}


const Option = ({isCurrent,  onClick, children, pathname, category}: IOption) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        onClick(category);
    }
    //
    return (
        <Link href={pathname} passHref>
            <Button
                variant={'ghost'}
                className={`text-smoky_black font-semibold lg:text-xl p-8 ${isCurrent(category) ? 'underline' : ''}`}
                onClick={handleClick}>
                {children}
            </Button>
        </Link>

    )
}

export default Option;