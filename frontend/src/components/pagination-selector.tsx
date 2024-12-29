import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination"

type PaginationSelectorProps = {
    page: number
    pages: number
    onPageChange: (page: number) => void
}

const PaginationSelector = ({ onPageChange, page, pages }: PaginationSelectorProps) => {
    if (pages <= 1) {
        return null
    }

    const pageNumbers = Array.from({ length: pages }, (_, i) => i + 1)

    return (
        <Pagination>
            <PaginationContent>
                {page > 1 && ( // Show previous button if there's a previous page
                    <PaginationItem>
                        <PaginationPrevious href="#" onClick={() => onPageChange(page - 1)} />
                    </PaginationItem>
                )}

                {pageNumbers.map((number) => (
                    <PaginationItem key={number}>
                        <PaginationLink
                            href="#"
                            onClick={() => onPageChange(number)}
                            isActive={page === number}
                        >
                            {number}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {page < pages && ( // Show next button if there's a next page
                    <PaginationItem>
                        <PaginationNext href="#" onClick={() => onPageChange(page + 1)} />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    )
}

export default PaginationSelector
