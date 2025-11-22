import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LucideSearch } from "lucide-react";
import { useCityAutofill, type City } from "./autofill";

const Search: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { suggestions, isFetching, debouncedQuery } = useCityAutofill(query);

  const hasContent =
    isFetching ||
    suggestions.length > 0 ||
    (debouncedQuery.length >= 2 && !isFetching);

  const isOpen = isFocused && hasContent;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectCity = (city: City) => {
    setQuery(`${city.name}, ${city.country}`);
    setIsFocused(false);
  };

  return (
    <div className="w-full flex justify-center relative" ref={wrapperRef}>
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl relative">
        <div
          className={`flex border overflow-hidden ${
            isOpen ? "rounded-tl-lg rounded-tr-lg" : "rounded-lg"
          }`}
        >
          <Input
            type="text"
            placeholder="Enter city or zip code"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            className="flex-1 border-none rounded-none h-10 sm:h-12 md:h-14 px-2 sm:px-3 md:px-4 text-black bg-white focus:ring-0 focus:outline-none"
          />
          <Button className="h-10 sm:h-12 md:h-14 flex rounded-none items-center justify-center px-2 sm:px-3 md:px-4 bg-white text-black hover:bg-white hover:text-purple border-none cursor-pointer">
            <LucideSearch className="w-4 sm:w-5 md:w-5" />
          </Button>
        </div>

        {isOpen && (
          <ul className="absolute top-full left-0 right-0 bg-white border border-t-0 rounded-b-lg shadow-lg max-h-64 overflow-y-auto z-20 text-black">
            {isFetching && (
              <li className="px-4 py-2 text-gray-500 cursor-default">
                Loading...
              </li>
            )}

            {!isFetching && suggestions.length === 0 && (
              <li className="px-4 py-2 text-gray-500 cursor-default">
                No cities found
              </li>
            )}

            {!isFetching &&
              suggestions.map((c) => (
                <li
                  key={c.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors"
                  onClick={() => handleSelectCity(c)}
                >
                  {c.name}, {c.country}
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;