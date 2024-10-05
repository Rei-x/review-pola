import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {usePathname, useSearchParams} from "next/navigation";

interface Pagination {
    currentPage: string, firstPage: string,firstPageUrl: string,lastPage:string,lastPageUrl:string,nextPageUrl:string,perPage:string,previousPageUrl:string, total:string
}

export function PaginationDemo({currentPage, firstPage,firstPageUrl,lastPage,lastPageUrl,nextPageUrl,previousPageUrl}:Pagination) {
    const path = usePathname()
    const searchParams = useSearchParams();

    const getPath = (newPage: string) => {
        const currentQueryParams = new URLSearchParams(searchParams.toString());
        currentQueryParams.set('page', newPage.replace('/?page=',''));
        return `${window.location.pathname}?${currentQueryParams.toString()}`;
    };

    console.log(nextPageUrl)

    return (
        <Pagination>
            <PaginationContent>
                {previousPageUrl && (
                <PaginationItem>
                        <PaginationPrevious href={getPath(previousPageUrl)} />
                </PaginationItem>)}
                {firstPage !== currentPage && (
                <PaginationItem>
                    <PaginationLink href={getPath(firstPageUrl)}>1</PaginationLink>
                </PaginationItem>)}
                <PaginationItem>
                    <PaginationLink href={path} isActive>{currentPage}</PaginationLink>
                </PaginationItem>
                {lastPage!== currentPage && (
                <PaginationItem>
                    <PaginationLink href={getPath(lastPageUrl)}>{lastPage}</PaginationLink>
                </PaginationItem>)}
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                {nextPageUrl && (
                <PaginationItem>
                        <PaginationNext href={getPath(nextPageUrl)} />
                </PaginationItem>)}
            </PaginationContent>
        </Pagination>
    )
}


