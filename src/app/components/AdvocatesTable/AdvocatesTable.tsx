import { Advocate } from "@/app/types/advocates";
import { useState } from "react";
import {AdvocatesTableDesktop} from "./Desktop/index";
import {TabletPlaceholder} from "./Tablet/index";
import {MobilePlaceholder} from "./Mobile/index";

interface AdvocatesTableProps {
  advocates: Advocate[];
  loadedFilteredAdvocates?: Advocate[];
}

export default function AdvocatesTable({ advocates, loadedFilteredAdvocates }: AdvocatesTableProps) {
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>(loadedFilteredAdvocates || advocates);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSearch = (searchTerm: string) => {
    const trimmedLowerCaseSearchTerm = searchTerm.trim().toLowerCase();
    setSearchTerm(trimmedLowerCaseSearchTerm);

    const filtered = advocates.filter((advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(trimmedLowerCaseSearchTerm) ||
        advocate.lastName.toLowerCase().includes(trimmedLowerCaseSearchTerm) ||
        advocate.city.toLowerCase().includes(trimmedLowerCaseSearchTerm) ||
        advocate.degree.toLowerCase().includes(trimmedLowerCaseSearchTerm) ||
        advocate.specialties.some((specialty) =>
          specialty.toLowerCase().includes(trimmedLowerCaseSearchTerm)
        ) ||
        advocate.yearsOfExperience.toString().includes(trimmedLowerCaseSearchTerm)
      );
    });

    setFilteredAdvocates(filtered);
  }

  const handleClearSearch = () => {
    setSearchTerm("");
    setFilteredAdvocates(advocates);
  }

  const sortAdvocates = (data: Advocate[]) =>{
    if (!sortColumn) return data;
    return [...data].sort((a, b) => {
      let aValue = a[sortColumn as keyof Advocate];
      let bValue = b[sortColumn as keyof Advocate];

      // For array values, join them into a string (csv) for comparison
      if (Array.isArray(aValue)) aValue = aValue.join(", ");
      if (Array.isArray(bValue)) bValue = bValue.join(", ");

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }
      return sortDirection === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }

  return (
    <div>
      {/* Desktop display */}
      <div className="overflow-x-auto hidden lg:block">
        <div className="mb-6 relative w-full">
          <input
            type="text"
            className="border border-gray-300 p-2 rounded w-full pr-8"
            placeholder="Search by first name, last name, city, degree, specialty, or years of experience"
            onChange={(e) => handleSearch(e.target.value)}
            value={searchTerm}
          />
          {searchTerm && (
            <button
              type="button"
              className="absolute right-8 top-1/2 text-2xl -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => handleClearSearch()}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
        <div className="overflow-x-auto">
          <AdvocatesTableDesktop
            advocates={sortAdvocates(filteredAdvocates)}
            onHeaderClick={(column:string) => {
              if (sortColumn === column) {
                setSortDirection(sortDirection === "asc" ? "desc" : "asc");
              } else {
                setSortColumn(column);
                setSortDirection("asc");
              }
            }}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
          />
        </div>
      </div>

      {/* Tablet Display */}
      <div className="overflow-x-auto hidden md:block lg:hidden">
        <TabletPlaceholder />
      </div>
      
      {/* Mobile Display */}
      <div className="overflow-x-auto md:hidden lg:hidden">
        <MobilePlaceholder />
      </div>
    </div>
  );
}