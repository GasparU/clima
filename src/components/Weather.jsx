import React, { useState } from "react";

export const Weather = ({ weather, airQuality }) => {
  const getWeatherEffect = (main) => {
    if (main === "Rain") return "rain";
    if (main === "Snow") return "snow";
    return "";
  };

  const levels = [
    { label: "Excelente", color: "#4BC0C0" },
    { label: "Buena", color: "#36A2EB" },
    { label: "Moderada", color: "#FFCD56" },
    { label: "Pobre", color: "#FF9F40" },
    { label: "Muy Pobre", color: "#FF6384" },
  ];

  const [isCelsius, setIsCelsius] = useState(true);
  const handleChangeTemp = () => {
    setIsCelsius(!isCelsius);
  };

  return (
    <div className="bg-gradient-to-br from-[#5bb0e8] to-[#4BC0C0] rounded-2xl shadow-xl p-8 transform transition-all hover:scale-105 w-full max-w-lg mt-10">
      <div
        className={`weather-background relative ${getWeatherEffect(
          weather?.weather[0].main
        )}`}
      >
        <div
          className={`weather-effect ${getWeatherEffect(
            weather?.weather[0].main
          )}`}
        ></div>
      </div>

      <div className="mt-6 p-4 bg-white/10 rounded-xl backdrop-blur-sm mb-4">
        <p className="text-white text-xl mb-3">
          Calidad del Aire: {levels[airQuality?.aqi - 1]?.label}
        </p>
        <div className="flex h-4 rounded-full overflow-hidden">
          {levels.map((_, i) => (
            <div
              key={i}
              className="flex-1"
              style={{
                backgroundColor:
                  i === airQuality?.aqi - 1 ? levels[i].color : "#ffffff60",
                boxShadow:
                  i === airQuality?.aqi - 1
                    ? `0 0 12px ${levels[i].color}`
                    : "none",
              }}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">{weather?.name}</h1>
          <h1 className="text-xl font-bold text-white">
            {weather?.sys.country}
          </h1>
          <p className="text-[#FFE08A] text-lg">
            {new Date().toLocaleDateString("es-ES", { weekday: "long" })}
          </p>
        </div>
        <button
          onClick={handleChangeTemp}
          className="bg-[#FFCD56] backdrop-blur-sm rounded-full text-white hover:bg-[#FF6384] transition-colors"
          style={{
            padding: "clamp(0.5rem, 2vw, 1rem) clamp(1rem, 4vw, 2rem)",
            fontSize: "clamp(0.875rem, 3vw, 1.125rem)",
          }}
        >
          {isCelsius ? "Cambiar a °F" : "Cambiar a °C"}
        </button>
      </div>

      <div className="flex items-center gap-6 mb-8">
        <img
          src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`}
          className="w-24 h-24 drop-shadow-lg"
        />
        <div className="text-white flex-1 min-w-0">
          <p
            className="font-bold mb-3"
            style={{
              fontSize: "clamp(2rem, 10vw, 4rem)",
              lineHeight: "1.2",
            }}
          >
            {isCelsius
              ? `${(weather?.main.temp - 273.15).toFixed(1)}`
              : `${(((weather?.main.temp - 273.15) * 9) / 5 + 32).toFixed(1)}`}
            <span style={{ fontSize: "0.6em" }}>°{isCelsius ? "C" : "F"}</span>
          </p>
          <p className="capitalize italic text-[#FFE08A] text-xl">
            {weather?.weather[0].description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-white">
        <div className="bg-white/10 p-3 rounded-xl text-center backdrop-blur-sm">
          <p className="text-[#FF6384] font-bold mb-2">🌬️</p>
          <p className="text-lg md:text-xl">{weather?.wind.speed} m/s</p>
        </div>
        <div className="bg-white/10 p-3 rounded-xl text-center backdrop-blur-sm">
          <p className="text-[#4BC0C0] font-bold mb-2">💧</p>
          <p className="text-lg md:text-xl">{weather?.main.humidity}%</p>
        </div>
        <div className="bg-white/10 p-3 rounded-xl text-center backdrop-blur-sm">
          <p className="text-[#FFCD56] font-bold mb-2">☁️</p>
          <p className="text-lg md:text-xl">{weather?.clouds.all}%</p>
        </div>
      </div>
    </div>
  );
};
