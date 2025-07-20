import { Button } from "@/components/ui/button";
// import { PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useSearchParams } from "react-router";



const PAGE_SIZE = 10;

export const PaginationUI = ({ count, pageCount }: {count: number, pageCount: number}) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

    const nextPage = () => {
        const next = currentPage === pageCount ? currentPage : currentPage + 1;
        searchParams.set('page', String(next));
        setSearchParams(searchParams);
    }

    const prevPage = () => {
        const prev = currentPage === 1 ? currentPage : currentPage - 1;
        searchParams.set('page', String(prev));
         setSearchParams(searchParams);
    }

    const FirstPage = () => {
        const first = 1;
        searchParams.set('page', String(first));
        setSearchParams(searchParams);
    }

    const LastPage = () => {
        const last = pageCount;
         searchParams.set('page', String(last));
        setSearchParams(searchParams);
    }

    const start = (currentPage - 1) * PAGE_SIZE + 1;
    let end = currentPage * PAGE_SIZE;
    if (end > count) end = count;

    const displayText = `Showing ${count === 0 ? 0 : start} to ${end} of ${count} results`;

    if (pageCount <= 1) return null;

    return (
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mt-6 ">
            <span className="text-xs font-medium"> {displayText} </span>

            <div className="flex items-center justify-center gap-1">

                {/* <PaginationPrevious
                    onClick={prevPage}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />

                <PaginationItem>
                    <PaginationLink >{currentPage}</PaginationLink>
                </PaginationItem>

                <PaginationNext
                    onClick={nextPage}
                    className={
                        currentPage === pageCount ? 'pointer-events-none opacity-50' : 'cursor-pointer'
                    }
                /> */}
                <Button variant="ghost" onClick={FirstPage} disabled={currentPage <= 2}>
                    <i className="fi fi-rr-angle-double-small-left grid place-items-center"></i>
                    First
                </Button>
                <Button variant="ghost" onClick={prevPage}  disabled={currentPage === 1}>
                    <i className="fi fi-rr-angle-small-left grid place-items-center"></i>
                </Button>
                <Button variant="ghost" className="pointer-events-none cursor-not-allowed">
                    {currentPage}
                </Button>
                <Button variant="ghost" onClick={nextPage} disabled={currentPage === pageCount}>
                    <i className="fi fi-rr-angle-small-right grid place-items-center"></i>
                </Button>
                <Button variant="ghost" onClick={LastPage} disabled={currentPage >= (pageCount - 1)}>
                    Last
                    <i className="fi fi-rr-angle-double-small-right grid place-items-center"></i>
                </Button>
          
            </div>
            
        </div>
    )

}