import "./assets/css/App.css"
import WeatherPanel from './components/WeatherPanel'
import LinkWeather from "./components/LinkWeather"
import { useThemeContext } from "./context/ThemeContext"
import { useState } from 'react';


function App() {
  const { contextTheme, setContextTheme } = useThemeContext()
  const [checked, setChecked] = useState(true)
  const handleSwitch = (nextChecked) => {
    setContextTheme((state) => (state === "Light" ? "Dark" : "Light"))
    setChecked(nextChecked)
    console.log(nextChecked)

  }

  return (
    <div className="background" id={contextTheme}>
      <WeatherPanel handleSwitch={handleSwitch} checked={checked} />
      <LinkWeather />
    </div>
  )
}

export default App
