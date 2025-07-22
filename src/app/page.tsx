"use client";

import { useEffect, useState } from "react";
import { Advocate } from "./types/advocates";
import { AdvocatesTable } from "./components/AdvocatesTable";
import { LoadingError, LoadingState } from "./components/common";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    fetch("/api/advocates")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error fetching advocates: ${response.statusText}`);
        }
        return response.json();
      })
      .then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      })
      .catch((error) => {
        setAdvocates([]);
        setFilteredAdvocates([]);
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

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

  return(
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Solace Advocates</h1>
      {hasError && (
          <LoadingError />
        )}
        {!hasError && isLoading && (
          <LoadingState />
        )}
        {!hasError && !isLoading && advocates.length > 0 && (
          <div>
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
              <AdvocatesTable
                advocates={sortAdvocates(filteredAdvocates)}
                onHeaderClick={(column) => {
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
        )}
    </main>
  )
}
