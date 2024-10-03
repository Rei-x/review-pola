'use client'
import {StarIcon, StarFilledIcon} from "@radix-ui/react-icons";
import {favouritesAtom} from "@/lib/favouritesAtom";
import {Cocktail} from "@/lib/ProductListTypes";
import Image from "next/image";

const CocktailCard = (cocktail: Cocktail, children: string) => {
    return (
    <div key={cocktail.id} className={'bg-white rounded-lg shadow-lg p-4 text-center items-center justify-center'}>
        <h3 className={'text-lg font-bold mb-2'}>{cocktail.name}</h3>
        <p className={'text-sm text-gray-800 mb-4'}>{cocktail.category}</p>
        <Image alt={'cocktailPhoto'} src={cocktail.imageUrl} width={200} height={300} className={'rounded:mb object-cover'}/>
    </div>)
}


export default CocktailCard;