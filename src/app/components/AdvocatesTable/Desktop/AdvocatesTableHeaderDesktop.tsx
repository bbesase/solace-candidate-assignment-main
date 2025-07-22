import {AdvocatesTableHeaderCellDesktop} from "./index";

interface AdvocatesTableHeaderProps {
  onHeaderClick?: (column: string) => void;
  sortColumn?: string | null;
  sortDirection?: "asc" | "desc";
}

export default function AdvocatesTableHeaderDesktop({ onHeaderClick, sortColumn, sortDirection }: AdvocatesTableHeaderProps) {
  const defaultTableHeaderClasses = "border border-gray-300 px-4 py-2 text-left cursor-pointer hover:bg-gray-200";
  
  return (
    <thead>
      <tr className="bg-gray-100">
        <AdvocatesTableHeaderCellDesktop column="firstName" onHeaderClick={onHeaderClick} sortColumn={sortColumn} sortDirection={sortDirection} />
        <AdvocatesTableHeaderCellDesktop column="lastName" onHeaderClick={onHeaderClick} sortColumn={sortColumn} sortDirection={sortDirection} />
        <AdvocatesTableHeaderCellDesktop column="city" onHeaderClick={onHeaderClick} sortColumn={sortColumn} sortDirection={sortDirection} />
        <AdvocatesTableHeaderCellDesktop column="degree" onHeaderClick={onHeaderClick} sortColumn={sortColumn} sortDirection={sortDirection} />
        <AdvocatesTableHeaderCellDesktop column="specialties" onHeaderClick={onHeaderClick} sortColumn={sortColumn} sortDirection={sortDirection} />
        <AdvocatesTableHeaderCellDesktop column="yearsOfExperience" onHeaderClick={onHeaderClick} sortColumn={sortColumn} sortDirection={sortDirection} />
        <AdvocatesTableHeaderCellDesktop column="phoneNumber" onHeaderClick={onHeaderClick} sortColumn={sortColumn} sortDirection={sortDirection} />
      </tr>
    </thead>
  );
}