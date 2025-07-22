interface AdvocatesTableHeaderCellProps {
  column: string;
  onHeaderClick?: (column: string) => void;
  sortColumn?: string | null;
  sortDirection?: "asc" | "desc";
}

export default function AdvocatesTableHeaderCell({
  column,
  onHeaderClick,
  sortColumn,
  sortDirection,
}: AdvocatesTableHeaderCellProps) {
  return (
    <th
      className="border border-gray-300 px-4 py-2 text-left cursor-pointer hover:bg-gray-200"
      onClick={() => onHeaderClick && onHeaderClick(column)}
    >
      {column.charAt(0).toUpperCase() + column.slice(1)}
      {sortColumn === column && (
        <span className="ml-4 text-xs font-bold">
          {sortDirection === "asc" ? "▲" : "▼"}
        </span>
      )}
    </th>
  );
}