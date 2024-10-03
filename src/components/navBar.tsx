"use client"
import Image from 'next/image'
import Longbar from "@/components/longbar";
import {currentTagAtom} from "@/lib/currentTagAtom";
import {useAtom} from "jotai";
import {Input} from "@/components/ui/input";
import SideBar from "@/components/sideBar";


const options = [
    {category: 'home', label: 'Home', pathname: '/'},
    {category: 'favourites', label: 'Favourites', pathname: '/'},
    {category: 'alcoholic', label: 'Alcoholic', pathname: '/'},
    {category: 'non-alcoholic', label: 'Non-Alcoholic', pathname: '/'},
]


const NavBar = () => {
    const [currentCategory, setCurrentCategory] = useAtom(currentTagAtom);

    // const path= usePathname()
    // const [ isSidebarOpen, setSidebarOpen ] = useState<boolean>(false)
    //

    const isCurrent = (category: string) => category === currentCategory
    // const {storedData, data, isPending, error} = FetchWithLocalStorage('categories', 'categoriesKey', undefined, 'cocktails/categories')
    // console.log(storedData, data, isPending, error)

    const updateCategory = (category: string) => {
        setCurrentCategory(category)
    }

    return (
        <nav className="md:pe-8 md:pb-8 md:px-8 bg-background fixed-top sm:p-4 w-full sm:mr-4">
            <div className="p-4 flex w-full md:space-x-8 sm: space-x-3 items-center justify-between lg:px-16 lg:space-x-10">
                <Image src={'/img/cocktail.svg'} alt="Coctail" width={100} height={50} className={'lg:w-36'} />
                <Longbar isCurrent={isCurrent} options={options} onClick={updateCategory} />
                <Input className={'hidden sm:block w-full'} placeholder={'Search for a cocktail...'} />
                <SideBar isCurrent={isCurrent} options={options} onClick={updateCategory}/>
            </div>
            <div className={'mx-4 mb-16 sm:hidden'}>
            <Input className={'inline-block flex-grow'} placeholder={'Search for a cocktail...'} />
        </div>
        </nav>
    )
}

export default NavBar;