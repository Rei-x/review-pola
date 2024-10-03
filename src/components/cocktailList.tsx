import {currentFiltersAtom} from "@/lib/FiltersAtom";
import {useAtom} from "jotai/index";
import {useFetch} from "@/lib/api";
import {PaginationDemo} from "./pagination";
import {Cocktail} from "@/lib/ProductListTypes";
import CocktailCard from "@/components/cocktailCard";
import {useEffect} from "react";
// import {useRouter} from "next/router";
import {useRouter, usePathname, useSearchParams} from "next/navigation";


const CocktailList = () => {

    const [filters, setFilters] = useAtom(currentFiltersAtom);

    const searchParamaters = useSearchParams();
    // const router = useRouter();


    // useEffect(() => {
    //     const newQueryParams = new URLSearchParams(searchParamaters.toString());
    //     newQueryParams.set('page','1')
    //     router.push(`?${newQueryParams.toString()}`);
    // }, [filters, router, searchParamaters]);


    const buildQueryParams = () => {
        const queryParams = new URLSearchParams();
        if (filters.category ) queryParams.append("category", filters.category);
        if (filters.glass) queryParams.append("glass", filters.glass);
        if (filters.sort) queryParams.append("sort", filters.sort);
        if (filters.alcoholic !== null) queryParams.append("alcoholic", filters.alcoholic ? 'true' : 'false')
        if (filters.name) queryParams.append("name", filters.name);
        if (filters.instructions) queryParams.append("instructions", filters.instructions);
        // queryParams.append('page', currentPage.toString())
        queryParams.append('page', searchParamaters.get('page')?.toString() || '1')
        return queryParams;
    }

    const queryParams = buildQueryParams();

    const {data, isPending, error} = useFetch('cocktails', undefined, 'cocktails', queryParams);


    if (isPending) return <div>Loading...</div>;

    if (error) throw error;

    const {currentPage, firstPage,firstPageUrl,lastPage,lastPageUrl,nextPageUrl,perPage,previousPageUrl,total} = data.meta


    return (
        <div>
            {/*<Link href={Page}>button</Link>*/}
            <div className={'grid gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:px-16 md:px-24'}>
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