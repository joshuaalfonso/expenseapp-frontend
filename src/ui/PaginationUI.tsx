import { PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
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

    const start = (currentPage - 1) * PAGE_SIZE + 1;
    let end = currentPage * PAGE_SIZE;
    if (end > count) end = count;

    const displayText = `Showing ${count === 0 ? 0 : start} to ${end} of ${count} results`;

    if (pageCount <= 1) return null;

    return (
        <div className="flex items-center justify-between mt-6 ">
            <span className="text-xs font-medium"> {displayText} </span>

            <div className="flex items-center gap-1">

                <PaginationPrevious
                    onClick={prevPage}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />



                <PaginationNext
                    onClick={nextPage}
                    className={
                        currentPage === pageCount ? 'pointer-events-none opacity-50' : 'cursor-pointer'
                    }
                />
          
            </div>
            
        </div>
    )

}