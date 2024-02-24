import React, { useState, useEffect } from "react";
import Link from "next/link";

interface SearchResultItem {
  title: string;
  link: string;
}

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredResults, setFilteredResults] = useState<SearchResultItem[]>(
    []
  );
  const [showResults, setShowResults] = useState<boolean>(false);

  // Replace this with your actual search data or API response type
  const mockData: SearchResultItem[] = [
    { title: "Dojo Swap", link: "/Dojo-Swap" },
    { title: "Astroport", link: "/Astroport" },
    { title: "Helix", link: "/Helix" },
    { title: "Hydro", link: "/Hydro" },
  ];

  useEffect(() => {
    const handleSearch = async (query: string) => {
      if (query.trim()) {
        const lowercaseQuery = query.toLowerCase();
        const results = mockData.filter((item) =>
          item.title.toLowerCase().includes(lowercaseQuery)
        );
        setFilteredResults(results);
        setShowResults(true);
      } else {
        setShowResults(false);
      }
    };

    handleSearch(searchQuery);

    return () => {
      // Clean up any resources here
    };
  }, [searchQuery]);

  return (
    <form>
      <div className=" w-full bg-black">
        <input
          className=" w-full bg-black p-5 border-2 border-gray-800 rounded-xl  text-white"
          type="text"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search your Token/Protocol here..."
        />
      </div>
      {showResults && (
        <ul className="search-results  bg-gray-800 w-[79%] text-lg border-2 border-gray-800 rounded z-20	absolute	">
          {filteredResults.map((result) => (
            <li key={result.title} className="border-b-2 border-x-2 border-gray-400 p-2">
              <Link href={result.link}>{result.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default SearchBar;
