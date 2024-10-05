import {useGetSearchParams} from "@/lib/searchParamsManager";
import {useParams, useRouter} from "next/navigation";
import {useFetch} from "@/lib/useFetch";
import Image from "next/image";
import IngredientsList from "./IngredientsList";
import {Separator} from "@/components/ui/separator";
import * as React from "react";
import {Badge} from "@/components/ui/badge";

const CocktailDetails = () => {
    const {cocktailId} = useParams()
    const {data, isPending, error} = useFetch(`${cocktailId}`, undefined, `cocktails/${cocktailId}`);

    if (isPending) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Something went wrong</div>
    }
    console.log('QQQQ',data.data)
    // return <IngredientsList list={data.data.ingredients} />
    const imageUrl = data.data.imageUrl ? data.data.imageUrl : 'https://placeholder.pics/svg/400';
    const alcoholic = data.data.alcoholic ? 'Alcoholic' : 'Non-alcoholic';

    return (
    <div>
        {/*regular view*/}
        <div className={'hidden sm:grid md:grid-cols-2 sm:grid-cols-1 lg:px-16 px-4 gap-4'}>
            <div className={'flex flex-col space-y-4 items-center'}>
                <Image alt={'cocktailPhoto'} src={imageUrl} width={400} height={400}
                       className={'rounded-xl object-cover w-full h-auto'}/>
            </div>
            <div className={'flex-col w-full h-full space-y-4 text-center'}>
                <h1 className={'text-6xl text-pakistan_green font-extrabold'}>{data.data.name}</h1>
                <div className={'flex space-x-4 items-center justify-center'}>
                    <Badge className={'bg-pakistan_green-500 text-white'}>{data.data.category}</Badge>
                    <Separator orientation={'vertical'} className={'bg-foreground h-8 w-px'}/>
                    <Badge className={'bg-pakistan_green-500 text-white'}>{data.data.glass}</Badge>
                    <Separator orientation={'vertical'} className={'bg-foreground h-8 w-px'}/>
                    <Badge className={'bg-pakistan_green-500 text-white'}>{alcoholic}</Badge>
                </div>

                <div className={'flex px-16 justify-center items-center py-4'}>
                    {data.data.instructions}
                </div>
                <h1 className="text-sm sm:text-xl font-semibold text-pakistan_green">Ingredients</h1>
                {data?.data?.ingredients ? (
                    <IngredientsList list={data.data.ingredients}/>) : (
                    <div>No ingredients available</div>
                )}
            </div>
        </div>
        {/*mobile view*/}
        <div className={'sm:hidden px-4'}>
            <div className={'flex-col w-full h-full space-y-4 text-center'}>
                <h1 className={'text-6xl text-pakistan_green font-extrabold pb-4'}>{data.data.name}</h1>
                <div className={'flex space-x-4 items-center justify-center'}>
                    <Badge className={'bg-pakistan_green-500 text-white text-xs'}>{data.data.category}</Badge>
                    <Badge className={'bg-pakistan_green-500 text-white'}>{data.data.glass}</Badge>
                    <Badge className={'bg-pakistan_green-500 text-white'}>{alcoholic}</Badge>
                </div>
            </div>
            <Image alt={'cocktailPhoto'} src={imageUrl} width={100} height={100}
                   className={'rounded-3xl object-cover w-full h-auto py-10'}/>
            <div className={'flex-col space-y-4 items-center'}>

                <div className={'flex justify-center items-center'}>
                    {data.data.instructions}
                </div>
                <h1 className="sm:text-xl font-semibold text-pakistan_green text-center">Ingredients</h1>
                {data?.data?.ingredients ? (
                    <IngredientsList list={data.data.ingredients}/>) : (
                    <div>No ingredients available</div>
                )}
            </div>

        </div>
    </div>)
}

export default CocktailDetails