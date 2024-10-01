"use client"
import Image from 'next/image'
import Longbar from "@/components/longbar";
import {FetchWithLocalStorage} from "@/lib/api";
import {currentTagAtom} from "@/lib/currentTagAtom";
import {useAtom} from "jotai";
import {Input} from "@/components/ui/input";
import {HamburgerMenuIcon, Cross2Icon} from "@radix-ui/react-icons";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import sideBar from "@/components/sideBar";
import SideBar from "@/components/sideBar";

// interface NavBarProps {
//     onSearch: (query: string) => void
//     onFilter: (query: string) => void
// }

const options = [
    {category: 'home', label: 'Home', pathname: '/'},
    {category: 'favourites', label: 'Favourites', pathname: '/'},
    {category: 'alcoholic', label: 'Alcoholic', pathname: '/'},
    {category: 'non-alcoholic', label: 'Non-Alcoholic', pathname: '/'},
]


const NavBar = () => {
    const [currentCategory, setCurrentCategory] = useAtom(currentTagAtom);

    // const path= usePathname()
    const [ isSidebarOpen, setSidebarOpen ] = useState<boolean>(false)
    //

    const isCurrent = (category: string) => category === currentCategory
    const {storedData, data, isPending, error} = FetchWithLocalStorage('categories', 'categoriesKey', undefined, 'cocktails/categories')
    console.log(storedData, data, isPending, error)

    const updateCategory = (category: string) => {
        console.log("QQQQQQQQ",currentCategory)
        setCurrentCategory(category)
    }

    return (
        <nav className="md:pe-8 md:pb-8 md:px-8 bg-background fixed-top sm:p-4 w-full sm:mr-4">
            <div className="p-4 flex w-full md:space-x-8 sm: space-x-3 items-center justify-between ">
                <Image src={'/img/cocktail.svg'} alt="Coctail" width={100} height={50} />
                <Longbar isCurrent={isCurrent} options={options} onClick={updateCategory} />
                <Input className={'hidden sm:block'} placeholder={'Search for a cocktail...'} />
                <div className={'md:hidden'}>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant={'ghost'}
                                onClick={() => setSidebarOpen(!isSidebarOpen)}
                                aria-label={'Toggle menu'}
                                >
                                {isSidebarOpen ? (
                                    <Cross2Icon className={'h-6 w-6'} />
                                ) : (
                                    <HamburgerMenuIcon className={'h-6 w-6'}/>
                                )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <SideBar isCurrent={isCurrent} options={options} onClick={updateCategory}/>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className={'mx-4 mb-4'}>
            <Input className={'sm:hidden inline-block flex-grow'} placeholder={'Search for a cocktail...'} />
        </div>
        </nav>
    )
}

export default NavBar;