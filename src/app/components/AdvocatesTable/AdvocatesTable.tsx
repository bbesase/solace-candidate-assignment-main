import { Advocate } from "@/app/types/advocates";
import {AdvocatesTableRow, AdvocatesTableHeader} from "./index"

interface AdvocatesTableProps {
  advocates: Advocate[];
  onHeaderClick?: (column: string) => void;
  sortColumn?: string | null;
  sortDirection?: "asc" | "desc";
}

export default function AdvocatesTable({advocates, onHeaderClick, sortColumn, sortDirection}: AdvocatesTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <AdvocatesTableHeader
          onHeaderClick={onHeaderClick}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
        />
        <tbody>
          {advocates.map((advocate: Advocate, index: number) => (
            <AdvocatesTableRow key={`advocate-${index}`} advocate={advocate} />
          ))}
        </tbody>
      </table>
    </div>
  );
}