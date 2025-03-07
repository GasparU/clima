import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import getApiKey from "./utils/getApiKey";
import { Weather } from "./components/Weather";

function App() {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [temp, setTemp] = useState();
  const [airQuality, setAirQuality] = useState();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState();
  const [searchAirQuality, setSearchAirQuality] = useState();

  useEffect(() => {
    const success = (pos) => {
      const obj = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      };
      setCoords(obj);
    };
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  useEffect(() => {
    if (coords) {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${
        coords.lat
      }&lon=${coords.lon}&appid=${getApiKey()}`;
      axios
        .get(url)
        .then((res) => {
          setWeather(res.data);
          setTemp(weather);
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  }, [coords]);

  const Loading = () => (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#36A2EB] border-t-transparent"></div>
    </div>
  );

  useEffect(() => {
    if (coords) {
      const airUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${
        coords.lat
      }&lon=${coords.lon}&appid=${getApiKey()}`;
      axios
        .get(airUrl)
        .then((res) => {
          setAirQuality(res?.data.list[0].main);
        })
        .catch(console.error);
    }
  }, [coords]);

  const handleSearch = async (e) => {
    e.preventDefault();

    const city = e.target.search.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${getApiKey()}`;
    axios
      .get(url)
      .then((res) => {
        setSearch(res?.data);
        const airUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${
          res?.data.coord.lat
        }&lon=${res?.data.coord.lon}&appid=${getApiKey()}`;
        return axios.get(airUrl);
      })
      .then((airRes) => {
        setSearchAirQuality(airRes?.data.list[0].main);
        e.target.search.value = "";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col w-screen h-screen items-center p-4 transition-all duration-1000">
    
      {/* Formulario de búsqueda fijo en la parte superior */}
      <div className="fixed top-0 left-0 right-0 bg-white z-10 shadow-md p-4">
        <form onSubmit={handleSearch} className="w-full max-w-md mx-auto">
          <div className="flex flex-col md:flex-row gap-2">
            <input
              className="w-full p-2 rounded-lg border-2 border-gray-300 focus:border-[#4BC0C0] focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg placeholder-gray-400 text-gray-700 text-sm sm:text-base"
              name="search"
              placeholder="Ingresa tu ciudad"
            />
            <button className="bg-sky-500 hover:bg-sky-700 h-10 w-full md:w-30 rounded-full text-white text-sm sm:text-base">
              Buscar
            </button>
          </div>
        </form>
      </div>

      

      {/* Contenido principal con margen superior para evitar solapamiento con el formulario */}
      <div className="mt-20 w-full max-w-4xl p-4 transition-all duration-500">
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            {search && (
              <div className="w-full md:w-1/2 transition-all duration-500">
                <Weather weather={search} airQuality={searchAirQuality} />
              </div>
            )}
            <div
              className={`w-full md:w-1/2 transition-all duration-500 ${
                search ? "md:ml-4" : ""
              }`}
            >
              <Weather weather={weather} airQuality={airQuality} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
