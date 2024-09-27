"use client"
import { usePathname } from 'next/navigation'
import Image from 'next/image'
// import {useState} from "react";
import Longbar from "@/components/longbar";

const NavBar = () => {

    const path= usePathname()
    // const [ isSidebarOpen, setSidebarOpen ] = useState<boolean>(true)

    const isCurrent = (pathname: string) => pathname === path

    return (
        <nav className="p-4">
            <div className="container mx-auto flex items-center justify-between">
                <Image src={'/img/coctail.jpg'} alt="Coctail" width={50} height={50} />
                <Longbar isCurrent={isCurrent}/>
            </div>
        </nav>
    )
}

export default NavBar;