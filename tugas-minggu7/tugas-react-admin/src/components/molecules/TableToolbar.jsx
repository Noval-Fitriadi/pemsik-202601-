export default function TableToolbar({
  search,
  onSearchChange,
  searchPlaceholder = "Cari data...",
  sortBy,
  onSortByChange,
  sortOptions = [],
  sortOrder,
  onSortOrderChange,
  limit,
  onLimitChange,
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <input
        type="text"
        placeholder={searchPlaceholder}
        className="border border-gray-300 px-3 py-1.5 rounded text-sm flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      {sortOptions.length > 0 && (
        <select
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value)}
          className="border border-gray-300 px-3 py-1.5 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}

      <select
        value={sortOrder}
        onChange={(e) => onSortOrderChange(e.target.value)}
        className="border border-gray-300 px-3 py-1.5 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="asc">Asc</option>
        <option value="desc">Desc</option>
      </select>

      <select
        value={limit}
        onChange={(e) => onLimitChange(Number(e.target.value))}
        className="border border-gray-300 px-3 py-1.5 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value={2}>2 / halaman</option>
        <option value={5}>5 / halaman</option>
        <option value={10}>10 / halaman</option>
        <option value={25}>25 / halaman</option>
      </select>
    </div>
  );
}