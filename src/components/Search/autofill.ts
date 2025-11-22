import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/utils/useDebounce";
import { GEO_API } from "@/utils/constants";

export interface City {
  id: number;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

const fetchCities = async (query: string): Promise<City[]> => {
  if (query.length < 2) return [];

  const res = await fetch(
    `${GEO_API.BASE}/search?name=${encodeURIComponent(
      query
    )}&count=7&language=en&format=json`
  );

  const json = await res.json();

  return json.results
    ? json.results
        .map((item: any) => ({
          id: item.id,
          name: item.name,
          country: item.country,
          latitude: item.latitude,
          longitude: item.longitude,
        }))
        .filter(
          (city: City, index: number, self: City[]) =>
            index ===
            self.findIndex(
              (c) =>
                c.name.toLowerCase() === city.name.toLowerCase() &&
                c.country.toLowerCase() === city.country.toLowerCase()
            )
        )
    : [];
};

export const useCityAutofill = (query: string) => {
  const debouncedQuery = useDebounce(query, 500);

  const { data: suggestions = [], isFetching } = useQuery({
    queryKey: ["cities", debouncedQuery],
    queryFn: () => fetchCities(debouncedQuery),
    enabled: debouncedQuery.length >= 2,
    staleTime: 1000 * 60 * 20,
  });

  return {
    suggestions,
    isFetching,
    debouncedQuery,
  };
};
