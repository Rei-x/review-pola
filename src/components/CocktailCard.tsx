'use client'
import {StarIcon, StarFilledIcon} from "@radix-ui/react-icons";
import {Cocktail} from "@/lib/types";
import Image from "next/image";
import {favouritesAtom} from "@/atoms/favouritesAtom";
import {useAtom} from "jotai";
import {Button} from "@/components/ui/button";
import Link from "next/link";

const CocktailCard = (cocktail: Cocktail, children: string) => {
    const [favourites, setFavourites] = useAtom(favouritesAtom);
    const isFavourite = favourites?.includes(cocktail.id)
    const toggle = () => {
        if (isFavourite) {
            setFavourites(favourites.filter((el) => el !== cocktail.id));
        }
        else setFavourites([...favourites, cocktail.id]);
    }
    return (
    <div key={cocktail.id} className={'bg-white rounded-lg shadow-lg p-4 text-center items-center justify-center'}>
        <div className={'flex justify-end'}>
            {isFavourite ? (
                <StarFilledIcon
                    className={'h-6 w-6 text-pakistan_green cursor-pointer hover:accent-pakistan_green-600'}
                    onClick={toggle}/>
            ) : (
                <StarIcon className={'h-6 w-6 text-primary cursor-pointer'} onClick={toggle}/>
            )}
        </div>

        <h3 className={'text-lg font-bold mb-2'}>{cocktail.name}</h3>
        <p className={'text-sm text-gray-800 mb-4'}>{cocktail.category}</p>
        <Image alt={'cocktailPhoto'} src={cocktail.imageUrl} width={200} height={300} className={'rounded:mb object-cover'}/>
        <Link href={`/cocktail/${cocktail.id}`}>details</Link>
    </div>)
}


export default CocktailCard;