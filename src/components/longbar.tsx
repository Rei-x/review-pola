// import Link from "next/link";
import Option from "@/components/option";
import React from "react";


export interface IOption {
    category: string;
    label: string;
    pathname: string;
}

interface IlongBar {
    isCurrent: (category: string) => boolean;
    options: IOption[];
    onClick: (category: string) => void;
}


const Longbar = ({isCurrent, options, onClick}: IlongBar) => {
    return (
        <div className="hidden md:flex items-center">
            {options.map((option, index) => (
                <React.Fragment key={option.category}>
                    <Option isCurrent={isCurrent} onClick={onClick} pathname={option.pathname} category={option.category}>
                        {option.label}
                    </Option>
                    {index !== options.length - 1 && (
                        <span className={'h-6 w-[1px] bg-gray-800 inline-block'}/>
                    )}
                </React.Fragment>
            ))}
        </div>
            )
}

export default Longbar;