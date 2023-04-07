import axios from "axios";
import React from 'react'
import WeatherCard from "./WeatherCard";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
const LinkWeather = () => {
    const [latlon, setLatlon] = useState()
    const [weather, setWeather] = useState()
    const [temperature, setTemperature] = useState()

    useEffect(() => {
        const success = pos => {
            const obj = {
                lat: pos.coords.latitude,
                lon: pos.coords.longitude
            }
            setLatlon(obj)
        }
        const error = () => {
            alert("Tu navegador no tiene activada la geolocalización, debes dar los permisos para el acceso")
            console.log("error de navegacion")
        }
        navigator.geolocation.getCurrentPosition(success, error)
    }, [])
    useEffect(() => {
        if (latlon) {
            const apikey = import.meta.env.VITE_APP_URL
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latlon.lat}&lon=${latlon.lon}&appid=${apikey}&lang=es`
            axios.get(url)
                .then(res => {
                    const celsius = (res.data.main.temp - 273.15).toFixed(1)
                    const farenheit = (celsius * 9 / 5 + 32).toFixed(1)
                    setTemperature({ celsius, farenheit })
                    setWeather(res.data)
                }
                )

                .catch(err => console.log(err))
        }
    }, [latlon])

    return (
        <>
            {weather ? <WeatherCard weather={weather} temperature={temperature} /> : <Spinner />}
        </>

    )
}

export default LinkWeather
