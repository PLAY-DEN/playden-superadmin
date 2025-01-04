
const Pagination = ({ currentPage, totalPages, onPageChange }: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}) => {
    // Helper function to generate page numbers
    const generatePageNumbers = () => {
        const range = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                range.push(i);
            }
        } else {
            if (currentPage <= 4) {
                range.push(1, 2, 3, 4, 5, "...", totalPages);
            } else if (currentPage > totalPages - 4) {
                range.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                range.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
            }
        }

        return range;
    };

    const pageNumbers = generatePageNumbers();

    return (
        <div className="flex justify-between items-center mt-4">
            {/* Previous button */}
            <button
                className="text-playden-primary"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </button>

            {/* Page numbers */}
            <div className="flex gap-2">
                {pageNumbers.map((page, index) =>
                    page === "..." ? (
                        <span key={index} className="px-2 py-1">
                            ...
                        </span>
                    ) : (
                        <button
                            key={page}
                            onClick={() => onPageChange(page as number)}
                            className={`px-2 py-1 rounded ${page === currentPage
                                    ? "bg-playden-primary text-white"
                                    : "bg-gray-100 text-black"
                                }`}
                        >
                            {page}
                        </button>
                    )
                )}
            </div>

            {/* Next button */}
            <button
                className="text-playden-primary"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
