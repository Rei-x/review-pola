'use client'
import {StarIcon, StarFilledIcon} from "@radix-ui/react-icons";
import {Cocktail} from "@/lib/types";
import Image from "next/image";
import {favouritesAtom} from "@/atoms/favouritesAtom";
import {useAtom} from "jotai";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const CocktailCard = (cocktail: Cocktail) => {
    const [favourites, setFavourites] = useAtom(favouritesAtom);
    const isFavourite = favourites?.includes(cocktail.id)
    const imageUrl = cocktail.imageUrl ? cocktail.imageUrl : 'https://placeholder.pics/svg/400';
    const toggle = () => {
        if (isFavourite) {
            setFavourites(favourites.filter((el) => el !== cocktail.id));
        }
        else setFavourites([...favourites, cocktail.id]);
    }
    return (
    <div key={cocktail.id} className={'hover:bg-dun-400 rounded-lg bg-dun-700 p-4 items-center text-center justify-center'}>
        <div className={'flex justify-end'}>
            {isFavourite ? (
                <StarFilledIcon
                    className={'h-6 w-6 text-pakistan_green cursor-pointer hover:accent-pakistan_green-600'}
                    onClick={toggle}/>
            ) : (
                <StarIcon className={'h-6 w-6 text-primary cursor-pointer'} onClick={toggle}/>
            )}
        </div>

        <h3 className={'sm:text-lg font-bold mb-2'}>{cocktail.name}</h3>
        <p className={'text-sm text-gray-800 mb-4'}>{cocktail.category}</p>
        <div className={'flex justify-center'}>
            <Image alt={'cocktailPhoto'} src={imageUrl} width={200} height={300} className={'flex rounded-3xl object-cover'}/>
        </div>
        <Link href={`/cocktail/${cocktail.id}`}>
            <Button className={"bg-pakistan_green-200 mt-3 w-2/3 font-semibold"}>Details</Button>
        </Link>
    </div>)
}


export default CocktailCard;