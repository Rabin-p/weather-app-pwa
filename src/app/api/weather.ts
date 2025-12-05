import { GEO_API } from "@/utils/constants";

export const fetchWeather = async (lat: number, lon: number) => {
  const res = await fetch(
    `${GEO_API.WEATHER}?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,precipitation,weathercode,windspeed_10m`
  );

  if (!res.ok) throw new Error("Failed to fetch weather");

  const data = await res.json();
  return data; 
};
