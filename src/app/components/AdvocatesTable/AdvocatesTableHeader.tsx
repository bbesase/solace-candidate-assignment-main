import {AdvocatesTableHeaderCell} from "./index";

interface AdvocatesTableHeaderProps {
  onHeaderClick?: (column: string) => void;
  sortColumn?: string | null;
  sortDirection?: "asc" | "desc";
}

export default function AdvocatesTableHeader({ onHeaderClick, sortColumn, sortDirection }: AdvocatesTableHeaderProps) {
  const defaultTableHeaderClasses = "border border-gray-300 px-4 py-2 text-left cursor-pointer hover:bg-gray-200";
  
  return (
    <thead>
      <tr className="bg-gray-100">
        <AdvocatesTableHeaderCell column="firstName" onHeaderClick={onHeaderClick} sortColumn={sortColumn} sortDirection={sortDirection} />
        <AdvocatesTableHeaderCell column="lastName" onHeaderClick={onHeaderClick} sortColumn={sortColumn} sortDirection={sortDirection} />
        <AdvocatesTableHeaderCell column="city" onHeaderClick={onHeaderClick} sortColumn={sortColumn} sortDirection={sortDirection} />
        <AdvocatesTableHeaderCell column="degree" onHeaderClick={onHeaderClick} sortColumn={sortColumn} sortDirection={sortDirection} />
        <AdvocatesTableHeaderCell column="specialties" onHeaderClick={onHeaderClick} sortColumn={sortColumn} sortDirection={sortDirection} />
        <AdvocatesTableHeaderCell column="yearsOfExperience" onHeaderClick={onHeaderClick} sortColumn={sortColumn} sortDirection={sortDirection} />
        <AdvocatesTableHeaderCell column="phoneNumber" onHeaderClick={onHeaderClick} sortColumn={sortColumn} sortDirection={sortDirection} />
      </tr>
    </thead>
  );
}