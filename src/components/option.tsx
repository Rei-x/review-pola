import Link from "next/link";
import {Button} from "@/components/ui/button";

interface IOption {
    isCurrent: (pathname: string) => boolean;
    children: string;
    pathname: string;
}


const Option = ({isCurrent,  children, pathname}: IOption) => {
    return (
        <Link href={pathname} passHref>
            <Button
                variant={'ghost'}
                className={`text-gray-800 text-lg font-semibold p-8 ${isCurrent(pathname) ? 'underline' : ''}`}>
                {children}
            </Button>
        </Link>

    )
}

export default Option;