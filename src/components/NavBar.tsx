"use client"
import Image from 'next/image'
import LongBar from "@/components/LongBar";
import SideBar from "@/components/SideBar";
import {useSetSearchParams, useGetSearchParams, useIsSearchParams} from "@/lib/searchParamsManager";
import React from "react";
import SearchInput from "@/components/SearchInput";


const NavBar = () => {
    const setParams = useSetSearchParams();
    const isCurrentParam = useIsSearchParams();
    const getCurrentParam = useGetSearchParams()

    const isCurrent = (paramName: string, value: string) => isCurrentParam(paramName, value);

    const updateCategory = (paramName?: string, value?: string) => {
        if (!paramName || !value) return;
        setParams({page: '1',[paramName]: value}, '/');
    }
    const updateFavourites = () => {
        const curr = getCurrentParam('favourites');
        if (curr && curr === 'true') setParams({page: '1',favourites: 'false'}, '/')
        else setParams({page: '1',favourites: 'true'}, '/');
    }


    const options = [
        {paramName: 'category', label: 'Home', value: 'home', onClick: updateCategory, isCurrent: isCurrent, customStyle: 'underline'},
        {paramName: 'favourites', label: 'Favourites', value: 'true', onClick: updateFavourites, isCurrent: isCurrent, customStyle: 'text-ivory-100'},
        {paramName: 'category', label: 'Alcoholic', value: 'alcoholic', onClick: updateCategory, isCurrent: isCurrent, customStyle: 'underline'},
        {paramName: 'category', label: 'Non-Alcoholic', value: 'non-alcoholic', onClick: updateCategory, isCurrent: isCurrent, customStyle: 'underline'},
    ]



    return (
        <nav className="md:pe-8 md:pb-8 md:px-8 bg-background fixed-top sm:p-4 w-full sm:mr-4">
            <div className="p-4 flex w-full md:space-x-8 sm: space-x-3 items-center justify-between lg:px-16 lg:space-x-10">
                <Image src={'/img/cocktail.svg'} alt="Coctail" width={100} height={50} className={'lg:w-36'} />
                <LongBar options={options}/>
                <SearchInput className={'hidden sm:block w-full min-w-36'}/>
                <SideBar options={options}/>
            </div>
            <div className={'mx-4 mb-16 sm:hidden'}>
                <SearchInput className={'inline-block flex-grow'}/>
        </div>
        </nav>
    )
}

export default NavBar;