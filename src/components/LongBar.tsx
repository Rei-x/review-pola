
import Option from "@/components/Option";
import React from "react";


export interface IOption {
    paramName: string;
    label: string;
    value: string;
    onClick: (paramName?: string, value?: string) => void;
    isCurrent: (paramName: string, value: string) => boolean;
    customStyle: string;
}

interface IlongBar {
    options: IOption[];
}


const LongBar = ({options}: IlongBar) => {
    return (
        <div className="hidden md:flex items-center">
            {options.map((option, index) => (
                <React.Fragment key={option.value}>
                    <Option isCurrent={option.isCurrent} onClick={option.onClick} paramName={option.paramName} value={option.value} style={option.customStyle}>
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

export default LongBar;