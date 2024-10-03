import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {usePathname} from "next/navigation";

interface Pagination {
    currentPage: string, firstPage: string,firstPageUrl: string,lastPage:string,lastPageUrl:string,nextPageUrl:string,perPage:string,previousPageUrl:string, total:string
}

export function PaginationDemo({currentPage, firstPage,firstPageUrl,lastPage,lastPageUrl,nextPageUrl,perPage,previousPageUrl, total}:Pagination) {
    const path = usePathname()
    return (
        <Pagination>
            <PaginationContent>
                {previousPageUrl && (
                <PaginationItem>
                    {/*<Link href={previousPageUrl} >*/}
                        <PaginationPrevious href={previousPageUrl} />
                    {/*</Link>*/}
                </PaginationItem>)}
                {firstPage !== currentPage && (
                <PaginationItem>
                    <PaginationLink href={firstPageUrl}>1</PaginationLink>
                </PaginationItem>)}
                <PaginationItem>
                    <PaginationLink href={path} isActive>{currentPage}</PaginationLink>
                </PaginationItem>
                {lastPage!== currentPage && (
                <PaginationItem>
                    <PaginationLink href={lastPageUrl}>{lastPage}</PaginationLink>
                </PaginationItem>)}
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                {nextPageUrl && (
                <PaginationItem>
                    {/*<Link href={nextPageUrl} >*/}
                        <PaginationNext href={nextPageUrl} />
                    {/*</Link>*/}
                </PaginationItem>)}
            </PaginationContent>
        </Pagination>
    )
}
