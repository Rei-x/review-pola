import {currentFiltersAtom} from "@/atoms/filtersAtom";
import {useAtom} from "jotai/index";
import {useFetch} from "@/lib/useFetch";
import {PaginationDemo} from "./Pagination";
import {Cocktail} from "@/lib/types";
import CocktailCard from "@/components/CocktailCard";
import {useGetSearchParams} from "@/lib/searchParamsManager";
import {favouritesAtom} from "@/atoms/favouritesAtom";
import {searchAtom} from "@/atoms/searchAtom";


const CocktailList = () => {

    const [filters] = useAtom(currentFiltersAtom);
    const getCurrentParam = useGetSearchParams()
    const [favourites] = useAtom(favouritesAtom);
    const [searchQuery,] = useAtom(searchAtom);

    // if (filters.ingredients) {
    //     const IngredientsParams = new URLSearchParams();
    //     IngredientsParams.append('type', filters.ingredients)
    //     const {
    //         data: ingredients,
    //         isPending: ingredientsPending,
    //         error: ingredientsError
    //     } = useFetch('ingredients', undefined, 'ingredients', IngredientsParams);
    // }





    const buildQueryParams = () => {
        const queryParams = new URLSearchParams();

        // queryParams.append('perPage', '16')

        if (filters.category ) queryParams.append("category", filters.category);
        if (filters.glass) queryParams.append("glass", filters.glass);
        if (filters.sort) queryParams.append("sort", filters.sort);
        if (filters.ingredients) {

            queryParams.append("ingredientId", filters.ingredients);
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


    if (isPending) return <div>Loading...</div>;

    if (error) return <div>Something went wrong</div>;

    if (data.data.length === 0) return <div className={'items-center justify-center flex'}>No results.</div>;

    if (getCurrentParam('favourites')?.toString() === 'true' && favourites.length === 0) {
        return <div className={'items-center justify-center flex'}>No favourites.</div>;
    }

    const {currentPage, firstPage,firstPageUrl,lastPage,lastPageUrl,nextPageUrl,perPage,previousPageUrl,total} = data.meta


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