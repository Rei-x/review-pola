// import Link from "next/link";
import Option from "@/components/option";


interface IlongBar {
    isCurrent: (pathname: string) => boolean;
}


const Longbar = ({isCurrent}: IlongBar) => {
    return (
        <div className="hidden md:flex space-x-4 absolute left-1/2 transform -translate-x-1/2 items-center">
            <Option isCurrent={isCurrent} pathname={'/'}>Home</Option>
            <span className={'h-6 w-[1px] bg-gray-800 inline-block'}/>
            <Option isCurrent={isCurrent} pathname={'/favourites'}>Favourites</Option>

        </div>
    )
}

export default Longbar;