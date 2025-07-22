"use client";

import { useEffect, useState } from "react";
import { Advocate } from "./types/advocates";
import AdvocatesTable from "./components/AdvocatesTable/AdvocatesTable";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
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

  return(
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Solace Advocates</h1>
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
        <AdvocatesTable advocates={filteredAdvocates} />
      </div>
    </main>
  )
}
