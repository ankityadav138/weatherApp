import React, { useState, useEffect } from 'react';
import Card from '../Card';
import './currentLocation.css'


function CurrentLocation() {

    const [lat, setLat] = useState([]);
    const [lng, setLng] = useState([]);
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false)
    const [cityName, setCityName] = useState('')
    const [days, setDays] = useState('');
    const [temperature, setTemperature] = useState("")
    const [pressure, setPressure] = useState("")
    const [time, setTime] = useState("")
    const [humidity, setHumidity] = useState("")
    const [main, setMain] = useState("");
    const dt = null;
    const [cdate, setDate] = useState(dt);

    // getting Day and Time

    const handelDate = () => {
        const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let dt = new Date().toLocaleDateString();
        const d = new Date();
        const time = new Date().toLocaleTimeString();
        const newTime = time.slice(0, 4)
        setTime(newTime)
        let day = weekday[d.getDay()];
        setDays(day)
        setDate(dt);
    }




    // getting current location of users

    const getCurrentLocation = () => {
        if (!navigator.geolocation) {
            setStatus('Geolocation is not supported by your browser');
        } else {
            setStatus('Locating...');
            navigator.geolocation.getCurrentPosition((position) => {
                setStatus(null);
                setLat(position.coords.latitude);
                setLng(position.coords.longitude);
                console.log(position)
            }, () => {
                setStatus('Unable to retrieve your location');
            });
        }
    }

    // getting weather forecast of current location of users

    const getWeather = async () => {
        await fetch("https://api.openweathermap.org/data/2.5/weather?lat=25.5940947&lon=85.1375645&appid=1b3dfd9e7b7166bb0ad5fa79b2329ba3")
            .then(res => res.json())
            .then((result) => {

                if (result) {
                    setCityName(result.name)

                    let humd = result.main.humidity;
                    setHumidity(humd)
                    let presure = result.main.pressure;
                    setPressure(presure)
                    let tempKelvin = result.main.temp
                    let tempCelsius = tempKelvin - 273
                    let sliceTemp = tempCelsius.toFixed(2)
                    setTemperature(sliceTemp)

                    console.log(tempCelsius)
                    let weather = result.weather
                    weather.forEach(element => {
                        setMain(element.main)
                    });
                    setLoading(false)
                } else {
                    setLoading(true)
                }


            }).catch((err) => {
                console.log(err)
            })

    }


    //useEffect

    useEffect(() => {
        getCurrentLocation();
        handelDate();
        getWeather();
    }, [])



    return (
        <div className="container">

            {
                loading ? <h1>Loading...</h1> :


                    <div >

                        <div className="heading">
                            <div style={{ marginRight: "470px", position: "relative", top: "30px" }}>
                                <h1 >{temperature}   C</h1>
                            </div>

                            <div className="city-time">

                                <h2>{cityName}</h2>

                                <div className="time-date">
                                    <p style={{ marginRight: "120px" }}>{time}</p>
                                    <p style={{ bottom: "35px", position: "relative" }}>{days}</p>
                                    <p style={{ marginLeft: "130px", bottom: "68px", position: "relative" }}>{cdate}</p>
                                </div>

                            </div>

                            <div style={{ position: "relative", bottom: "170px", left: "250px" }}>
                                <h3>{main}</h3>
                            </div>
                        </div>


                        <div className="weather-details">

                            <div style={{ position: "relative", right: "250px" }}>
                                <h3>Humidity</h3>
                                <text>{humidity}</text>
                            </div>

                            <div style={{ position: "relative", right: "100px", bottom: "80px" }}>
                                <h3>wind speed</h3>
                                <text>{humidity}</text>
                            </div>

                            <div style={{ position: "relative", left: "70px", bottom: "158px" }}>
                                <h3>sunset</h3>
                                <text>{humidity}</text>
                            </div>

                            <div style={{ position: "relative", left: "250px", bottom: "235px" }}>
                                <h3>sunrise</h3>
                                <text>{humidity}</text>
                            </div>

                        </div>

                    </div>


            }

        </div>
    )
}

export default CurrentLocation;
