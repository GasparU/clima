import React, { useState } from 'react'
import Form from './Form'
import Card from './Card'

const WeatherPanel = ({ handleSwitch, checked }) => {
  const apikey = import.meta.env.VITE_APP_URL
  let urlWeather = `https://api.openweathermap.org/data/2.5/weather?appid=${apikey}&lang=es`
  let cityUrl = "&q="
  let urlForecast = `https://api.openweathermap.org/data/2.5/weather?appid=${apikey}&lang=es`
  const [weather, setWeather] = useState([])  //en esta se almacena la respuesta de la api
  const [forecast, setForecast] = useState([]) // con este se hace la prediccion de las siguientes horas
  const [loading, setLoading] = useState(false) // spinner que se visualiza mientras se carga la data
  const [show, setShow] = useState(false) //para poder visualizar la tarjeta con informacion
  const [location, setLocation] = useState("") // para poder comunicarse con el formulario

  // Con esta funcion se hace la llamada a la API y recoger la locazion de la ciudad
  const getLocation = async (loc) => {
    setLoading(true) //esto permitira que se visualice el spin (imagen de carga)
    setLocation(loc)


    //weather

    urlWeather = urlWeather + cityUrl + loc
    await fetch(urlWeather).then((response) => {
      if (!response.ok) throw { response }
      return response.json()
    })
      .then((weatherData) => {
        console.log(weatherData)
        setWeather(weatherData)
      })
      .catch(error => {
        console.log(error)
        setLoading(false)
        setShow(false)
      })

    // Forecast

    urlForecast = urlWeather + cityUrl + loc
    await fetch(urlForecast)
      .then((response) => {
        if (!response.ok) throw { response }
        return response.json()
      })
      .then((forecastData) => {
        // console.log(forecastData)
        setForecast(forecastData)

        setLoading(false)
        setShow(true)
      })
      .catch(error => {
        console.log(error)
        setLoading(false)
        setShow(false)
      })
  }

  return (
    <div className='first-card'>
      <Form newLocation={getLocation} handleSwitch={handleSwitch} checked={checked} />
      <Card showData={show} loadingData={loading} weather={weather} forecast={forecast} />
    </div>
  )
}

export default WeatherPanel