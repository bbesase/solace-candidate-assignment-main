import { Advocate } from "@/app/types/advocates";
import {AdvocatesTableRowDesktop, AdvocatesTableHeaderDesktop} from "./index";

interface AdvocatesTableProps {
  advocates: Advocate[];
  onHeaderClick?: (column: string) => void;
  sortColumn?: string | null;
  sortDirection?: "asc" | "desc";
}

export default function AdvocatesTableDesktop({advocates, onHeaderClick, sortColumn, sortDirection}: AdvocatesTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <AdvocatesTableHeaderDesktop
          onHeaderClick={onHeaderClick}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
        />
        <tbody>
          {advocates.map((advocate: Advocate, index: number) => (
            <AdvocatesTableRowDesktop key={`advocate-${index}`} advocate={advocate} />
          ))}
        </tbody>
      </table>
    </div>
  );
}