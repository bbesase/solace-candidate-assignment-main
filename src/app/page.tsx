"use client";

import { useEffect, useState } from "react";
import { Advocate } from "./types/advocates";
import { LoadingError, LoadingState } from "./components/common";
import {AdvocatesTable} from "./components/AdvocatesTable/index";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
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
          <AdvocatesTable
            advocates={advocates}
            loadedFilteredAdvocates={filteredAdvocates}
          />
        )}
    </main>
  )
}
