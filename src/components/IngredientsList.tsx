import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {Ingredient} from "@/lib/types";

function IngredientsList({list}: {list: Ingredient[]}) {
    return (
        <Carousel
            opts={{
                align: "center",
            }}
            className="mx-10"
        >
            <CarouselContent className="flex">
                {list.map((ingredient) => (
                    <CarouselItem key={ingredient.id} className="flex-grow pl-0.1 basis-1/2 sm:basis-1/3 lg:basis-1/4 w-full max-w-md scroll-snap-start rounded-lg overflow-hidden shadow-lg mx-2 min-h-32">
                        <div className="p-0.1">
                            <Card className={'bg-background'}>
                                <CardContent className="flex-col aspect-square items-center justify-center p-1 space-y-1">
                                    <span className="text-sm sm:text-xl font-semibold">{ingredient.name}</span>
                                    <h1 className="text-sm text-dun-200">{ingredient.type}</h1>
                                    <h1 className="text-dun-300">Measure: {ingredient.measure}</h1>
                                    {/*<Image width={100} height={100} src={ingredient.imageUrl} alt={'ingredient'} />*/}
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            {/*<CarouselPrevious className="hidden sm:flex"/>*/}
            {/*<CarouselNext className="hidden sm:sm:flex"/>*/}
        </Carousel>
    )
}

export default IngredientsList
