export default function Pagination({ page, totalPages, totalCount, onPageChange }) {
  const safeTotalPages = Math.max(totalPages, 1);

  const handlePrev = () => onPageChange(Math.max(page - 1, 1));
  const handleNext = () => onPageChange(Math.min(page + 1, safeTotalPages));

  return (
    <div className="flex flex-wrap justify-between items-center mt-4 gap-2">
      <p className="text-sm text-gray-600">
        Halaman <span className="font-semibold">{page}</span> dari{" "}
        <span className="font-semibold">{safeTotalPages}</span>{" "}
        <span className="text-gray-400">({totalCount} total data)</span>
      </p>

      <div className="flex gap-2">
        <button
          type="button"
          className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          onClick={handlePrev}
          disabled={page <= 1}
        >
          Prev
        </button>
        <button
          type="button"
          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          onClick={handleNext}
          disabled={page >= safeTotalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}