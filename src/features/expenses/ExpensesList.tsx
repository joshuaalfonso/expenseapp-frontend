
import { ExpensesRow } from "./ExpensesRow";
// import { LoadingSpinner } from "@/components/LoadingSpinner";
import { CreateEditExpenses } from "./CreateEditExpenses";
import { useCategories } from "../categories/useCategories";
import { useMemo, useState } from "react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { SortBy, type SortOptions } from "../../ui/SortBy";
// import { useExpenses } from "./useExpenses";
// import { Alert, AlertTitle } from "@/components/ui/alert";
// import { AlertTriangleIcon } from "lucide-react";
import type { PaginatedExpenseList } from "@/models/expenses";

const options: SortOptions[] = [
    {
        value: 'desc', 
        label: "Sort by date (recent first)"
    },
    {
        value: 'asc', 
        label: "Sort by date (old first)"
    }
]

interface Props {
    paginatedData: PaginatedExpenseList,
    page: number;
    setPage: (page: number | ((prev: number) => number)) => void;
}

export const ExpensesList = ({paginatedData, page, setPage}: Props) => {

    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    // const [page, setPage] = useState<number>(1);

    // const {paginatedData, isPending, error} = useExpenses(page);

    const visiblePages = useMemo(() => {
        if (!paginatedData) return [];

        return Array.from({ length: paginatedData.totalPages }, (_, i) => i + 1)
            .filter(p => p !== 1 && p !== paginatedData.totalPages && Math.abs(p - page) <= 1);
    }, [paginatedData, page]);

    const { 
        data: categories, 
        isPending: isCategoriesLoading, 
        error: categoriesError 
    } = useCategories();

    const currentPage = Number(paginatedData?.currentPage) || 1;
    const perPage = Number(paginatedData?.perPage) || 10; // fallback per page default
    const totalResults = Number(paginatedData?.total) || 0;

    const start = (currentPage - 1) * perPage + 1;
    let end = currentPage * perPage;
    if (end > totalResults) end = totalResults;

    const displayText = `Showing ${totalResults === 0 ? 0 : start} to ${end} of ${totalResults} results`;
    
    // console.log('expense list init')

    return (
        <>
            <div className="flex justify-between gap-4 mb-4">

                <SortBy options={options} />

                <CreateEditExpenses 
                    categories={categories || []}
                    isCategoriesLoading={isCategoriesLoading}
                    categoriesError={categoriesError}
                    dialogOpen={dialogOpen}
                    setDialogOpen={setDialogOpen}
                />
            </div>

            {paginatedData?.data?.length === 0 && (
                 <div className="h-[200px] grid place-items-center bg-[var(--color-input]) rounded-[var(--radius-sm)]">
                    <p className="text-center col-span-full opacity-70">No expenses found.</p>
                </div>
            )}
            

            <ul className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(320px,1fr))]">
                {paginatedData.data?.map(row => (
                    <ExpensesRow 
                        row={row} 
                        key={row.id}
                        categories={categories || []}
                        isCategoriesLoading={isCategoriesLoading}
                        categoriesError={categoriesError} 
                    />
                ))}
            </ul>

            {paginatedData.totalPages > 1 && (
                <div className="space-y-4 mt-4">
                    <span className="text-xs font-medium"> {displayText} results</span>
                    <Pagination className="mt-8">
                        <PaginationContent>

                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                                    className={page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                                />
                            </PaginationItem>

                            {/* First Page */}
                            <PaginationItem>
                                <PaginationLink
                                    onClick={() => setPage(1)}
                                    isActive={page === 1}
                                    className={
                                        page === 1 ? 'cursor-not-allowed' : 'cursor-pointer'
                                    }
                                >
                                    1
                                </PaginationLink>
                            </PaginationItem>

                            {/* Start Ellipsis */}
                            {page > 3 && (
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            )}

                            {/* Pages around current */}
                            {visiblePages.map(p => (
                                    <PaginationItem key={p}>
                                        <PaginationLink 
                                            onClick={() => setPage(p)} 
                                            isActive={p === page}
                                            className={`${p === page ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                        >
                                            {p}
                                        </PaginationLink>
                                    </PaginationItem>
                            ))}


                            {/* End Ellipsis */}
                                {page < paginatedData.totalPages - 2 && (
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            )}

                            {/* Last Page */}
                            {paginatedData.totalPages > 1 && (
                                <PaginationItem>
                                    <PaginationLink
                                        onClick={() => setPage(paginatedData.totalPages)}
                                        isActive={page === paginatedData.totalPages}
                                        className={
                                            page === paginatedData.totalPages ? 'cursor-not-allowed' : 'cursor-pointer'
                                        }
                                    >
                                    {paginatedData.totalPages}
                                    </PaginationLink>
                                </PaginationItem>
                            )}

                            <PaginationItem>
                                <PaginationNext 
                                    onClick={() =>
                                        setPage((prev) =>
                                            Math.min(prev + 1)
                                        )
                                    }
                                    className={
                                        page === paginatedData?.totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'
                                    }
                                />
                            </PaginationItem>

                        </PaginationContent>
                    </Pagination>
                    
                </div>
            )}
        </>
    )
}