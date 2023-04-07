import React from 'react';
import Spinner from "./Spinner"

const Card = ({ showData, loadingData, weather, forecast }) => {

    let url = ""
    let iconUrl = "";
    if (loadingData) {
        return <Spinner />
    }
    if (showData) {
        url = "http://openweathermap.org/img/w/";
        iconUrl = url + weather.weather[0].icon + ".png"
        console.log(weather)
    }
    return (<div className='mt-5'>
        {
            showData === true ? (
                <div className='container'>
                    <div className='container3'>
                        <div>
                            <h2 className='card-title'>Lugar: {weather.name} {weather.sys.country}</h2>
                            <h3 className='card-title'>Velocidad del Viento: <b>{weather.wind.speed}</b> m/s</h3>
                            <h3 className='card-title'>Nubes: <b>{weather.clouds.all}</b></h3>
                            <h3 className='card-title'>Presion Atm.: <b>{weather.main.pressure}</b> mmHg</h3>
                            <h3 className='card-title'>Humedad: <b>{weather.main.humidity}%</b></h3>
                            <h3 className='card-title'>Condición: <b>{weather.weather[0].description}</b></h3>
                            <h2 className='card-title2'> {(weather.main.temp - 273.15).toFixed(1)}°C</h2>
                        </div>
                        <p ><img className='card-desc' src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="icon" /> </p>
                    </div>

                </div>) :
                <h2 className='text-light'>Aquí se mostrarán los datos</h2>
        }


    </div>)
}
export default Card