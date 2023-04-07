import React from 'react'
import { useState } from 'react'
const WeatherCard = ({ weather, temperature }) => {
    const [isCelsius, setisCelsius] = useState(true)
    const cambioTemp = () => {
        setisCelsius(!isCelsius)
    }
    console.log(weather)

    return (

        <div className='card'>
            <div className='container4'>
                <div>
                    <h2 className='card-title'>Lugar: {weather?.name}, {weather?.sys.country}</h2>
                    <h3 className='card-title'>Velocidad del Viento: <b>{weather?.wind.speed} m/s</b></h3>
                    <h3 className='card-title'>Nubes:  <b>{weather?.clouds.all}</b></h3>
                    <h3 className='card-title'>PresiónAtm.:  <b>{weather?.main.pressure} mmHg</b></h3>
                    <h3 className='card-title'>Humedad:  <b>{weather?.main.humidity}%</b></h3>
                    <h3 className='card-title'>Condición: {weather?.weather[0].description}</h3>
                    <h2>{isCelsius ? `${temperature?.celsius} °C` : `${temperature?.farenheit} °F`}</h2>
                </div>
                <div className='buton'>
                    <img className='card-desc' src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} />
                    <button className='submit card-title' onClick={cambioTemp}>Change to °F</button>
                </div>
            </div>

        </div>



    )
}

export default WeatherCard