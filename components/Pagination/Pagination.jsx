"use client";

/**
 * Reusable Pagination Component
 * @param {Object} props
 * @param {number} props.currentPage - Current active page
 * @param {number} props.totalPages - Total number of pages
 * @param {number} props.totalItems - Total number of items
 * @param {number} props.limit - Items per page
 * @param {function} props.onPageChange - Callback function when page changes
 * @param {string} props.itemName - Name of items being paginated (default: "items")
 */
export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  limit,
  onPageChange,
  itemName = "items",
}) {
  // Don't render if only one page or no pages
  if (totalPages <= 1) return null;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className="mt-6 flex items-center justify-between flex-wrap gap-4">
      {/* Items counter */}
      <div className="text-sm text-zinc-400">
        Showing {(currentPage - 1) * limit + 1} to{" "}
        {Math.min(currentPage * limit, totalItems)} of {totalItems} {itemName}
      </div>

      {/* Pagination controls */}
      <div className="flex gap-2 flex-wrap">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            currentPage === 1
              ? "bg-zinc-800 text-zinc-600 cursor-not-allowed"
              : "bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-orange-500"
          }`}
        >
          Previous
        </button>

        {/* Page Numbers */}
        <div className="flex gap-1">
          {/* First Page */}
          {currentPage > 2 && (
            <>
              <button
                onClick={() => handlePageChange(1)}
                className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-orange-500 transition-all"
              >
                1
              </button>
              {currentPage > 3 && (
                <span className="px-3 py-2 text-zinc-500">...</span>
              )}
            </>
          )}

          {/* Previous Page */}
          {currentPage > 1 && (
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-orange-500 transition-all"
            >
              {currentPage - 1}
            </button>
          )}

          {/* Current Page */}
          <button
            disabled
            className="px-4 py-2 rounded-lg bg-orange-500 text-white font-semibold cursor-default"
          >
            {currentPage}
          </button>

          {/* Next Page */}
          {currentPage < totalPages && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-orange-500 transition-all"
            >
              {currentPage + 1}
            </button>
          )}

          {/* Last Page */}
          {currentPage < totalPages - 1 && (
            <>
              {currentPage < totalPages - 2 && (
                <span className="px-3 py-2 text-zinc-500">...</span>
              )}
              <button
                onClick={() => handlePageChange(totalPages)}
                className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-orange-500 transition-all"
              >
                {totalPages}
              </button>
            </>
          )}
        </div>

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            currentPage === totalPages
              ? "bg-zinc-800 text-zinc-600 cursor-not-allowed"
              : "bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-orange-500"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
