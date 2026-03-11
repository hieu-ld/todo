import type { TaskPaginationProps } from "@/lib/types";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";
import { cn } from "@/lib/utils";




const TaskPagination = ({ handleNext, handlePrev, handlePageChange, page, totalPages }: TaskPaginationProps) => {
    const generatePages = () => {
        const pages: (number | string)[] = [];
        if (totalPages < 4) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (page < 2) {
                pages.push(1,2,3,"...", totalPages);
            } else if (page >= totalPages - 1) {
                pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, "...", page, "...", totalPages);
            }
        }
        return pages;
    }

    const pagesToShow = generatePages();
    
    return (
        <div className="flex justify-center mt-4">
            <Pagination>
                <PaginationContent>
                    {/* lui ve trang trc */}
                    <PaginationItem>
                        <PaginationPrevious 
                            onClick={page === 1 ? undefined : handlePrev}
                            className={cn("cursor-pointer", page === 1 && "pointer-events-none opacity-50")}
                        />
                    </PaginationItem>

                    {pagesToShow.map((p, index) => (
                        <PaginationItem key={index}>
                            {p === "..." ? (
                                <PaginationEllipsis />
                            ) : (
                                <PaginationLink
                                    isActive={p === page}
                                    onClick={() => {
                                        if (p !== page && typeof p === "number") handlePageChange(p);
                                    }}
                                    className="cursor-pointer border-(--border-color)"
                                >
                                    {p}
                                </PaginationLink>
                            )}
                        </PaginationItem>
                    ))}

                    {/* trang sau */}
                    <PaginationItem>
                        <PaginationNext 
                            onClick={page === totalPages ? undefined : handleNext}
                            className={cn("cursor-pointer", page === totalPages && "pointer-events-none opacity-50")}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default TaskPagination;
