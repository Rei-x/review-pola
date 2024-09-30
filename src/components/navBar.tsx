"use client"
import { usePathname } from 'next/navigation'
import Image from 'next/image'
// import {useState} from "react";
import Longbar from "@/components/longbar";
// import {useState} from "react";
import {FetchWithLocalStorage} from "@/lib/api";

// interface NavBarProps {
//     onSearch: (query: string) => void
//     onFilter: (query: string) => void
// }

const NavBar = () => {

    const path= usePathname()
    // const [ isSidebarOpen, setSidebarOpen ] = useState<boolean>(true)

    const isCurrent = (pathname: string) => pathname === path
    const {storedData, data, isPending, error} = FetchWithLocalStorage('categories', 'categoriesKey', undefined, 'cocktails/categories')
    console.log(storedData, data, isPending, error)

    return (
        <nav className="p-4 flex flex-col">
            <div className="p-4">
                <Image src={'/img/coctail.jpg'} alt="Coctail" width={50} height={50} />

            </div>
            <div className="container mx-auto flex items-center justify-between">
                <Longbar isCurrent={isCurrent}/>
            </div>
        </nav>
    )
}

export default NavBar;