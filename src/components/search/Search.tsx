import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { fetchWeather } from "@/app/api/weather";
import { LucideSearch, Loader2 } from "lucide-react";
import { useCityAutofill } from "./autofill";
import { useCityStore } from "@/store/selectedCity";
import type { City } from "@/types/type";

const Search: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedCity = useCityStore((state) => state.selectedCity);
  const setSelectedCity = useCityStore((state) => state.setSelectedCity);

  const { suggestions, isFetching, debouncedQuery } = useCityAutofill(query);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const hasContent =
    isFetching ||
    suggestions.length > 0 ||
    (debouncedQuery.length >= 2 && !isFetching);

  const isOpen = isFocused && hasContent;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectCity = async (city: City) => {
    setQuery(`${city.name}, ${city.country}`);
    setSelectedCity(city);
    setIsFocused(false);
    setIsNavigating(true);

    try {
      await queryClient.prefetchQuery({
        queryKey: ["weather", city.latitude, city.longitude],
        queryFn: () => fetchWeather(city.latitude, city.longitude),
      });
      navigate(`/city/${city.name}`);
    } finally {
      setIsNavigating(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (selectedCity) setSelectedCity(null);
  };

  return (
    <div className="w-full flex justify-center relative" ref={wrapperRef}>

      {isNavigating && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-50">
          <Loader2 className="w-12 h-12 animate-spin text-purple-600" />
        </div>
      )}

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
            onChange={handleSearchChange}
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
              <li className="px-4 py-2 flex items-center justify-center text-gray-500 cursor-default">
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Loading...
              </li>
            )}

            {!isFetching && suggestions.length === 0 && (
              <li className="px-4 py-2 text-gray-500 cursor-default">No cities found</li>
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
