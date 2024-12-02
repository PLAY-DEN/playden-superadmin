import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-between items-center mt-4">
      <button
        className={`text-playden-primary ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>
      <div className="flex gap-2">
        {pages.map((page) => (
          <button
            key={page}
            className={`px-2 py-1 rounded ${
              page === currentPage ? 'bg-playden-primary text-white' : 'bg-gray-100 text-black'
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        className={`text-playden-primary ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
