import type { PaginationProps } from "../../../../Interfaces/Interfaces";


export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 8,
}: PaginationProps) {
    
  if (totalPages <= 1) return null;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = startPage + maxVisiblePages - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="paginate-container d-flex justify-content-center align-items-center flex-wrap gap-2 mt-4">
      <button
        className="btn btn-outline-secondary"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={`btn ${page === currentPage ? "btn-secondary" : "btn-danger"}`}
          aria-current={page === currentPage ? "page" : undefined}
          onClick={() => onPageChange(page)}
          disabled={page === currentPage}
        >
          {page}
        </button>
      ))}

      <button
        className="btn btn-outline-secondary"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}
