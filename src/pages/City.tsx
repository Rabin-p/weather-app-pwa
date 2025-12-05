import { useCityStore } from "@/store/selectedCity";
import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "@/app/api/weather";

const City: React.FC = () => {
  const city = useCityStore((state) => state.selectedCity);

  if (!city) return <p>No city selected!</p>;

  const { data: weatherData, isLoading, isError } = useQuery({
    queryKey: ["weather", city.latitude, city.longitude],
    queryFn: () => fetchWeather(city.latitude, city.longitude),
    staleTime: 5 * 60 * 1000, 
  });

  if (isLoading) return <p>Loading weather...</p>;
  if (isError || !weatherData) return <p>Failed to fetch weather</p>;

  const { current_weather, hourly } = weatherData;

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-2">Weather in {city.name}</h1>

      <div className="mb-4 p-4 bg-gray-100 rounded-lg shadow text-black">
        <p><strong>Temperature:</strong> {current_weather.temperature}°C</p>
        <p><strong>Wind Speed:</strong> {current_weather.windspeed} km/h</p>
        <p><strong>Wind Direction:</strong> {current_weather.winddirection}°</p>
        <p><strong>Weather Code:</strong> {current_weather.weathercode}</p>
        <p><strong>Time:</strong> {new Date(current_weather.time).toLocaleString()}</p>
      </div>

      <h2 className="text-xl font-semibold mb-2">Hourly Forecast</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-black">
        {hourly.time.slice(0, 12).map((time: string, index: number) => (
          <div key={time} className="p-2 bg-white border rounded-lg shadow text-center">
            <p className="text-sm">{new Date(time).getHours()}:00</p>
            <p className="text-sm">{hourly.temperature_2m[index]}°C</p>
            <p className="text-xs">RH: {hourly.relative_humidity_2m[index]}%</p>
            <p className="text-xs">Precip: {hourly.precipitation[index]}mm</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default City;
