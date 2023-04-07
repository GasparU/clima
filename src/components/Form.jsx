import React, { useState, useEffect } from 'react'
import ReactSwitch from 'react-switch'

const Form = ({ newLocation, handleSwitch, checked }) => {
    const [time, setTime] = useState("")
    function formatTime(val) {
        if (val < 10) {
            return 0
        } else { return "" }
    }
    useEffect(() => {
        const timerID = setInterval(() => tick(), 1000)
        return function cleanup() {
            clearInterval(timerID)
        }
    })
    function tick() {
        const d = new Date()
        const h = d.getHours()
        const m = d.getMinutes()
        const s = d.getSeconds()
        setTime(formatTime(h) + h + ":" + formatTime(m) + m + ":" + formatTime(s) + s)
    }

    const [city, setCity] = useState("")

    const onSubmit = (e) => {
        e.preventDefault()
        console.log({ city })
        if (city === "" || !city)
            return;
        newLocation(city)

    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className=' input'>
                    <div className='text'>
                        <p className='title2'><b>App de Clima: José Gaspar</b></p>
                        <b className='title2'>Hora actual: {time}</b>
                    </div>
                    <div className='format'>
                        <input type="text" className=' input2' placeholder=' Ingresa una ciudad' onChange={(e) => setCity(e.target.value)} />
                        <button className=' submit' type='sumbit'>Buscar</button>
                    </div>
                    <div>
                        <ReactSwitch
                            onChange={handleSwitch}
                            checked={checked}
                            onColor="#86d3ff"
                            onHandleColor="#2693e6"
                            handleDiameter={30}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                            height={20}
                            width={48}
                            className="react-switch"
                            id="material-switch"
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Form