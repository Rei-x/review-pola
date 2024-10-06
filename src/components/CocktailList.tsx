import {currentFiltersAtom} from "@/atoms/filtersAtom";
import {useAtom} from "jotai/index";
import {useFetch} from "@/lib/useFetch";
import {PaginationDemo} from "./Pagination";
import {Cocktail} from "@/lib/types";
import CocktailCard from "@/components/CocktailCard";
import {useGetSearchParams} from "@/lib/searchParamsManager";
import {favouritesAtom} from "@/atoms/favouritesAtom";
import {searchAtom} from "@/atoms/searchAtom";
import {currentSortAtom} from "@/atoms/sortAtom";
import {Skeleton} from "@/components/ui/skeleton";


const CocktailList = () => {

    const [filters] = useAtom(currentFiltersAtom);
    const getCurrentParam = useGetSearchParams()
    const [favourites] = useAtom(favouritesAtom);
    const [searchQuery,] = useAtom(searchAtom);
    const [sort,] = useAtom(currentSortAtom);


    const buildQueryParams = () => {
        const queryParams = new URLSearchParams();

        // queryParams.append('perPage', '16')

        if (filters.category ) queryParams.append("category", filters.category);
        if (filters.glass) queryParams.append("glass", filters.glass);
        if (sort.sort) {
            queryParams.append("sort", `${sort.order}${sort.sort}`);
        }
        if (filters.ingredients && filters.ingredientsType) {
            filters.ingredients.forEach((ingredient) => {
                queryParams.append("ingredientId", ingredient);
            })

            // queryParams.append("ingredientId", filters.ingredients);
        }

        if (searchQuery !== '') queryParams.append("name", searchQuery)

        queryParams.append('page', getCurrentParam('page')?.toString() || '1')

        const category = getCurrentParam('category')?.toString() || 'home'
        const alcoholic = category!=='home' ? (category==='alcoholic' ? 'true' : 'false') : null
        if (alcoholic) queryParams.append("alcoholic", alcoholic)

        const isFavouritesQuery = getCurrentParam('favourites')?.toString() || 'false';
        if (isFavouritesQuery !== 'false') {
            favourites.forEach((id) => {
                queryParams.append('id[]', id)
            })
        }
        return queryParams;
    }

    const queryParams = buildQueryParams();

    const {data, isPending, error} = useFetch('cocktails', undefined, 'cocktails', queryParams);


    if (isPending) return (
        <div>
            <div className={'grid gap-4 p-4 grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 sm:px-16 md:px-24'}>
                {Array(15).fill(null).map((cocktail: Cocktail) => (
                    <div className={'flex flex-col space-y-4 pb-8'}>
                        <Skeleton className={'h-[30px]  rounded-3xl'}/>
                        <Skeleton className={'h-[125px]  rounded-xl'}/>
                    </div>

                ))}
            </div>
    </div>)

    if (error) return <div>Something went wrong</div>;

    if (data.data.length === 0) return <div className={'items-center justify-center flex'}>No results.</div>;

    if (getCurrentParam('favourites')?.toString() === 'true' && favourites.length === 0) {
        return <div className={'items-center justify-center flex'}>No favourites.</div>;
    }

    const {
        currentPage,
        firstPage,
        firstPageUrl,
        lastPage,
        lastPageUrl,
        nextPageUrl,
        perPage,
        previousPageUrl,
        total
    } = data.meta


    return (
        <div>
            <div className={'grid gap-4 p-4 grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 sm:px-16 md:px-24'}>
                {data && data.data.map((cocktail: Cocktail) => (
                    <CocktailCard id={cocktail.id}
                                  name={cocktail.name}
                                  category={cocktail.category}
                                  glass={cocktail.glass}
                                  instructions={cocktail.instructions}
                                  imageUrl={cocktail.imageUrl}
                                  alcoholic={cocktail.alcoholic}
                                  createdAt={cocktail.createdAt}
                                  updatedAt={cocktail.updatedAt}
                                  key={cocktail.id}
                    />))}

            </div>
            <PaginationDemo currentPage={currentPage} firstPage={firstPage} firstPageUrl={firstPageUrl} lastPage={lastPage} lastPageUrl={lastPageUrl} nextPageUrl={nextPageUrl} perPage={perPage} previousPageUrl={previousPageUrl} total={total}/>
        </div>
    )


}


export default CocktailList